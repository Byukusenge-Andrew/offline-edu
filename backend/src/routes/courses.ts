import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { prisma } from '@/lib/prisma';
import { authenticate, authorize } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { AppError } from '@/utils/appError';

const router = Router();

// GET /api/courses - List courses with filters & pagination
router.get('/', async (req: Request, res: Response) => {
  const { category, level, search, page = '1', limit = '12', isPublished } = req.query;
  const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
  const take = Math.min(50, Math.max(1, Number(limit)));

  const whereClause: any = {};

  // By default for public users, only show published courses
  if (isPublished !== undefined) {
    whereClause.isPublished = isPublished === 'true';
  } else {
    whereClause.isPublished = true;
  }

  if (category) {
    whereClause.category = String(category);
  }

  if (level) {
    whereClause.level = String(level).toUpperCase();
  }

  if (search) {
    const q = String(search);
    whereClause.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { category: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where: whereClause,
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
            enrollments: true,
          },
        },
      },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.course.count({ where: whereClause }),
  ]);

  res.json({
    status: 'success',
    data: {
      courses,
      pagination: {
        page: Number(page),
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    },
  });
});

// GET /api/courses/:id - Get specific course details
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      creator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
      lessons: {
        select: {
          id: true,
          title: true,
          duration: true,
          order: true,
          isPublished: true,
        },
        orderBy: { order: 'asc' },
      },
      quizzes: {
        select: {
          id: true,
          title: true,
          description: true,
          timeLimit: true,
          totalMarks: true,
          passingMarks: true,
          isPublished: true,
        },
      },
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  });

  if (!course) {
    throw new AppError('Course not found', 404);
  }

  res.json({
    status: 'success',
    data: course,
  });
});

// POST /api/courses - Create course (teachers and admins only)
router.post(
  '/',
  [
    authenticate,
    authorize('TEACHER', 'ADMIN'),
    body('title').isLength({ min: 3, max: 150 }).trim(),
    body('category').notEmpty().trim(),
    body('description').optional().isString(),
    body('level').optional().isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'Beginner', 'Intermediate', 'Advanced']),
    body('isPublished').optional().isBoolean(),
    body('price').optional().isFloat({ min: 0 }),
    validate,
  ],
  async (req: Request, res: Response) => {
    const { title, description, thumbnail, category, level, isPublished, price } = req.body;
    const creatorId = req.user!.id;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        thumbnail,
        category,
        level: level ? level.toUpperCase() : 'BEGINNER',
        isPublished: isPublished ?? false,
        price: price ? Number(price) : 0,
        creatorId,
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    res.status(201).json({
      status: 'success',
      data: course,
    });
  }
);

// PUT /api/courses/:id - Update course (creator or admin only)
router.put(
  '/:id',
  [
    authenticate,
    authorize('TEACHER', 'ADMIN'),
    body('title').optional().isLength({ min: 3, max: 150 }).trim(),
    body('category').optional().notEmpty().trim(),
    body('level').optional().isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'Beginner', 'Intermediate', 'Advanced']),
    body('isPublished').optional().isBoolean(),
    body('price').optional().isFloat({ min: 0 }),
    validate,
  ],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, thumbnail, category, level, isPublished, price } = req.body;

    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      throw new AppError('Course not found', 404);
    }

    if (existingCourse.creatorId !== req.user!.id && req.user!.role !== 'ADMIN') {
      throw new AppError('You do not have permission to modify this course', 403);
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(thumbnail !== undefined && { thumbnail }),
        ...(category && { category }),
        ...(level && { level: level.toUpperCase() }),
        ...(isPublished !== undefined && { isPublished }),
        ...(price !== undefined && { price: Number(price) }),
      },
    });

    res.json({
      status: 'success',
      data: updatedCourse,
    });
  }
);

// DELETE /api/courses/:id - Delete course
router.delete('/:id', authenticate, authorize('TEACHER', 'ADMIN'), async (req: Request, res: Response) => {
  const { id } = req.params;

  const existingCourse = await prisma.course.findUnique({
    where: { id },
  });

  if (!existingCourse) {
    throw new AppError('Course not found', 404);
  }

  if (existingCourse.creatorId !== req.user!.id && req.user!.role !== 'ADMIN') {
    throw new AppError('You do not have permission to delete this course', 403);
  }

  await prisma.course.delete({
    where: { id },
  });

  res.json({
    status: 'success',
    message: 'Course deleted successfully',
  });
});

export default router;
