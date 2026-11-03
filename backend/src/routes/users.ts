import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { AppError } from '@/utils/appError';

const router = Router();

// GET /api/users/profile - Get current user profile
router.get('/profile', authenticate, async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      avatar: true,
      createdAt: true,
      studentProfile: true,
      teacherProfile: true,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    status: 'success',
    data: {
      ...user,
      userType: user.role.toLowerCase(),
    },
  });
});

// PUT /api/users/profile - Update current user profile
router.put(
  '/profile',
  [
    authenticate,
    body('firstName').optional().isLength({ min: 1, max: 50 }).trim(),
    body('lastName').optional().isLength({ min: 1, max: 50 }).trim(),
    body('avatar').optional().isString(),
    validate,
  ],
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { firstName, lastName, avatar, profileData } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(avatar !== undefined && { avatar }),
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    // Update role-specific profile if extra profile fields are passed
    if (profileData && typeof profileData === 'object') {
      if (user.role === 'STUDENT') {
        await prisma.studentProfile.upsert({
          where: { userId },
          create: {
            userId,
            grade: profileData.grade,
            phoneNumber: profileData.phoneNumber,
            address: profileData.address,
            parentEmail: profileData.parentEmail,
            emergencyContact: profileData.emergencyContact,
          },
          update: {
            ...(profileData.grade !== undefined && { grade: profileData.grade }),
            ...(profileData.phoneNumber !== undefined && { phoneNumber: profileData.phoneNumber }),
            ...(profileData.address !== undefined && { address: profileData.address }),
            ...(profileData.parentEmail !== undefined && { parentEmail: profileData.parentEmail }),
            ...(profileData.emergencyContact !== undefined && { emergencyContact: profileData.emergencyContact }),
          },
        });
      } else if (user.role === 'TEACHER') {
        await prisma.teacherProfile.upsert({
          where: { userId },
          create: {
            userId,
            department: profileData.department,
            specialization: profileData.specialization,
            qualification: profileData.qualification,
            phoneNumber: profileData.phoneNumber,
            bio: profileData.bio,
            experience: profileData.experience ? Number(profileData.experience) : undefined,
          },
          update: {
            ...(profileData.department !== undefined && { department: profileData.department }),
            ...(profileData.specialization !== undefined && { specialization: profileData.specialization }),
            ...(profileData.qualification !== undefined && { qualification: profileData.qualification }),
            ...(profileData.phoneNumber !== undefined && { phoneNumber: profileData.phoneNumber }),
            ...(profileData.bio !== undefined && { bio: profileData.bio }),
            ...(profileData.experience !== undefined && { experience: Number(profileData.experience) }),
          },
        });
      }
    }

    const fullUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        createdAt: true,
        studentProfile: true,
        teacherProfile: true,
      },
    });

    res.json({
      status: 'success',
      data: {
        ...fullUser,
        userType: fullUser?.role.toLowerCase(),
      },
    });
  }
);

// GET /api/users - List users (for search/teachers/admins)
router.get('/', authenticate, async (req: Request, res: Response) => {
  const { role, search, page = '1', limit = '20' } = req.query;
  const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
  const take = Math.min(100, Math.max(1, Number(limit)));

  const whereClause: any = { isActive: true };
  if (role) {
    whereClause.role = String(role).toUpperCase();
  }
  if (search) {
    const q = String(search);
    whereClause.OR = [
      { firstName: { contains: q, mode: 'insensitive' } },
      { lastName: { contains: q, mode: 'insensitive' } },
      { username: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where: whereClause }),
  ]);

  res.json({
    status: 'success',
    data: {
      users,
      pagination: {
        page: Number(page),
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    },
  });
});

export default router;
