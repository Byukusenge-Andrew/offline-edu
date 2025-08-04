"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Send,
  Brain,
  Sparkles,
  MessageSquare,
  FileText,
  BarChart3,
  Users,
  Lightbulb,
  Battery,
  WifiOff,
  Copy,
  Download,
  RefreshCw,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: string
  category?: "lesson-plan" | "assessment" | "analysis" | "general"
}

interface AIInsight {
  id: string
  title: string
  description: string
  category: "performance" | "content" | "student" | "curriculum"
  priority: "high" | "medium" | "low"
  actionable: boolean
}

export default function AIAssistantPage() {
  const router = useRouter()
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [currentMessage, setCurrentMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI teaching assistant. I can help you create lesson plans, analyze student performance, generate assessments, and provide educational insights. How can I assist you today?",
      timestamp: "10:00 AM",
    },
  ])

  const aiInsights: AIInsight[] = [
    {
      id: "1",
      title: "Math Performance Declining",
      description:
        "5 students showing 15% decrease in math scores over the past 2 weeks. Consider additional practice sessions.",
      category: "performance",
      priority: "high",
      actionable: true,
    },
    {
      id: "2",
      title: "Optimal Learning Time Identified",
      description:
        "Students perform 28% better during 2-4 PM sessions. Schedule challenging topics during this window.",
      category: "curriculum",
      priority: "medium",
      actionable: true,
    },
    {
      id: "3",
      title: "Content Gap in Science",
      description: "Physics concepts need reinforcement. Students struggling with force and motion topics.",
      category: "content",
      priority: "high",
      actionable: true,
    },
    {
      id: "4",
      title: "Engagement Pattern Analysis",
      description: "Interactive content shows 35% higher engagement than video-only lessons.",
      category: "content",
      priority: "low",
      actionable: false,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 2))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const sendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(currentMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages((prev) => [...prev, aiResponse])
      setIsGenerating(false)
    }, 2000)
  }

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("lesson plan") || input.includes("lesson")) {
      return `I'll help you create a comprehensive lesson plan. Here's a structured approach:

**Lesson Structure:**
1. **Learning Objectives** - What students will achieve
2. **Materials Needed** - Resources and tools required
3. **Introduction** (5 min) - Hook and context setting
4. **Main Content** (20 min) - Core concepts with examples
5. **Practice Activity** (10 min) - Hands-on application
6. **Assessment** (5 min) - Quick comprehension check
7. **Wrap-up** (5 min) - Summary and next steps

Would you like me to create a specific lesson plan for a particular topic and grade level?`
    }

    if (input.includes("assessment") || input.includes("quiz") || input.includes("test")) {
      return `I can help you create effective assessments. Here are some options:

**Assessment Types:**
- **Formative Assessment** - Quick checks during learning
- **Summative Assessment** - End-of-unit evaluations
- **Diagnostic Assessment** - Identify learning gaps
- **Performance-based** - Real-world application tasks

**Question Formats:**
- Multiple choice with distractors
- Short answer responses
- Problem-solving scenarios
- Visual interpretation tasks

What subject and grade level would you like to create an assessment for?`
    }

    if (input.includes("student") && (input.includes("performance") || input.includes("struggling"))) {
      return `Based on current data analysis, here are strategies for supporting struggling students:

**Intervention Strategies:**
1. **Differentiated Instruction** - Adapt content to learning styles
2. **Peer Tutoring** - Pair with stronger students
3. **Additional Practice** - Extra exercises with immediate feedback
4. **Visual Aids** - Use diagrams and illustrations
5. **Break Down Complex Tasks** - Smaller, manageable steps

**Monitoring Progress:**
- Weekly check-ins
- Progress tracking charts
- Parent communication
- Celebrate small wins

Would you like specific recommendations for particular students or subjects?`
    }

    return `I understand you're asking about "${userInput}". I can assist with:

• **Lesson Planning** - Create structured, engaging lessons
• **Assessment Design** - Build effective quizzes and tests  
• **Student Analysis** - Interpret performance data
• **Content Creation** - Generate educational materials
• **Curriculum Mapping** - Align with learning standards
• **Differentiation** - Adapt for diverse learners

Please let me know which area you'd like to explore, and I'll provide detailed, actionable guidance tailored to your needs.`
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "performance":
        return <BarChart3 className="h-4 w-4" />
      case "content":
        return <FileText className="h-4 w-4" />
      case "student":
        return <Users className="h-4 w-4" />
      case "curriculum":
        return <Brain className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  const quickPrompts = [
    "Create a math lesson plan for Grade 8 fractions",
    "Generate a science quiz about photosynthesis",
    "Analyze student performance trends",
    "Suggest activities for struggling readers",
    "Create assessment rubric for group projects",
    "Design interactive geometry exercises",
  ]

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
                    AI Teaching Assistant
                  </h1>
                  <p className="text-sm text-gray-600">Powered by Gemini AI - Your intelligent teaching companion</p>
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
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <Tabs defaultValue="chat" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="chat">AI Chat</TabsTrigger>
              <TabsTrigger value="insights">Smart Insights</TabsTrigger>
              <TabsTrigger value="generators">Content Generators</TabsTrigger>
              <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="h-[600px] flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        AI Teaching Assistant
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                        {chatMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <div className="whitespace-pre-wrap">{message.content}</div>
                              <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
                            </div>
                          </div>
                        ))}
                        {isGenerating && (
                          <div className="flex justify-start">
                            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 animate-spin" />
                                AI is thinking...
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          placeholder="Ask me anything about teaching, lesson plans, assessments..."
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                          disabled={isGenerating}
                        />
                        <Button onClick={sendMessage} disabled={isGenerating || !currentMessage.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Prompts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {quickPrompts.map((prompt, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full text-left justify-start h-auto p-3 bg-transparent"
                            onClick={() => setCurrentMessage(prompt)}
                          >
                            <div className="text-sm">{prompt}</div>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">AI Capabilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span>Lesson Plan Generation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-green-500" />
                          <span>Assessment Creation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-500" />
                          <span>Student Analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-orange-500" />
                          <span>Curriculum Alignment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          <span>Teaching Strategies</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid gap-4">
                {aiInsights.map((insight) => (
                  <Card key={insight.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">{getCategoryIcon(insight.category)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{insight.title}</h3>
                              <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {insight.category}
                              </Badge>
                              {insight.actionable && (
                                <Badge variant="outline" className="text-xs text-green-600">
                                  Actionable
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {insight.actionable && <Button size="sm">Take Action</Button>}
                          <Button size="sm" variant="outline">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2">📚 Curriculum Enhancement</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Based on student performance data, consider adding more visual learning materials to science
                        lessons. Students show 40% better retention with diagram-based explanations.
                      </p>
                      <Button size="sm" variant="outline">
                        Generate Visual Materials
                      </Button>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2">🎯 Teaching Strategy</h4>
                      <p className="text-sm text-green-700 mb-3">
                        Implement peer tutoring for mathematics. High-performing students can help struggling peers,
                        improving outcomes for both groups by an average of 25%.
                      </p>
                      <Button size="sm" variant="outline">
                        Create Peer Groups
                      </Button>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 mb-2">⏰ Schedule Optimization</h4>
                      <p className="text-sm text-purple-700 mb-3">
                        Schedule complex topics during 2-4 PM when student attention peaks. This timing shows 30% better
                        comprehension rates.
                      </p>
                      <Button size="sm" variant="outline">
                        Optimize Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="generators" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      Lesson Plan Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Topic</label>
                      <Input placeholder="e.g., Photosynthesis, Fractions, Grammar" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Grade Level</label>
                      <Input placeholder="e.g., Grade 8" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Duration</label>
                      <Input placeholder="e.g., 45 minutes" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Learning Objectives</label>
                      <Textarea placeholder="What should students learn?" rows={3} />
                    </div>
                    <Button className="w-full">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Lesson Plan
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-500" />
                      Assessment Builder
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Subject</label>
                      <Input placeholder="Mathematics, Science, English" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Topics Covered</label>
                      <Textarea placeholder="List the topics to assess" rows={2} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Question Count</label>
                      <Input placeholder="e.g., 10 questions" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Difficulty Level</label>
                      <Input placeholder="Easy, Medium, Hard" />
                    </div>
                    <Button className="w-full">
                      <Brain className="h-4 w-4 mr-2" />
                      Generate Assessment
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-500" />
                      Student Report Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Student Name</label>
                      <Input placeholder="Select or enter student name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Report Period</label>
                      <Input placeholder="e.g., November 2024" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Include Subjects</label>
                      <Input placeholder="Math, Science, English" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Report Type</label>
                      <Input placeholder="Progress, Performance, Comprehensive" />
                    </div>
                    <Button className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-orange-500" />
                      Activity Creator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Activity Type</label>
                      <Input placeholder="Group work, Individual, Hands-on" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Learning Goal</label>
                      <Input placeholder="What should students achieve?" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Available Resources</label>
                      <Textarea placeholder="List available materials and tools" rows={2} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Time Limit</label>
                      <Input placeholder="e.g., 30 minutes" />
                    </div>
                    <Button className="w-full">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Create Activity
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Class Performance Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Overall Trends</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Math scores improved 12% this month</li>
                          <li>• Science engagement up 18%</li>
                          <li>• English reading comprehension stable</li>
                          <li>• 4 students need additional support</li>
                        </ul>
                      </div>
                      <Button className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Individual Student Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h5 className="font-medium text-green-800">Amara Johnson</h5>
                        <p className="text-sm text-green-700">
                          Excelling in all subjects. Consider advanced materials.
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h5 className="font-medium text-yellow-800">Joseph Mbeki</h5>
                        <p className="text-sm text-yellow-700">Struggling with math concepts. Needs intervention.</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-blue-800">Fatima Al-Rashid</h5>
                        <p className="text-sm text-blue-700">Strong in English, improving in science.</p>
                      </div>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Export Detailed Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Immediate Actions</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Schedule math review session</li>
                        <li>• Create peer tutoring pairs</li>
                        <li>• Add visual aids to science</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">This Week</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Implement new math strategies</li>
                        <li>• Parent communication for 3 students</li>
                        <li>• Update lesson difficulty levels</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Long Term</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Curriculum adjustments</li>
                        <li>• Professional development focus</li>
                        <li>• Resource allocation planning</li>
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
