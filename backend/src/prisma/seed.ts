import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      firstName: 'System',
      lastName: 'Administrator',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create sample teacher
  const teacherPassword = await bcrypt.hash('teacher123', 12);
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      email: 'teacher@example.com',
      username: 'teacher1',
      firstName: 'John',
      lastName: 'Doe',
      password: teacherPassword,
      role: 'TEACHER',
      teacherProfile: {
        create: {
          department: 'Computer Science',
          specialization: 'Web Development',
          experience: 5,
          qualification: 'Master of Computer Science',
          bio: 'Experienced web developer and educator',
        }
      }
    },
  });

  // Create sample student
  const studentPassword = await bcrypt.hash('student123', 12);
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      username: 'student1',
      firstName: 'Jane',
      lastName: 'Smith',
      password: studentPassword,
      role: 'STUDENT',
      studentProfile: {
        create: {
          grade: '12th Grade',
          parentEmail: 'parent@example.com',
        }
      }
    },
  });

  // Create sample course
  const course = await prisma.course.upsert({
    where: { id: 'sample-course-id' },
    update: {},
    create: {
      id: 'sample-course-id',
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript',
      category: 'Programming',
      level: 'BEGINNER',
      isPublished: true,
      price: 0,
      creatorId: teacher.id,
    },
  });

  // Create sample lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'HTML Basics',
      content: 'Learn the fundamentals of HTML markup language...',
      order: 1,
      duration: 30,
      isPublished: true,
      courseId: course.id,
      creatorId: teacher.id,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'CSS Styling',
      content: 'Introduction to CSS for styling web pages...',
      order: 2,
      duration: 45,
      isPublished: true,
      courseId: course.id,
      creatorId: teacher.id,
    },
  });

  // Create sample quiz
  const quiz = await prisma.quiz.create({
    data: {
      title: 'HTML & CSS Quiz',
      description: 'Test your knowledge of HTML and CSS basics',
      timeLimit: 30,
      totalMarks: 10,
      passingMarks: 6,
      isPublished: true,
      courseId: course.id,
      creatorId: teacher.id,
      questions: {
        create: [
          {
            question: 'What does HTML stand for?',
            type: 'MULTIPLE_CHOICE',
            options: [
              'HyperText Markup Language',
              'Home Tool Markup Language',
              'Hyperlinks and Text Markup Language',
              'HyperTool Markup Language'
            ],
            correctAnswer: 'HyperText Markup Language',
            marks: 2,
            order: 1,
          },
          {
            question: 'CSS is used for styling web pages.',
            type: 'TRUE_FALSE',
            correctAnswer: 'true',
            marks: 2,
            order: 2,
          },
          {
            question: 'What is the purpose of the <head> tag in HTML?',
            type: 'SHORT_ANSWER',
            correctAnswer: 'Contains metadata about the document',
            marks: 3,
            order: 3,
          }
        ]
      }
    },
  });

  // Enroll student in course
  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: course.id,
    },
  });

  console.log('✅ Database seed completed successfully!');
  console.log('📧 Login credentials:');
  console.log('Admin: admin@example.com / admin123');
  console.log('Teacher: teacher@example.com / teacher123');
  console.log('Student: student@example.com / student123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
