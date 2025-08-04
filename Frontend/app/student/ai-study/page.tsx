"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Send,
  Brain,
  Sparkles,
  MessageSquare,
  FileText,
  Users,
  Lightbulb,
  Battery,
  WifiOff,
  Copy,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  AlertCircle,
  BookOpen,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface StudyPlan {
  id: string
  subject: string
  topic: string
  difficulty: "Easy" | "Medium" | "Hard"
  estimatedTime: string
  status: "pending" | "approved" | "in-progress" | "completed"
  teacherFeedback?: string
  aiGenerated: boolean
  createdAt: string
}

interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: string
  subject?: string
  approved?: boolean
}

export default function AIStudyPage() {
  const router = useRouter()
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      content:
        "Hello! I'm your AI study assistant. I can help you with homework, explain concepts, create study plans, and answer questions. What would you like to learn about today?",
      timestamp: "10:00 AM",
    },
  ])

  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([
    {
      id: "1",
      subject: "Mathematics",
      topic: "Fractions and Decimals Review",
      difficulty: "Medium",
      estimatedTime: "2 hours",
      status: "approved",
      teacherFeedback: "Good plan! Focus on word problems too.",
      aiGenerated: true,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      subject: "Science",
      topic: "Photosynthesis Deep Dive",
      difficulty: "Hard",
      estimatedTime: "1.5 hours",
      status: "pending",
      aiGenerated: true,
      createdAt: "2024-01-16",
    },
    {
      id: "3",
      subject: "English",
      topic: "Essay Writing Practice",
      difficulty: "Medium",
      estimatedTime: "1 hour",
      status: "in-progress",
      teacherFeedback: "Start with paragraph structure first",
      aiGenerated: true,
      createdAt: "2024-01-14",
    },
  ])

  const quickActions = [
    {
      title: "Explain Concept",
      description: "Get detailed explanations of difficult topics",
      icon: Lightbulb,
      color: "bg-yellow-100 text-yellow-800",
      prompt: "Can you explain the concept of quadratic equations?",
    },
    {
      title: "Homework Help",
      description: "Get step-by-step solutions to problems",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-800",
      prompt: "I need help with my math homework on algebra",
    },
    {
      title: "Study Plan",
      description: "Create personalized study schedules",
      icon: Target,
      color: "bg-green-100 text-green-800",
      prompt: "Create a study plan for my upcoming science exam",
    },
    {
      title: "Practice Questions",
      description: "Generate practice problems and quizzes",
      icon: Brain,
      color: "bg-purple-100 text-purple-800",
      prompt: "Generate practice questions for chemistry",
    },
  ]

  const recentTopics = [
    { topic: "Quadratic Equations", subject: "Mathematics", time: "2 hours ago" },
    { topic: "Chemical Bonding", subject: "Science", time: "1 day ago" },
    { topic: "Essay Writing", subject: "English", time: "2 days ago" },
  ]

  const studyInsights = [
    {
      title: "Strong Areas",
      items: ["Algebra", "Grammar", "Physics"],
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Focus Areas",
      items: ["Geometry", "Chemistry", "Vocabulary"],
      icon: Target,
      color: "text-orange-600",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 2))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        type: "user",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setChatHistory([...chatHistory, newMessage])
      setMessage("")

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          type: "ai",
          content:
            "I understand you're asking about " +
            message +
            ". Let me help you with that. This is a simulated response - in the real app, this would connect to an actual AI service.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setChatHistory((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  const generateStudyPlan = async () => {
    // Logic to generate study plan
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <Target className="h-4 w-4" />
      case "completed":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
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
                    AI Study Assistant
                  </h1>
                  <p className="text-sm text-gray-600">Personalized learning with teacher supervision</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 text-purple-600">
                  <Sparkles className="h-3 w-3" />
                  AI Powered
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                  <Users className="h-3 w-3" />
                  Teacher Supervised
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
          <Tabs defaultValue="chat" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="chat">AI Chat</TabsTrigger>
              <TabsTrigger value="study-plans">Study Plans</TabsTrigger>
              <TabsTrigger value="practice">Practice Mode</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="h-[600px] flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        AI Study Chat
                        <Badge variant="outline" className="ml-auto text-xs">
                          Teacher Monitored
                        </Badge>
                      </CardTitle>
                      <CardDescription>Ask questions, get explanations, and receive personalized help</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {/* Chat Messages */}
                      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                        {chatHistory.map((msg, index) => (
                          <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p className={`text-xs mt-1 ${msg.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                                {msg.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="flex gap-2">
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Ask me anything about your studies..."
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                          className="flex-1"
                        />
                        <Button onClick={sendMessage} disabled={!message.trim()}>
                          <Send className="size-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start h-auto p-3 bg-transparent"
                          onClick={() => setMessage(action.prompt)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-1 rounded ${action.color}`}>
                              <action.icon className="size-4" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-sm">{action.title}</p>
                              <p className="text-xs text-gray-600">{action.description}</p>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recent Topics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="size-4" />
                        Recent Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {recentTopics.map((topic, index) => (
                        <div key={index} className="p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <p className="font-medium text-sm">{topic.topic}</p>
                          <p className="text-xs text-gray-600">
                            {topic.subject} • {topic.time}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Study Insights */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Study Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {studyInsights.map((insight, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-2 mb-2">
                            <insight.icon className={`size-4 ${insight.color}`} />
                            <span className="font-medium text-sm">{insight.title}</span>
                          </div>
                          <div className="space-y-1">
                            {insight.items.map((item, itemIndex) => (
                              <Badge key={itemIndex} variant="outline" className="text-xs mr-1">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="study-plans" className="space-y-4">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {studyPlans.map((plan) => (
                    <Card key={plan.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{plan.topic}</h3>
                              <Badge className={getStatusColor(plan.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(plan.status)}
                                  <span className="capitalize">{plan.status.replace("-", " ")}</span>
                                </div>
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span>{plan.subject}</span>
                              <span>•</span>
                              <span>{plan.difficulty}</span>
                              <span>•</span>
                              <span>{plan.estimatedTime}</span>
                              <span>•</span>
                              <span>{plan.createdAt}</span>
                            </div>
                            {plan.teacherFeedback && (
                              <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                                <strong>Teacher Feedback:</strong> {plan.teacherFeedback}
                              </div>
                            )}
                            {plan.aiGenerated && (
                              <Badge variant="outline" className="mt-2 text-xs">
                                <Brain className="h-3 w-3 mr-1" />
                                AI Generated
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {plan.status === "approved" && <Button size="sm">Start Studying</Button>}
                            {plan.status === "in-progress" && (
                              <Button size="sm" variant="outline">
                                Continue
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        Create Study Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Subject</label>
                        <select className="w-full mt-1 px-3 py-2 border rounded-md">
                          <option>Mathematics</option>
                          <option>Science</option>
                          <option>English</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Study Goal</label>
                        <Input placeholder="e.g., Master fractions and decimals" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Time Available</label>
                        <Input placeholder="e.g., 2 hours per day" className="mt-1" />
                      </div>
                      <Button className="w-full" onClick={generateStudyPlan}>
                        <Brain className="h-4 w-4 mr-2" />
                        Generate AI Study Plan
                      </Button>
                      <div className="text-xs text-gray-500 text-center">Plan will be sent to teacher for approval</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="practice" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      AI Practice Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Subject</label>
                      <select className="w-full mt-1 px-3 py-2 border rounded-md">
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>English</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Topic</label>
                      <Input placeholder="e.g., Fractions, Photosynthesis, Grammar" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Difficulty</label>
                      <select className="w-full mt-1 px-3 py-2 border rounded-md">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Number of Questions</label>
                      <Input placeholder="e.g., 10" type="number" />
                    </div>
                    <Button className="w-full">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Practice Questions
                    </Button>
                    <div className="text-xs text-gray-500 text-center">Questions reviewed by teacher before use</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-500" />
                      Exam Preparation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Upcoming Exam</label>
                      <Input placeholder="e.g., Math Mid-term" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Exam Date</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Topics to Cover</label>
                      <Textarea placeholder="List the topics that will be on the exam" rows={3} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Study Time Per Day</label>
                      <Input placeholder="e.g., 1 hour" />
                    </div>
                    <Button className="w-full">
                      <Brain className="h-4 w-4 mr-2" />
                      Create Exam Prep Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Practice Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Fractions Practice</h4>
                        <p className="text-sm text-gray-600">Mathematics • 10 questions • 85% score</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Photosynthesis Quiz</h4>
                        <p className="text-sm text-gray-600">Science • 8 questions • In Progress</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Grammar Exercise</h4>
                        <p className="text-sm text-gray-600">English • 15 questions • Pending Approval</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Study Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Mathematics</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Science</span>
                          <span>65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>English</span>
                          <span>82%</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      This Week's Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Complete fractions review</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Practice 20 math problems</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Study photosynthesis process</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Write practice essay</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>AI Study Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">📈 Improvement Areas</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Math word problems need more practice</li>
                        <li>• Science diagrams understanding</li>
                        <li>• English essay structure</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">💪 Strengths</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Quick calculation skills</li>
                        <li>• Good vocabulary knowledge</li>
                        <li>• Consistent study habits</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">🎯 Recommendations</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Focus on visual learning for science</li>
                        <li>• Practice timed math exercises</li>
                        <li>• Read more diverse texts</li>
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
