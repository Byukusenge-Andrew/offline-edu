# OfflineEdu - AI-Powered Educational Platform

A revolutionary offline-first educational platform with AI assistance, designed specifically for African students and teachers.

## 🚀 Features

- **Offline-First Learning**: Access all content without internet connection
- **Blockchain-Verified Certificates**: Secure, tamper-proof credentials 
- **AI-Powered Assistance**: Personalized learning with intelligent tutoring
- **Teacher Supervision**: AI content reviewed and approved by teachers
- **Mobile Optimized**: Works perfectly on any device
- **Localized Content**: African context and local examples
- **Gamified Learning**: Earn certificates and achievements

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** for components
- **Axios** for API communication

### Backend
- **Node.js** with **Express.js**
- **PostgreSQL** database
- **Prisma** ORM
- **JWT** authentication
- **TypeScript**

## 📋 Prerequisites

Before running the application, make sure you have:

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## 🏃‍♂️ Quick Start

### 1. Install Dependencies

First, install axios in the frontend:
```bash
cd Frontend
npm install axios
```

### 2. Environment Setup

Create environment files:

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend (.env):**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/offline_edu"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
cd backend
npm run db:generate
npm run db:push
npm run db:seed  # Optional: Seed with sample data
```

### 4. Start Development Servers

You can start both servers at once using VS Code tasks:
- Press `Ctrl+Shift+P` 
- Type "Tasks: Run Task"
- Select "Start Both Servers"

Or manually:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd Frontend  
npm run dev
```

## 🔧 Development

### Available VS Code Tasks

- **Start Frontend Dev Server**: Runs the Next.js development server
- **Start Backend Dev Server**: Runs the Express server with nodemon
- **Start Both Servers**: Runs both frontend and backend simultaneously

### API Integration

The frontend now connects to the backend API for:

- **Authentication**: Login/signup with JWT tokens
- **User Management**: Profile creation and updates  
- **Course Management**: CRUD operations for courses
- **Real-time Features**: Socket.IO for live interactions

### Key Components

**Authentication Context** (`contexts/auth-context.tsx`):
- Manages global authentication state
- Handles login/signup API calls
- Automatic token refresh
- Role-based navigation

**API Client** (`lib/api.ts`):
- Centralized API communication
- Request/response interceptors
- Error handling
- Token management

## 🎯 Project Structure

```
offline-edu/
├── Frontend/           # Next.js frontend application
│   ├── app/           # App router pages
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React contexts
│   ├── lib/          # Utilities and API client
│   └── public/       # Static assets
├── backend/           # Express.js backend API
│   ├── src/
│   │   ├── routes/   # API route handlers
│   │   ├── middleware/ # Custom middleware
│   │   ├── prisma/   # Database schema and migrations
│   │   └── utils/    # Utility functions
│   └── uploads/      # File uploads
└── .vscode/          # VS Code configuration
```

## 🔐 Authentication Flow

1. User registers/logs in through frontend forms
2. Backend validates credentials and returns JWT token
3. Frontend stores token and user data
4. Subsequent API requests include Authorization header
5. Backend middleware validates token on protected routes
6. Automatic redirect to login on token expiration

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your Git repository
2. Set environment variables
3. Deploy automatically on push

### Backend (Railway/Heroku)
1. Create PostgreSQL database
2. Set environment variables  
3. Deploy with automatic builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for African Education**
