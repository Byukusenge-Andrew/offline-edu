import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { prisma } from '@/lib/prisma';
import { authenticate, authorize } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { AppError } from '@/utils/appError';

const router = Router();

// GET /api/quizzes/course/:courseId - Get all quizzes for a course
router.get('/course/:courseId', async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const quizzes = await prisma.quiz.findMany({
    where: { courseId },
    include: {
      _count: {
        select: {
          questions: true,
          attempts: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  res.json({
    status: 'success',
    data: quizzes,
  });
});

// GET /api/quizzes/:id - Get quiz details (with questions)
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;
  const isTeacherOrAdmin = req.user!.role === 'TEACHER' || req.user!.role === 'ADMIN';

  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      course: {
        select: { id: true, title: true },
      },
      questions: {
        select: {
          id: true,
          question: true,
          type: true,
          options: true,
          marks: true,
          order: true,
          // Only show correctAnswer and explanation to teachers/admins or after attempt
          ...(isTeacherOrAdmin && {
            correctAnswer: true,
            explanation: true,
          }),
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!quiz) {
    throw new AppError('Quiz not found', 404);
  }

  res.json({
    status: 'success',
    data: quiz,
  });
});

// POST /api/quizzes - Create quiz with optional questions
router.post(
  '/',
  [
    authenticate,
    authorize('TEACHER', 'ADMIN'),
    body('title').isLength({ min: 3, max: 150 }).trim(),
    body('courseId').notEmpty(),
    body('timeLimit').optional().isInt({ min: 1 }),
    body('passingMarks').optional().isInt({ min: 0 }),
    body('questions').optional().isArray(),
    validate,
  ],
  async (req: Request, res: Response) => {
    const { title, description, courseId, timeLimit, passingMarks, isPublished, questions } = req.body;
    const creatorId = req.user!.id;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    if (course.creatorId !== creatorId && req.user!.role !== 'ADMIN') {
      throw new AppError('You do not have permission to add quizzes to this course', 403);
    }

    let calculatedTotalMarks = 0;
    if (Array.isArray(questions)) {
      calculatedTotalMarks = questions.reduce((sum: number, q: any) => sum + (Number(q.marks) || 1), 0);
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        courseId,
        timeLimit: timeLimit ? Number(timeLimit) : undefined,
        passingMarks: passingMarks ? Number(passingMarks) : 0,
        totalMarks: calculatedTotalMarks,
        isPublished: isPublished ?? true,
        creatorId,
        ...(Array.isArray(questions) && questions.length > 0 && {
          questions: {
            create: questions.map((q: any, idx: number) => ({
              question: q.question,
              type: q.type || 'MULTIPLE_CHOICE',
              options: q.options || [],
              correctAnswer: String(q.correctAnswer),
              explanation: q.explanation || null,
              marks: Number(q.marks) || 1,
              order: q.order !== undefined ? Number(q.order) : idx + 1,
            })),
          },
        }),
      },
      include: {
        questions: true,
      },
    });

    res.status(201).json({
      status: 'success',
      data: quiz,
    });
  }
);

// POST /api/quizzes/:id/attempt - Submit a quiz attempt
router.post(
  '/:id/attempt',
  [
    authenticate,
    body('answers').isObject(),
    body('timeSpent').optional().isInt({ min: 0 }),
    validate,
  ],
  async (req: Request, res: Response) => {
    const { id: quizId } = req.params;
    const studentId = req.user!.id;
    const { answers, timeSpent = 0 } = req.body;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: true,
      },
    });

    if (!quiz) {
      throw new AppError('Quiz not found', 404);
    }

    // Calculate score
    let score = 0;
    let totalMarks = 0;
    const detailedResults: any[] = [];

    for (const question of quiz.questions) {
      totalMarks += question.marks;
      const studentAnswer = answers[question.id];
      const isCorrect = String(studentAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();

      if (isCorrect) {
        score += question.marks;
      }

      detailedResults.push({
        questionId: question.id,
        question: question.question,
        studentAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
        marksEarned: isCorrect ? question.marks : 0,
        totalMarks: question.marks,
      });
    }

    const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100 * 10) / 10 : 0;
    const passed = score >= quiz.passingMarks;

    const attempt = await prisma.quizAttempt.create({
      data: {
        studentId,
        quizId,
        score,
        totalMarks,
        percentage,
        timeSpent: Number(timeSpent),
        isCompleted: true,
        answers: {
          submitted: answers,
          detailedResults,
          passed,
        },
      },
    });

    res.json({
      status: 'success',
      data: {
        attemptId: attempt.id,
        score,
        totalMarks,
        percentage,
        passed,
        results: detailedResults,
      },
    });
  }
);

// GET /api/quizzes/:id/attempts - Get past attempts for a quiz
router.get('/:id/attempts', authenticate, async (req: Request, res: Response) => {
  const { id: quizId } = req.params;
  const isTeacherOrAdmin = req.user!.role === 'TEACHER' || req.user!.role === 'ADMIN';

  const whereClause: any = { quizId };
  if (!isTeacherOrAdmin) {
    whereClause.studentId = req.user!.id;
  }

  const attempts = await prisma.quizAttempt.findMany({
    where: whereClause,
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
        },
      },
    },
    orderBy: { attemptedAt: 'desc' },
  });

  res.json({
    status: 'success',
    data: attempts,
  });
});

export default router;
