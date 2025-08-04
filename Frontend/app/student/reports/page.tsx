"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Clock, Award, Target, Download, Filter, BookOpen, Brain, Trophy } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // Sample data for charts
  const progressData = [
    { name: "Week 1", math: 65, science: 70, english: 80 },
    { name: "Week 2", math: 70, science: 75, english: 85 },
    { name: "Week 3", math: 75, science: 80, english: 88 },
    { name: "Week 4", math: 80, science: 85, english: 90 },
  ]

  const subjectData = [
    { subject: "Mathematics", completed: 18, total: 24, score: 87 },
    { subject: "Science", completed: 12, total: 20, score: 82 },
    { subject: "English", completed: 15, total: 18, score: 91 },
  ]

  const timeSpentData = [
    { name: "Mon", hours: 2.5 },
    { name: "Tue", hours: 3.2 },
    { name: "Wed", hours: 1.8 },
    { name: "Thu", hours: 2.9 },
    { name: "Fri", hours: 3.5 },
    { name: "Sat", hours: 4.1 },
    { name: "Sun", hours: 2.3 },
  ]

  const skillsData = [
    { name: "Problem Solving", value: 85, color: "#8884d8" },
    { name: "Critical Thinking", value: 78, color: "#82ca9d" },
    { name: "Communication", value: 92, color: "#ffc658" },
    { name: "Creativity", value: 76, color: "#ff7300" },
  ]

  const achievements = [
    { title: "Math Master", description: "Completed 10 math lessons", date: "2024-01-15", type: "academic" },
    { title: "Science Explorer", description: "Finished chemistry module", date: "2024-01-10", type: "academic" },
    { title: "Perfect Score", description: "100% on English quiz", date: "2024-01-08", type: "performance" },
    { title: "Study Streak", description: "7 days consecutive learning", date: "2024-01-05", type: "habit" },
  ]

  const recentQuizzes = [
    { subject: "Mathematics", topic: "Algebra Basics", score: 95, date: "2024-01-15", questions: 20 },
    { subject: "Science", topic: "Chemical Reactions", score: 88, date: "2024-01-12", questions: 15 },
    { subject: "English", topic: "Grammar Rules", score: 92, date: "2024-01-10", questions: 25 },
    { subject: "Mathematics", topic: "Geometry", score: 85, date: "2024-01-08", questions: 18 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Reports</h1>
          <p className="text-gray-600 mt-1">Track your progress and achievements</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Lessons</p>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-green-600">+5 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-green-600">+3% improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Study Time</p>
                <p className="text-2xl font-bold">24h</p>
                <p className="text-xs text-green-600">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Trophy className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-green-600">+2 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="progress" className="space-y-4">
        <TabsList>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Over Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress Over Time
                </CardTitle>
                <CardDescription>Your learning progress across subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="math" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="science" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="english" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Subject Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Completion</CardTitle>
                <CardDescription>Progress in each subject area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjectData.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {subject.completed}/{subject.total}
                        </span>
                        <Badge variant="secondary">{subject.score}%</Badge>
                      </div>
                    </div>
                    <Progress value={(subject.completed / subject.total) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Weekly Study Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Weekly Study Time
              </CardTitle>
              <CardDescription>Hours spent learning each day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeSpentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Skills Assessment
                </CardTitle>
                <CardDescription>Your performance in key skill areas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={skillsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Quiz Results */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Quiz Results</CardTitle>
                <CardDescription>Your latest quiz performances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{quiz.topic}</h4>
                        <p className="text-sm text-gray-600">
                          {quiz.subject} • {quiz.questions} questions
                        </p>
                        <p className="text-xs text-gray-500">{quiz.date}</p>
                      </div>
                      <Badge
                        variant={quiz.score >= 90 ? "default" : quiz.score >= 80 ? "secondary" : "destructive"}
                        className="text-lg px-3 py-1"
                      >
                        {quiz.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Your Achievements
              </CardTitle>
              <CardDescription>Milestones and accomplishments in your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                  >
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Trophy className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-yellow-900">{achievement.title}</h4>
                      <p className="text-sm text-yellow-700">{achievement.description}</p>
                      <p className="text-xs text-yellow-600 mt-1">{achievement.date}</p>
                    </div>
                    <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                      {achievement.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Detailed Stats */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Detailed Learning Analytics</CardTitle>
                <CardDescription>Comprehensive breakdown of your learning patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">73%</div>
                    <div className="text-sm text-blue-700">Retention Rate</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">2.3x</div>
                    <div className="text-sm text-green-700">Learning Speed</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">94%</div>
                    <div className="text-sm text-purple-700">Engagement Score</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">15</div>
                    <div className="text-sm text-orange-700">Streak Days</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Learning Patterns</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Morning Sessions</span>
                      <div className="flex items-center gap-2">
                        <Progress value={65} className="w-24 h-2" />
                        <span className="text-sm text-gray-600">65%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Afternoon Sessions</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-24 h-2" />
                        <span className="text-sm text-gray-600">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Evening Sessions</span>
                      <div className="flex items-center gap-2">
                        <Progress value={10} className="w-24 h-2" />
                        <span className="text-sm text-gray-600">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h5 className="font-medium text-blue-900">Focus Area</h5>
                  <p className="text-sm text-blue-700">Spend more time on algebra concepts to improve math scores.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h5 className="font-medium text-green-900">Study Time</h5>
                  <p className="text-sm text-green-700">Your morning sessions show 23% better retention.</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h5 className="font-medium text-purple-900">Next Goal</h5>
                  <p className="text-sm text-purple-700">Complete 3 more lessons to unlock the next certificate.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
