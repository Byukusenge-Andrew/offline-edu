"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  BookOpen,
  TrendingUp,
  Battery,
  WifiOff,
  LogOut,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Brain,
  Sparkles,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Student {
  id: string
  name: string
  progress: number
  lastActive: string
  status: "active" | "inactive" | "struggling"
}

interface ClassStats {
  totalStudents: number
  activeToday: number
  averageProgress: number
  completedLessons: number
}

export default function TeacherDashboard() {
  const [username, setUsername] = useState("")
  const [batteryLevel, setBatteryLevel] = useState(85)
  const router = useRouter()

  const classStats: ClassStats = {
    totalStudents: 28,
    activeToday: 22,
    averageProgress: 67,
    completedLessons: 156,
  }

  const recentStudents: Student[] = [
    { id: "1", name: "Amara Johnson", progress: 85, lastActive: "2 hours ago", status: "active" },
    { id: "2", name: "Kwame Asante", progress: 45, lastActive: "1 day ago", status: "struggling" },
    { id: "3", name: "Fatima Al-Rashid", progress: 92, lastActive: "30 min ago", status: "active" },
    { id: "4", name: "Joseph Mbeki", progress: 23, lastActive: "3 days ago", status: "inactive" },
    { id: "5", name: "Aisha Okafor", progress: 78, lastActive: "1 hour ago", status: "active" },
  ]

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
    }

    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 2))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("username")
    router.push("/")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "struggling":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "struggling":
        return <AlertCircle className="h-4 w-4" />
      case "inactive":
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-full">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold">Teacher Dashboard</h1>
                  <p className="text-sm text-gray-600">Welcome back, {username || "Teacher"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 text-purple-600">
                  <Sparkles className="h-3 w-3" />
                  AI Powered
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Battery className="h-3 w-3" />
                  {Math.round(batteryLevel)}%
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <WifiOff className="h-3 w-3" />
                  Offline
                </Badge>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Class Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{classStats.totalStudents}</p>
                    <p className="text-sm text-gray-600">Total Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{classStats.activeToday}</p>
                    <p className="text-sm text-gray-600">Active Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{classStats.averageProgress}%</p>
                    <p className="text-sm text-gray-600">Avg Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{classStats.completedLessons}</p>
                    <p className="text-sm text-gray-600">Lessons Done</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/teacher/students">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold mb-2">Manage Students</h3>
                  <p className="text-sm text-gray-600">View student progress and performance</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/teacher/ai-assistant">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Brain className="h-8 w-8 mx-auto mb-3 text-purple-500" />
                  <h3 className="font-semibold mb-2">AI Assistant</h3>
                  <p className="text-sm text-gray-600">Get intelligent teaching support</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/teacher/content">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-3 text-green-500" />
                  <h3 className="font-semibold mb-2">Content Library</h3>
                  <p className="text-sm text-gray-600">Manage lessons and materials</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/teacher/grading">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-3 text-orange-500" />
                  <h3 className="font-semibold mb-2">AI Grading</h3>
                  <p className="text-sm text-gray-600">Automated assessment and feedback</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* AI Insights Card */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                AI Teaching Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-1">📈 Performance Trend</h4>
                  <p className="text-sm text-gray-700">Class average improved 8% this week</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-1">🎯 Focus Area</h4>
                  <p className="text-sm text-gray-700">3 students need math support</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-1">💡 Suggestion</h4>
                  <p className="text-sm text-gray-700">Schedule review session for fractions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Student Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Student Activity</span>
                <Link href="/teacher/students">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-gray-600">Last active: {student.lastActive}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">{student.progress}% complete</p>
                        <Progress value={student.progress} className="w-20 h-2" />
                      </div>
                      <Badge className={getStatusColor(student.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(student.status)}
                          <span className="capitalize">{student.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Content Sync</span>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    Up to date
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Student Devices</span>
                  </div>
                  <Badge variant="outline" className="text-blue-600">
                    24/28 online
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">AI Services</span>
                  </div>
                  <Badge variant="outline" className="text-purple-600">
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
