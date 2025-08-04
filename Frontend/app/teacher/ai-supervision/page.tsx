"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Brain,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  FileText,
  Target,
  TrendingUp,
  Battery,
  WifiOff,
  Eye,
  Edit,
  Sparkles,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface PendingRequest {
  id: string
  studentName: string
  type: "study-plan" | "practice-questions" | "explanation" | "exam-prep"
  subject: string
  content: string
  aiResponse: string
  timestamp: string
  priority: "high" | "medium" | "low"
  status: "pending" | "approved" | "rejected" | "modified"
}

interface StudentActivity {
  id: string
  studentName: string
  subject: string
  activity: string
  aiInteractions: number
  lastActive: string
  needsAttention: boolean
}

export default function AISupervisionPage() {
  const router = useRouter()
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null)
  const [teacherFeedback, setTeacherFeedback] = useState("")
  const [modifiedContent, setModifiedContent] = useState("")

  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([
    {
      id: "1",
      studentName: "Amara Johnson",
      type: "study-plan",
      subject: "Mathematics",
      content: "Create a study plan for fractions and decimals",
      aiResponse:
        "I'll create a comprehensive study plan focusing on fractions and decimals with practice problems and real-world applications...",
      timestamp: "2 hours ago",
      priority: "medium",
      status: "pending",
    },
    {
      id: "2",
      studentName: "Joseph Mbeki",
      type: "explanation",
      subject: "Science",
      content: "Explain photosynthesis process",
      aiResponse:
        "Photosynthesis is the process by which plants convert sunlight into energy. Here's how it works step by step...",
      timestamp: "1 hour ago",
      priority: "high",
      status: "pending",
    },
    {
      id: "3",
      studentName: "Fatima Al-Rashid",
      type: "practice-questions",
      subject: "English",
      content: "Generate grammar practice questions",
      aiResponse: "Here are 10 grammar practice questions focusing on verb tenses and sentence structure...",
      timestamp: "30 minutes ago",
      priority: "low",
      status: "pending",
    },
  ])

  const [studentActivities, setStudentActivities] = useState<StudentActivity[]>([
    {
      id: "1",
      studentName: "Amara Johnson",
      subject: "Mathematics",
      activity: "Studying fractions with AI assistance",
      aiInteractions: 15,
      lastActive: "10 minutes ago",
      needsAttention: false,
    },
    {
      id: "2",
      studentName: "Joseph Mbeki",
      subject: "Science",
      activity: "Struggling with photosynthesis concepts",
      aiInteractions: 8,
      lastActive: "1 hour ago",
      needsAttention: true,
    },
    {
      id: "3",
      studentName: "Fatima Al-Rashid",
      subject: "English",
      activity: "Practicing essay writing",
      aiInteractions: 12,
      lastActive: "2 hours ago",
      needsAttention: false,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 2))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleApprove = (requestId: string) => {
    setPendingRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "approved" as const } : req)),
    )
    setSelectedRequest(null)
  }

  const handleReject = (requestId: string) => {
    setPendingRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "rejected" as const } : req)),
    )
    setSelectedRequest(null)
  }

  const handleModify = (requestId: string) => {
    if (!modifiedContent.trim()) return

    setPendingRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "modified" as const, aiResponse: modifiedContent } : req,
      ),
    )
    setModifiedContent("")
    setSelectedRequest(null)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "modified":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "study-plan":
        return <Target className="h-4 w-4" />
      case "practice-questions":
        return <FileText className="h-4 w-4" />
      case "explanation":
        return <MessageSquare className="h-4 w-4" />
      case "exam-prep":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

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
                  <h1 className="text-xl font-semibold flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    AI Study Supervision
                  </h1>
                  <p className="text-sm text-gray-600">Monitor and approve student AI interactions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 text-purple-600">
                  <Sparkles className="h-3 w-3" />
                  AI Supervision
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
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingRequests.filter((r) => r.status === "pending").length}</p>
                    <p className="text-sm text-gray-600">Pending Approvals</p>
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
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-sm text-gray-600">Approved Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{studentActivities.length}</p>
                    <p className="text-sm text-gray-600">Active Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{studentActivities.filter((s) => s.needsAttention).length}</p>
                    <p className="text-sm text-gray-600">Need Attention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">Pending Requests</TabsTrigger>
              <TabsTrigger value="activity">Student Activity</TabsTrigger>
              <TabsTrigger value="approved">Approved Content</TabsTrigger>
              <TabsTrigger value="analytics">AI Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {pendingRequests
                    .filter((req) => req.status === "pending")
                    .map((request) => (
                      <Card key={request.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="p-1 bg-gray-100 rounded">{getTypeIcon(request.type)}</div>
                                <h3 className="font-semibold">{request.studentName}</h3>
                                <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                                <Badge variant="outline">{request.subject}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                <strong>Request:</strong> {request.content}
                              </p>
                              <p className="text-sm text-gray-500 mb-3">
                                <strong>AI Response Preview:</strong> {request.aiResponse.substring(0, 100)}...
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                {request.timestamp}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => setSelectedRequest(request)}>
                                <Eye className="h-3 w-3 mr-1" />
                                Review
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                <div>
                  {selectedRequest && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="h-5 w-5" />
                          Review Request
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Student: {selectedRequest.studentName}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Subject:</strong> {selectedRequest.subject}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Type:</strong> {selectedRequest.type.replace("-", " ")}
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-1">Student Request:</h5>
                          <p className="text-sm bg-gray-50 p-2 rounded">{selectedRequest.content}</p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-1">AI Response:</h5>
                          <div className="text-sm bg-blue-50 p-3 rounded max-h-40 overflow-y-auto">
                            {selectedRequest.aiResponse}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-1">Teacher Feedback (Optional):</h5>
                          <Textarea
                            value={teacherFeedback}
                            onChange={(e) => setTeacherFeedback(e.target.value)}
                            placeholder="Add feedback for the student..."
                            rows={3}
                          />
                        </div>

                        <div>
                          <h5 className="font-medium mb-1">Modify AI Response (Optional):</h5>
                          <Textarea
                            value={modifiedContent}
                            onChange={(e) => setModifiedContent(e.target.value)}
                            placeholder="Edit the AI response if needed..."
                            rows={4}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={() => handleApprove(selectedRequest.id)} className="flex-1">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleModify(selectedRequest.id)}
                            disabled={!modifiedContent.trim()}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Modify
                          </Button>
                          <Button variant="destructive" onClick={() => handleReject(selectedRequest.id)}>
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <div className="space-y-4">
                {studentActivities.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {activity.studentName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h3 className="font-semibold">{activity.studentName}</h3>
                            <p className="text-sm text-gray-600">{activity.activity}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                              <span>{activity.subject}</span>
                              <span>•</span>
                              <span>{activity.aiInteractions} AI interactions</span>
                              <span>•</span>
                              <span>Last active: {activity.lastActive}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {activity.needsAttention && (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Needs Attention
                            </Badge>
                          )}
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Contact
                          </Button>
                          <Button size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              <div className="space-y-4">
                {pendingRequests
                  .filter((req) => req.status === "approved")
                  .map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <h3 className="font-semibold">{request.studentName}</h3>
                              <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                              <Badge variant="outline">{request.subject}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Request:</strong> {request.content}
                            </p>
                            <div className="text-xs text-gray-500">Approved {request.timestamp}</div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View Full
                          </Button>
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
                      <TrendingUp className="h-5 w-5" />
                      AI Usage Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total AI Requests Today</span>
                        <span className="font-semibold">47</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Approval Rate</span>
                        <span className="font-semibold text-green-600">89%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average Response Time</span>
                        <span className="font-semibold">12 minutes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Most Active Subject</span>
                        <span className="font-semibold">Mathematics</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      AI Quality Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Content Accuracy</span>
                        <span className="font-semibold text-green-600">94%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Age Appropriateness</span>
                        <span className="font-semibold text-green-600">98%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Curriculum Alignment</span>
                        <span className="font-semibold text-blue-600">91%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Student Satisfaction</span>
                        <span className="font-semibold text-green-600">96%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly AI Supervision Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">✅ Approved Content</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 156 study plans approved</li>
                        <li>• 89 explanations verified</li>
                        <li>• 234 practice questions reviewed</li>
                        <li>• 45 exam prep plans approved</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">✏️ Modified Content</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 23 study plans adjusted</li>
                        <li>• 12 explanations simplified</li>
                        <li>• 18 questions difficulty changed</li>
                        <li>• 8 plans timeline modified</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">❌ Rejected Content</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• 5 inappropriate explanations</li>
                        <li>• 3 incorrect formulas</li>
                        <li>• 2 off-topic responses</li>
                        <li>• 1 age-inappropriate content</li>
                      </ul>
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
