# Offline Education Platform - Backend API

A robust Node.js/Express backend API for an educational platform built with TypeScript, PostgreSQL, and Prisma ORM.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control (Student, Teacher, Admin)
- **Course Management**: Complete CRUD operations for courses, lessons, and educational content
- **Quiz System**: Interactive quizzes with multiple question types and automatic grading
- **Progress Tracking**: Real-time student progress monitoring and analytics
- **AI Integration**: OpenAI-powered content generation and student assistance
- **File Upload**: Secure file handling for course materials and assignments
- **Real-time Features**: Socket.IO integration for live notifications and updates
- **Certificate Generation**: Automated certificate issuance upon course completion
- **Security**: Comprehensive security middleware (Helmet, CORS, Rate limiting)
- **Quiz System** - Interactive quizzes with auto-grading
- **AI Integration** - AI-powered content generation and assistance
- **File Upload** - Support for various file types
- **Real-time Features** - Socket.IO for live notifications
- **Analytics** - Student progress and performance tracking

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **File Upload**: Multer
- **Real-time**: Socket.IO
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/offline_edu"
   JWT_SECRET="your-super-secret-jwt-key"
   FRONTEND_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   
   # (Optional) Seed the database
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PATCH /api/auth/change-password` - Change password

### User Endpoints
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user profile

### Course Endpoints
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course (Teacher only)
- `GET /api/courses/:id` - Get course by ID
- `PATCH /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Lesson Endpoints
- `GET /api/lessons` - Get lessons for a course
- `POST /api/lessons` - Create new lesson
- `GET /api/lessons/:id` - Get lesson by ID
- `PATCH /api/lessons/:id` - Update lesson
- `DELETE /api/lessons/:id` - Delete lesson

### Quiz Endpoints
- `GET /api/quizzes` - Get quizzes for a course
- `POST /api/quizzes` - Create new quiz
- `GET /api/quizzes/:id` - Get quiz by ID
- `POST /api/quizzes/:id/attempt` - Submit quiz attempt

## 🗄️ Database Schema

The database uses the following main entities:

- **Users** - Student and teacher accounts
- **Courses** - Educational courses
- **Lessons** - Individual lessons within courses
- **Quizzes** - Assessments with questions
- **Enrollments** - Student-course relationships
- **Progress** - Learning progress tracking

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed the database
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port | No |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRES_IN` | JWT expiration time | No |
| `FRONTEND_URL` | Frontend application URL | No |
| `OPENAI_API_KEY` | OpenAI API key for AI features | No |

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization
- SQL injection protection via Prisma

## 📝 Logging

The application uses Winston for logging with the following levels:
- `error` - Error messages
- `warn` - Warning messages
- `info` - General information
- `debug` - Debug information (development only)

Logs are stored in the `logs/` directory.

## 🧪 Testing

Run the test suite with:
```bash
npm test
```

## 🚀 Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables

3. Run database migrations:
   ```bash
   npm run db:migrate
   ```

4. Start the production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
