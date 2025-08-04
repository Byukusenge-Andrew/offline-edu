import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { config } from '@/config/environment';
import { AppError } from '@/utils/appError';
import { authenticate } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { cleanRegistrationBody } from '@/middleware/cleanBody';

const router = Router();

// Register
router.post('/register', [
  cleanRegistrationBody,
  body('email').isEmail().normalizeEmail(),
  body('firstName').isLength({ min: 1, max: 50 }).trim(),
  body('lastName').isLength({ min: 1, max: 50 }).trim(),
  body('password').isLength({ min: 6 }),
  body('userType').isIn(['student', 'teacher']),
  validate
], async (req: Request, res: Response) => {
  const { email, firstName, lastName, password, userType } = req.body;

  // Generate username from email if not provided
  const username = email.split('@')[0] + '_' + Date.now().toString().slice(-4);
  
  // Convert userType to role for database
  const role = userType.toUpperCase(); // 'student' -> 'STUDENT', 'teacher' -> 'TEACHER'

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new AppError('Email already exists', 400);
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

  // Transform user data for frontend
  const userData = {
    ...user,
    userType: user.role.toLowerCase() // Convert 'STUDENT' to 'student', 'TEACHER' to 'teacher'
  };

  res.status(201).json({
    status: 'success',
    token,
    user: userData
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

  // Remove password from response and transform for frontend
  const { password: _, ...userWithoutPassword } = user;
  const userData = {
    ...userWithoutPassword,
    userType: user.role.toLowerCase() // Convert 'STUDENT' to 'student', 'TEACHER' to 'teacher'
  };

  res.json({
    status: 'success',
    token,
    user: userData
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

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Transform for frontend
  const userData = {
    ...user,
    userType: user.role.toLowerCase()
  };

  res.json({
    status: 'success',
    data: userData
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
