"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Search,
  Download,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Battery,
  WifiOff,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Student {
  id: string
  name: string
  grade: string
  totalProgress: number
  mathProgress: number
  scienceProgress: number
  languageProgress: number
  lastActive: string
  status: "active" | "inactive" | "struggling"
  lessonsCompleted: number
  totalLessons: number
  streak: number
}

export default function StudentsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "struggling">("all")
  const [batteryLevel, setBatteryLevel] = useState(85)

  const students: Student[] = [
    {
      id: "1",
      name: "Amara Johnson",
      grade: "Grade 8",
      totalProgress: 85,
      mathProgress: 90,
      scienceProgress: 80,
      languageProgress: 85,
      lastActive: "2 hours ago",
      status: "active",
      lessonsCompleted: 34,
      totalLessons: 40,
      streak: 7,
    },
    {
      id: "2",
      name: "Kwame Asante",
      grade: "Grade 7",
      totalProgress: 45,
      mathProgress: 50,
      scienceProgress: 35,
      languageProgress: 50,
      lastActive: "1 day ago",
      status: "struggling",
      lessonsCompleted: 18,
      totalLessons: 40,
      streak: 2,
    },
    {
      id: "3",
      name: "Fatima Al-Rashid",
      grade: "Grade 8",
      totalProgress: 92,
      mathProgress: 95,
      scienceProgress: 88,
      languageProgress: 93,
      lastActive: "30 min ago",
      status: "active",
      lessonsCompleted: 37,
      totalLessons: 40,
      streak: 12,
    },
    {
      id: "4",
      name: "Joseph Mbeki",
      grade: "Grade 7",
      totalProgress: 23,
      mathProgress: 30,
      scienceProgress: 15,
      languageProgress: 25,
      lastActive: "3 days ago",
      status: "inactive",
      lessonsCompleted: 9,
      totalLessons: 40,
      streak: 0,
    },
    {
      id: "5",
      name: "Aisha Okafor",
      grade: "Grade 8",
      totalProgress: 78,
      mathProgress: 85,
      scienceProgress: 70,
      languageProgress: 80,
      lastActive: "1 hour ago",
      status: "active",
      lessonsCompleted: 31,
      totalLessons: 40,
      streak: 5,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 2))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || student.status === filterStatus
    return matchesSearch && matchesFilter
  })

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

  const classStats = {
    totalStudents: students.length,
    activeStudents: students.filter((s) => s.status === "active").length,
    strugglingStudents: students.filter((s) => s.status === "struggling").length,
    averageProgress: Math.round(students.reduce((sum, s) => sum + s.totalProgress, 0) / students.length),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold">Student Management</h1>
                  <p className="text-sm text-gray-600">Monitor student progress and performance</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Battery className="h-3 w-3" />
                  {Math.round(batteryLevel)}%
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <WifiOff className="h-3 w-3" />
                  Offline
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Class Overview */}
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
                    <p className="text-2xl font-bold">{classStats.activeStudents}</p>
                    <p className="text-sm text-gray-600">Active Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{classStats.strugglingStudents}</p>
                    <p className="text-sm text-gray-600">Need Help</p>
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
                    <p className="text-sm text-gray-600">Class Average</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === "active" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("active")}
                  >
                    Active
                  </Button>
                  <Button
                    variant={filterStatus === "struggling" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("struggling")}
                  >
                    Struggling
                  </Button>
                  <Button
                    variant={filterStatus === "inactive" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("inactive")}
                  >
                    Inactive
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Students List */}
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <p className="text-sm text-gray-600">
                          {student.grade} • Last active: {student.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(student.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(student.status)}
                          <span className="capitalize">{student.status}</span>
                        </div>
                      </Badge>
                      <div className="text-right">
                        <p className="font-semibold">{student.totalProgress}%</p>
                        <p className="text-xs text-gray-600">{student.streak} day streak</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span>{student.totalProgress}%</span>
                      </div>
                      <Progress value={student.totalProgress} className="h-2" />
                      <p className="text-xs text-gray-600 mt-1">
                        {student.lessonsCompleted}/{student.totalLessons} lessons
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mathematics</span>
                        <span>{student.mathProgress}%</span>
                      </div>
                      <Progress value={student.mathProgress} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Science</span>
                        <span>{student.scienceProgress}%</span>
                      </div>
                      <Progress value={student.scienceProgress} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>English</span>
                        <span>{student.languageProgress}%</span>
                      </div>
                      <Progress value={student.languageProgress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold mb-2">No students found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
