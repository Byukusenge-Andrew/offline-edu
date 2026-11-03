import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { AppError } from '@/utils/appError';

const router = Router();

// GET /api/enrollments/my - Get current user's enrolled courses with progress
router.get('/my', authenticate, async (req: Request, res: Response) => {
  const studentId = req.user!.id;

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId },
    include: {
      course: {
        include: {
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              lessons: true,
              quizzes: true,
            },
          },
        },
      },
    },
    orderBy: { enrolledAt: 'desc' },
  });

  res.json({
    status: 'success',
    data: enrollments,
  });
});

// POST /api/enrollments - Enroll in a course
router.post(
  '/',
  [
    authenticate,
    body('courseId').notEmpty(),
    validate,
  ],
  async (req: Request, res: Response) => {
    const studentId = req.user!.id;
    const { courseId } = req.body;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });

    if (existing) {
      res.json({
        status: 'success',
        message: 'Already enrolled',
        data: existing,
      });
      return;
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
        courseId,
        progress: 0,
      },
      include: {
        course: true,
      },
    });

    res.status(201).json({
      status: 'success',
      data: enrollment,
    });
  }
);

// GET /api/enrollments/course/:courseId - Get enrollments for a specific course (for teachers)
router.get('/course/:courseId', authenticate, async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const enrollments = await prisma.enrollment.findMany({
    where: { courseId },
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
    orderBy: { enrolledAt: 'desc' },
  });

  res.json({
    status: 'success',
    data: enrollments,
  });
});

export default router;
