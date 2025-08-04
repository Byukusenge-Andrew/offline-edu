import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { config } from '@/config/environment';
import { AppError } from '@/utils/appError';
import { authenticate } from '@/middleware/auth';
import { validate } from '@/middleware/validate';

const router = Router();

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('username').isLength({ min: 3, max: 20 }).trim(),
  body('firstName').isLength({ min: 1, max: 50 }).trim(),
  body('lastName').isLength({ min: 1, max: 50 }).trim(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['STUDENT', 'TEACHER']).optional(),
  validate
], async (req: Request, res: Response) => {
  const { email, username, firstName, lastName, password, role = 'STUDENT' } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username }
      ]
    }
  });

  if (existingUser) {
    throw new AppError('Email or username already exists', 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword,
      role,
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true
    }
  });

  // Create profile based on role
  if (role === 'STUDENT') {
    await prisma.studentProfile.create({
      data: { userId: user.id }
    });
  } else if (role === 'TEACHER') {
    await prisma.teacherProfile.create({
      data: { userId: user.id }
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn } as jwt.SignOptions
  );

  res.status(201).json({
    status: 'success',
    data: {
      user,
      token
    }
  });
});

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  validate
], async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      studentProfile: true,
      teacherProfile: true
    }
  });

  if (!user || !user.isActive) {
    throw new AppError('Invalid email or password', 401);
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn } as jwt.SignOptions
  );

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  res.json({
    status: 'success',
    data: {
      user: userWithoutPassword,
      token
    }
  });
});

// Get current user
router.get('/me', authenticate, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
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
      teacherProfile: true
    }
  });

  res.json({
    status: 'success',
    data: { user }
  });
});

// Change password
router.patch('/change-password', [
  authenticate,
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 }),
  validate
], async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: req.user!.id }
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Check current password
  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isCurrentPasswordValid) {
    throw new AppError('Current password is incorrect', 400);
  }

  // Hash new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 12);

  // Update password
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedNewPassword }
  });

  res.json({
    status: 'success',
    message: 'Password changed successfully'
  });
});

export default router;
