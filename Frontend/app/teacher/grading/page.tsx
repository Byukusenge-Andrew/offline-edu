"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  FileText,
  Brain,
  Sparkles,
  Download,
  Eye,
  Edit,
  Battery,
  WifiOff,
  BarChart3,
  Users,
  Target,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Assignment {
  id: string
  title: string
  subject: string
  type: "quiz" | "homework" | "project" | "test"
  dueDate: string
  totalSubmissions: number
  gradedSubmissions: number
  averageScore: number
  status: "pending" | "in-progress" | "completed"
  aiGradingAvailable: boolean
}

interface Submission {
  id: string
  studentName: string
  studentId: string
  submissionDate: string
  status: "submitted" | "graded" | "returned"
  score?: number
  maxScore: number
  aiSuggestion?: number
  feedback?: string
  timeSpent?: string
}

export default function GradingPage() {
  const router = useRouter()
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null)
  const [isAIGrading, setIsAIGrading] = useState(false)

  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Fractions Quiz",
      subject: "Mathematics",
      type: "quiz",
      dueDate: "2024-12-15",
      totalSubmissions: 28,
      gradedSubmissions: 15,
      averageScore: 78,
      status: "in-progress",
      aiGradingAvailable: true,
    },
    {
      id: "2",
      title: "Photosynthesis Essay",
      subject: "Science",
      type: "homework",
      dueDate: "2024-12-12",
      totalSubmissions: 25,
      gradedSubmissions: 25,
      averageScore: 82,
      status: "completed",
      aiGradingAvailable: true,
    },
    {
      id: "3",
      title: "Grammar Worksheet",
      subject: "English",
      type: "homework",
      dueDate: "2024-12-18",
      totalSubmissions: 22,
      gradedSubmissions: 8,
      averageScore: 75,
      status: "in-progress",
      aiGradingAvailable: true,
    },
    {
      id: "4",
      title: "Science Fair Project",
      subject: "Science",
      type: "project",
      dueDate: "2024-12-20",
      totalSubmissions: 18,
      gradedSubmissions: 0,
      averageScore: 0,
      status: "pending",
      aiGradingAvailable: false,
    },
  ]

  const submissions: Submission[] = [
    {
      id: "1",
      studentName: "Amara Johnson",
      studentId: "STU-001",
      submissionDate: "2024-12-14",
      status: "submitted",
      score: 85,
      maxScore: 100,
      aiSuggestion: 87,
      timeSpent: "25 min",
    },
    {
      id: "2",
      studentName: "Kwame Asante",
      studentId: "STU-002",
      submissionDate: "2024-12-14",
      status: "graded",
      score: 72,
      maxScore: 100,
      aiSuggestion: 74,
      feedback: "Good understanding of basic concepts. Need to work on complex problems.",
      timeSpent: "18 min",
    },
    {
      id: "3",
      studentName: "Fatima Al-Rashid",
      studentId: "STU-003",
      submissionDate: "2024-12-13",
      status: "graded",
      score: 94,
      maxScore: 100,
      aiSuggestion: 93,
      feedback: "Excellent work! Shows deep understanding of fraction operations.",
      timeSpent: "22 min",
    },
    {
      id: "4",
      studentName: "Joseph Mbeki",
      studentId: "STU-004",
      submissionDate: "2024-12-15",
      status: "submitted",
      maxScore: 100,
      aiSuggestion: 58,
      timeSpent: "35 min",
    },
    {
      id: "5",
      studentName: "Aisha Okafor",
      studentId: "STU-005",
      submissionDate: "2024-12-14",
      status: "graded",
      score: 88,
      maxScore: 100,
      aiSuggestion: 89,
      feedback: "Strong performance. Minor calculation errors in question 3.",
      timeSpent: "20 min",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 2))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case "graded":
        return "bg-green-100 text-green-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "returned":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const runAIGrading = async (assignmentId: string) => {
    setIsAIGrading(true)
    // Simulate AI grading process
    setTimeout(() => {
      setIsAIGrading(false)
      alert("AI grading completed! Suggestions have been generated for all submissions.")
    }, 3000)
  }

  const acceptAISuggestion = (submissionId: string, aiScore: number) => {
    // In a real app, this would update the submission with the AI suggested score
    alert(`AI suggestion of ${aiScore}% accepted for submission ${submissionId}`)
  }

  const pendingAssignments = assignments.filter((a) => a.status !== "completed")
  const completedAssignments = assignments.filter((a) => a.status === "completed")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold">AI-Powered Grading</h1>
                  <p className="text-sm text-gray-600">Intelligent assessment and feedback system</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 text-purple-600">
                  <Brain className="h-3 w-3" />
                  AI Enabled
                </Badge>
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
          {/* Grading Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{assignments.length}</div>
                <p className="text-xs text-gray-600">Total Assignments</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">{pendingAssignments.length}</div>
                <p className="text-xs text-gray-600">Pending Grading</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Brain className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{assignments.filter((a) => a.aiGradingAvailable).length}</div>
                <p className="text-xs text-gray-600">AI Gradable</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">
                  {Math.round(assignments.reduce((sum, a) => sum + a.averageScore, 0) / assignments.length)}%
                </div>
                <p className="text-xs text-gray-600">Avg Score</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
              <TabsTrigger value="ai-grading">AI Grading</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedAssignments.length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              <div className="grid gap-4">
                {pendingAssignments.map((assignment) => (
                  <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            {assignment.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            {assignment.subject} • Due: {assignment.dueDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                          {assignment.aiGradingAvailable && (
                            <Badge variant="outline" className="text-purple-600">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI Ready
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Submissions</p>
                          <p className="text-2xl font-bold">
                            {assignment.gradedSubmissions}/{assignment.totalSubmissions}
                          </p>
                          <Progress
                            value={(assignment.gradedSubmissions / assignment.totalSubmissions) * 100}
                            className="h-2 mt-1"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Average Score</p>
                          <p className="text-2xl font-bold">{assignment.averageScore}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Type</p>
                          <Badge variant="outline" className="capitalize">
                            {assignment.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setSelectedAssignment(assignment.id)} className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Review Submissions
                        </Button>
                        {assignment.aiGradingAvailable && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => runAIGrading(assignment.id)}
                            disabled={isAIGrading}
                          >
                            {isAIGrading ? (
                              <>
                                <Sparkles className="h-3 w-3 mr-1 animate-spin" />
                                AI Grading...
                              </>
                            ) : (
                              <>
                                <Brain className="h-3 w-3 mr-1" />
                                AI Grade
                              </>
                            )}
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai-grading" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    AI Grading Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Fractions Quiz - Submissions</h3>
                      <div className="space-y-3">
                        {submissions.slice(0, 3).map((submission) => (
                          <div key={submission.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{submission.studentName}</h4>
                              <Badge className={getSubmissionStatusColor(submission.status)}>{submission.status}</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">Current Score</p>
                                <p className="font-semibold">
                                  {submission.score ? `${submission.score}%` : "Not graded"}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">AI Suggestion</p>
                                <p className="font-semibold text-purple-600">{submission.aiSuggestion}%</p>
                              </div>
                            </div>
                            {submission.aiSuggestion && !submission.score && (
                              <div className="mt-2 flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => acceptAISuggestion(submission.id, submission.aiSuggestion!)}
                                >
                                  Accept AI Score
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3 mr-1" />
                                  Manual Grade
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">AI Grading Insights</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-1">Pattern Recognition</h4>
                          <p className="text-sm text-blue-700">
                            Common mistake: 60% of students confused improper fractions with mixed numbers
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-1">Strong Performance</h4>
                          <p className="text-sm text-green-700">85% of students mastered basic fraction addition</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-1">Needs Attention</h4>
                          <p className="text-sm text-orange-700">
                            3 students require additional support with fraction division
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">AI Recommendations</h4>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li>• Create remedial lesson on improper fractions</li>
                          <li>• Provide additional practice problems</li>
                          <li>• Schedule one-on-one sessions for struggling students</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid gap-4">
                {completedAssignments.map((assignment) => (
                  <Card key={assignment.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            {assignment.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            {assignment.subject} • Completed on {assignment.dueDate}
                          </p>
                        </div>
                        <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Submissions</p>
                          <p className="text-xl font-bold">{assignment.totalSubmissions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Average Score</p>
                          <p className="text-xl font-bold">{assignment.averageScore}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Completion Rate</p>
                          <p className="text-xl font-bold">100%</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Grading Efficiency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">65%</div>
                        <p className="text-sm text-gray-600">Time Saved with AI</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="font-bold text-green-600">2.3 min</div>
                          <p className="text-gray-600">Avg per submission</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded">
                          <div className="font-bold text-purple-600">94%</div>
                          <p className="text-gray-600">AI Accuracy</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Student Performance Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Mathematics</span>
                          <span>78% avg</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Science</span>
                          <span>82% avg</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>English</span>
                          <span>75% avg</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>AI Grading Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2">✅ Success Patterns</h4>
                      <p className="text-sm text-green-700">
                        Students who complete practice exercises score 23% higher on assessments
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Common Errors</h4>
                      <p className="text-sm text-yellow-700">
                        Calculation mistakes account for 40% of point deductions in math
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2">📈 Improvement Areas</h4>
                      <p className="text-sm text-blue-700">
                        Focus on word problems - 60% of students struggle with interpretation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
