"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Brain,
  Trophy,
  Clock,
  TrendingUp,
  ArrowRight,
  Calendar,
  Target,
  Award,
  Zap,
  CheckCircle,
  Star,
} from "lucide-react"
import Link from "next/link"

interface Subject {
  id: string
  name: string
  icon: any
  progress: number
  totalLessons: number
  completedLessons: number
  color: string
  nextLesson: string
}

interface RecentActivity {
  id: string
  type: "lesson" | "quiz" | "achievement"
  title: string
  subject: string
  timestamp: string
  score?: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  earned: boolean
  progress?: number
  total?: number
}

export default function StudentDashboard() {
  const [username, setUsername] = useState("")
  const [currentStreak, setCurrentStreak] = useState(7)
  const [totalPoints, setTotalPoints] = useState(2450)

  const subjects: Subject[] = [
    {
      id: "math",
      name: "Mathematics",
      icon: "🔢",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      color: "bg-blue-500",
      nextLesson: "Quadratic Equations",
    },
    {
      id: "science",
      name: "Science",
      icon: "🔬",
      progress: 60,
      totalLessons: 20,
      completedLessons: 12,
      color: "bg-green-500",
      nextLesson: "Chemical Reactions",
    },
    {
      id: "language",
      name: "English",
      icon: "📚",
      progress: 85,
      totalLessons: 18,
      completedLessons: 15,
      color: "bg-purple-500",
      nextLesson: "Advanced Grammar",
    },
  ]

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "lesson",
      title: "Completed: Introduction to Algebra",
      subject: "Mathematics",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "quiz",
      title: "Science Quiz: Photosynthesis",
      subject: "Science",
      timestamp: "1 day ago",
      score: 92,
    },
    {
      id: "3",
      type: "achievement",
      title: "Earned: Math Master Badge",
      subject: "Mathematics",
      timestamp: "2 days ago",
    },
    {
      id: "4",
      type: "lesson",
      title: "Completed: Essay Writing Basics",
      subject: "English",
      timestamp: "3 days ago",
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Math Master",
      description: "Complete 20 math lessons",
      icon: Trophy,
      earned: true,
    },
    {
      id: "2",
      title: "Science Explorer",
      description: "Finish all chemistry modules",
      icon: Award,
      earned: false,
      progress: 8,
      total: 12,
    },
    {
      id: "3",
      title: "Speed Learner",
      description: "Complete 5 lessons in one day",
      icon: Zap,
      earned: true,
    },
    {
      id: "4",
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      icon: Star,
      earned: false,
      progress: 95,
      total: 100,
    },
  ]

  const upcomingTasks = [
    { id: "1", title: "Math Quiz: Algebra Basics", dueDate: "Tomorrow", priority: "high" },
    { id: "2", title: "Science Assignment: Lab Report", dueDate: "In 3 days", priority: "medium" },
    { id: "3", title: "English Essay: My Future Goals", dueDate: "Next week", priority: "low" },
  ]

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case "quiz":
        return <Target className="h-4 w-4 text-green-500" />
      case "achievement":
        return <Trophy className="h-4 w-4 text-yellow-500" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {username || "Student"}! 👋</h1>
            <p className="text-blue-100 mb-4 md:mb-0">Ready to continue your learning journey? You're doing great!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{currentStreak}</div>
              <div className="text-xs text-blue-100">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalPoints.toLocaleString()}</div>
              <div className="text-xs text-blue-100">Total Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Lessons Completed</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Study Time</p>
                <p className="text-2xl font-bold">24h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Trophy className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subjects Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Your Subjects
              </CardTitle>
              <CardDescription>Continue learning where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{subject.icon}</div>
                      <div>
                        <h3 className="font-semibold">{subject.name}</h3>
                        <p className="text-sm text-gray-600">
                          {subject.completedLessons}/{subject.totalLessons} lessons completed
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{subject.progress}%</Badge>
                  </div>
                  <Progress value={subject.progress} className="mb-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Next: {subject.nextLesson}</span>
                    <Button size="sm" asChild>
                      <Link href={`/student/subject/${subject.id}`}>
                        Continue
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>{activity.subject}</span>
                        <span>•</span>
                        <span>{activity.timestamp}</span>
                        {activity.score && (
                          <>
                            <span>•</span>
                            <Badge variant="secondary" className="text-xs">
                              {activity.score}%
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <Link href="/student/ai-study">
                  <Brain className="h-4 w-4 mr-2" />
                  AI Study Assistant
                </Link>
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <Link href="/student/quiz">
                  <Target className="h-4 w-4 mr-2" />
                  Take a Quiz
                </Link>
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <Link href="/student/reports">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Progress
                </Link>
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <Link href="/student/certificates">
                  <Award className="h-4 w-4 mr-2" />
                  My Certificates
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className={`p-3 border-l-4 rounded-r-lg ${getPriorityColor(task.priority)}`}>
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">Due: {task.dueDate}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      achievement.earned ? "bg-yellow-50" : "bg-gray-50"
                    }`}
                  >
                    <achievement.icon
                      className={`h-6 w-6 ${achievement.earned ? "text-yellow-500" : "text-gray-400"}`}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      {!achievement.earned && achievement.progress && (
                        <Progress value={(achievement.progress / achievement.total!) * 100} className="h-1 mt-1" />
                      )}
                    </div>
                    {achievement.earned && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3 bg-transparent" asChild>
                <Link href="/student/certificates">View All</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
