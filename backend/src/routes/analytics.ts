import { Router, Request, Response } from 'express';
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/middleware/auth';

const router = Router();

// GET /api/analytics/student - Student learning overview
router.get('/student', authenticate, async (req: Request, res: Response) => {
  const studentId = req.user!.id;

  const [
    enrolledCount,
    completedLessonsCount,
    quizAttempts,
    totalTimeProgress,
    recentAttempts,
  ] = await Promise.all([
    prisma.enrollment.count({ where: { studentId } }),
    prisma.lessonProgress.count({ where: { studentId, isCompleted: true } }),
    prisma.quizAttempt.findMany({
      where: { studentId },
      select: { score: true, totalMarks: true, percentage: true, timeSpent: true },
    }),
    prisma.lessonProgress.aggregate({
      where: { studentId },
      _sum: { timeSpent: true },
    }),
    prisma.quizAttempt.findMany({
      where: { studentId },
      include: {
        quiz: {
          select: { id: true, title: true },
        },
      },
      orderBy: { attemptedAt: 'desc' },
      take: 5,
    }),
  ]);

  const totalQuizScore = quizAttempts.reduce((acc, a) => acc + a.percentage, 0);
  const averageQuizScore = quizAttempts.length > 0 ? Math.round(totalQuizScore / quizAttempts.length) : 0;
  const totalStudyMinutes = (totalTimeProgress._sum.timeSpent || 0) + quizAttempts.reduce((acc, a) => acc + (a.timeSpent || 0), 0);

  res.json({
    status: 'success',
    data: {
      enrolledCourses: enrolledCount,
      completedLessons: completedLessonsCount,
      completedQuizzes: quizAttempts.length,
      averageQuizScore,
      totalStudyMinutes,
      recentActivity: recentAttempts,
    },
  });
});

// GET /api/analytics/teacher - Teacher teaching overview
router.get('/teacher', authenticate, async (req: Request, res: Response) => {
  const teacherId = req.user!.id;

  const [courses, totalQuizzes] = await Promise.all([
    prisma.course.findMany({
      where: { creatorId: teacherId },
      include: {
        _count: {
          select: {
            lessons: true,
            quizzes: true,
            enrollments: true,
          },
        },
        enrollments: {
          select: {
            progress: true,
          },
        },
      },
    }),
    prisma.quiz.count({ where: { creatorId: teacherId } }),
  ]);

  const totalCourses = courses.length;
  const totalStudents = courses.reduce((acc, c) => acc + c._count.enrollments, 0);
  const totalLessons = courses.reduce((acc, c) => acc + c._count.lessons, 0);

  const allProgressValues = courses.flatMap(c => c.enrollments.map(e => e.progress));
  const averageProgress = allProgressValues.length > 0
    ? Math.round(allProgressValues.reduce((a, b) => a + b, 0) / allProgressValues.length)
    : 0;

  res.json({
    status: 'success',
    data: {
      totalCourses,
      totalStudents,
      totalLessons,
      totalQuizzes,
      averageProgress,
      coursesOverview: courses.map(c => ({
        id: c.id,
        title: c.title,
        category: c.category,
        studentCount: c._count.enrollments,
        lessonCount: c._count.lessons,
        quizCount: c._count.quizzes,
      })),
    },
  });
});

export default router;
