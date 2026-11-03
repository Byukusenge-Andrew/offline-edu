import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { prisma } from '@/lib/prisma';
import { authenticate, authorize } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { AppError } from '@/utils/appError';

const router = Router();

// GET /api/lessons/course/:courseId - Get all lessons for a course
router.get('/course/:courseId', async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const lessons = await prisma.lesson.findMany({
    where: { courseId },
    orderBy: { order: 'asc' },
    include: {
      resources: true,
      _count: {
        select: { progress: true },
      },
    },
  });

  res.json({
    status: 'success',
    data: lessons,
  });
});

// GET /api/lessons/:id - Get specific lesson
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          category: true,
        },
      },
      resources: true,
    },
  });

  if (!lesson) {
    throw new AppError('Lesson not found', 404);
  }

  res.json({
    status: 'success',
    data: lesson,
  });
});

// POST /api/lessons - Create a new lesson
router.post(
  '/',
  [
    authenticate,
    authorize('TEACHER', 'ADMIN'),
    body('title').isLength({ min: 2, max: 150 }).trim(),
    body('courseId').notEmpty(),
    body('content').notEmpty(),
    body('duration').optional().isInt({ min: 1 }),
    body('order').optional().isInt({ min: 0 }),
    validate,
  ],
  async (req: Request, res: Response) => {
    const { title, courseId, content, videoUrl, duration, order, isPublished } = req.body;
    const creatorId = req.user!.id;

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    if (course.creatorId !== creatorId && req.user!.role !== 'ADMIN') {
      throw new AppError('You do not have permission to add lessons to this course', 403);
    }

    // Auto-calculate order if not provided
    let lessonOrder = order;
    if (lessonOrder === undefined) {
      const highestOrder = await prisma.lesson.findFirst({
        where: { courseId },
        orderBy: { order: 'desc' },
        select: { order: true },
      });
      lessonOrder = (highestOrder?.order ?? 0) + 1;
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        content,
        videoUrl,
        duration: duration ? Number(duration) : undefined,
        order: Number(lessonOrder),
        isPublished: isPublished ?? true,
        courseId,
        creatorId,
      },
    });

    res.status(201).json({
      status: 'success',
      data: lesson,
    });
  }
);

// PUT /api/lessons/:id - Update lesson
router.put(
  '/:id',
  [
    authenticate,
    authorize('TEACHER', 'ADMIN'),
    body('title').optional().isLength({ min: 2, max: 150 }).trim(),
    body('content').optional().notEmpty(),
    body('duration').optional().isInt({ min: 1 }),
    body('order').optional().isInt({ min: 0 }),
    validate,
  ],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, videoUrl, duration, order, isPublished } = req.body;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
    });

    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    if (lesson.creatorId !== req.user!.id && req.user!.role !== 'ADMIN') {
      throw new AppError('You do not have permission to modify this lesson', 403);
    }

    const updated = await prisma.lesson.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(videoUrl !== undefined && { videoUrl }),
        ...(duration !== undefined && { duration: Number(duration) }),
        ...(order !== undefined && { order: Number(order) }),
        ...(isPublished !== undefined && { isPublished }),
      },
    });

    res.json({
      status: 'success',
      data: updated,
    });
  }
);

// DELETE /api/lessons/:id - Delete lesson
router.delete('/:id', authenticate, authorize('TEACHER', 'ADMIN'), async (req: Request, res: Response) => {
  const { id } = req.params;

  const lesson = await prisma.lesson.findUnique({
    where: { id },
  });

  if (!lesson) {
    throw new AppError('Lesson not found', 404);
  }

  if (lesson.creatorId !== req.user!.id && req.user!.role !== 'ADMIN') {
    throw new AppError('You do not have permission to delete this lesson', 403);
  }

  await prisma.lesson.delete({
    where: { id },
  });

  res.json({
    status: 'success',
    message: 'Lesson deleted successfully',
  });
});

// POST /api/lessons/:id/progress - Record lesson progress (student)
router.post(
  '/:id/progress',
  [
    authenticate,
    body('isCompleted').optional().isBoolean(),
    body('timeSpent').optional().isInt({ min: 0 }),
    validate,
  ],
  async (req: Request, res: Response) => {
    const { id: lessonId } = req.params;
    const studentId = req.user!.id;
    const { isCompleted = true, timeSpent = 0 } = req.body;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { courseId: true },
    });

    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    const progress = await prisma.lessonProgress.upsert({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId,
        },
      },
      create: {
        studentId,
        lessonId,
        isCompleted,
        timeSpent,
        lastAccessed: new Date(),
      },
      update: {
        isCompleted,
        timeSpent: { increment: timeSpent },
        lastAccessed: new Date(),
      },
    });

    // Update overall course enrollment progress percentage if enrolled
    const totalLessons = await prisma.lesson.count({
      where: { courseId: lesson.courseId, isPublished: true },
    });

    if (totalLessons > 0) {
      const completedLessons = await prisma.lessonProgress.count({
        where: {
          studentId,
          lesson: { courseId: lesson.courseId },
          isCompleted: true,
        },
      });

      const percentage = Math.round((completedLessons / totalLessons) * 100);

      await prisma.enrollment.updateMany({
        where: {
          studentId,
          courseId: lesson.courseId,
        },
        data: {
          progress: percentage,
          completedAt: percentage === 100 ? new Date() : null,
        },
      });
    }

    res.json({
      status: 'success',
      data: progress,
    });
  }
);

export default router;
