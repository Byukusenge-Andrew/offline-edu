"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, BookOpen, Trophy, Clock, Target, Calendar, BarChart3, CheckCircle, XCircle } from "lucide-react"

interface StudentProgressDialogProps {
  student: {
    id: string
    name: string
    email: string
    avatar?: string
    grade: string
    enrolledDate: string
  }
  trigger?: React.ReactNode
}

export function StudentProgressDialog({ student, trigger }: StudentProgressDialogProps) {
  const [open, setOpen] = useState(false)

  // Mock data - in real app, this would come from API
  const progressData = {
    overall: {
      completedLessons: 45,
      totalLessons: 60,
      averageScore: 87,
      timeSpent: 120, // hours
      streak: 12, // days
      rank: 3,
    },
    subjects: [
      {
        name: "Mathematics",
        progress: 75,
        grade: "A-",
        lessonsCompleted: 18,
        totalLessons: 24,
        lastActivity: "2 hours ago",
        strengths: ["Algebra", "Geometry"],
        weaknesses: ["Statistics"],
      },
      {
        name: "Science",
        progress: 90,
        grade: "A+",
        lessonsCompleted: 27,
        totalLessons: 30,
        lastActivity: "1 day ago",
        strengths: ["Biology", "Chemistry"],
        weaknesses: ["Physics"],
      },
      {
        name: "English",
        progress: 60,
        grade: "B",
        lessonsCompleted: 12,
        totalLessons: 20,
        lastActivity: "3 days ago",
        strengths: ["Reading"],
        weaknesses: ["Writing", "Grammar"],
      },
    ],
    recentActivities: [
      {
        type: "lesson",
        title: "Completed: Quadratic Equations",
        subject: "Mathematics",
        score: 92,
        timestamp: "2 hours ago",
        status: "completed",
      },
      {
        type: "quiz",
        title: "Quiz: Cell Biology",
        subject: "Science",
        score: 88,
        timestamp: "1 day ago",
        status: "completed",
      },
      {
        type: "assignment",
        title: "Essay: Climate Change",
        subject: "English",
        score: 0,
        timestamp: "2 days ago",
        status: "pending",
      },
      {
        type: "lesson",
        title: "Started: Chemical Reactions",
        subject: "Science",
        score: 0,
        timestamp: "3 days ago",
        status: "in-progress",
      },
    ],
    achievements: [
      {
        id: "1",
        title: "Math Wizard",
        description: "Completed 20 math lessons",
        icon: "🧮",
        earnedDate: "2024-01-15",
        category: "subject",
      },
      {
        id: "2",
        title: "Perfect Score",
        description: "Scored 100% on 5 quizzes",
        icon: "💯",
        earnedDate: "2024-01-10",
        category: "performance",
      },
      {
        id: "3",
        title: "Study Streak",
        description: "Studied for 10 consecutive days",
        icon: "🔥",
        earnedDate: "2024-01-08",
        category: "consistency",
      },
    ],
  }

  const getActivityIcon = (type: string, status: string) => {
    if (status === "completed") return <CheckCircle className="h-4 w-4 text-green-500" />
    if (status === "pending") return <Clock className="h-4 w-4 text-yellow-500" />
    if (status === "in-progress") return <BookOpen className="h-4 w-4 text-blue-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600 bg-green-100"
    if (grade.startsWith("B")) return "text-blue-600 bg-blue-100"
    if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            View Progress
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={student.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{student.name}</div>
              <div className="text-sm text-gray-600">
                {student.grade} • {student.email}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>Enrolled on {new Date(student.enrolledDate).toLocaleDateString()}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">{progressData.overall.completedLessons}</div>
                      <div className="text-sm text-gray-600">Lessons Completed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">{progressData.overall.averageScore}%</div>
                      <div className="text-sm text-gray-600">Average Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold">{progressData.overall.timeSpent}h</div>
                      <div className="text-sm text-gray-600">Time Spent</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="text-2xl font-bold">#{progressData.overall.rank}</div>
                      <div className="text-sm text-gray-600">Class Rank</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Course Completion</span>
                      <span>
                        {Math.round((progressData.overall.completedLessons / progressData.overall.totalLessons) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(progressData.overall.completedLessons / progressData.overall.totalLessons) * 100}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Study Streak:</span>
                      <span className="ml-2 font-medium">{progressData.overall.streak} days</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Active:</span>
                      <span className="ml-2 font-medium">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-4">
            {progressData.subjects.map((subject, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <Badge className={getGradeColor(subject.grade)}>{subject.grade}</Badge>
                  </div>
                  <CardDescription>
                    {subject.lessonsCompleted} of {subject.totalLessons} lessons completed • Last activity:{" "}
                    {subject.lastActivity}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
                        <div className="flex flex-wrap gap-1">
                          {subject.strengths.map((strength, i) => (
                            <Badge key={i} variant="outline" className="text-green-600 border-green-200">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-600 mb-2">Areas for Improvement</h4>
                        <div className="flex flex-wrap gap-1">
                          {subject.weaknesses.map((weakness, i) => (
                            <Badge key={i} variant="outline" className="text-red-600 border-red-200">
                              {weakness}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {progressData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      {getActivityIcon(activity.type, activity.status)}
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-gray-600">
                          {activity.subject} • {activity.timestamp}
                        </div>
                      </div>
                      {activity.status === "completed" && activity.score > 0 && (
                        <Badge variant="secondary">{activity.score}%</Badge>
                      )}
                      <Badge
                        variant={
                          activity.status === "completed"
                            ? "default"
                            : activity.status === "pending"
                              ? "secondary"
                              : activity.status === "in-progress"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progressData.achievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {achievement.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
