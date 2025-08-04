"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Plus,
  Search,
  BookOpen,
  Video,
  FileText,
  Brain,
  Wand2,
  Download,
  Edit,
  Trash2,
  Battery,
  WifiOff,
  Sparkles,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface ContentItem {
  id: string
  title: string
  subject: string
  type: "lesson" | "quiz" | "video" | "interactive"
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  description: string
  status: "published" | "draft" | "review"
  createdDate: string
  lastModified: string
  aiGenerated: boolean
}

export default function ContentPage() {
  const router = useRouter()
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [isGenerating, setIsGenerating] = useState(false)

  const contentItems: ContentItem[] = [
    {
      id: "1",
      title: "Introduction to Fractions",
      subject: "Mathematics",
      type: "lesson",
      difficulty: "Easy",
      duration: "15 min",
      description: "Basic concepts of fractions with visual examples",
      status: "published",
      createdDate: "2024-11-15",
      lastModified: "2024-11-20",
      aiGenerated: false,
    },
    {
      id: "2",
      title: "Photosynthesis Process",
      subject: "Science",
      type: "video",
      difficulty: "Medium",
      duration: "20 min",
      description: "How plants make food using sunlight",
      status: "published",
      createdDate: "2024-11-18",
      lastModified: "2024-11-18",
      aiGenerated: true,
    },
    {
      id: "3",
      title: "Grammar Quiz: Verb Tenses",
      subject: "English",
      type: "quiz",
      difficulty: "Medium",
      duration: "10 min",
      description: "Test understanding of past, present, and future tenses",
      status: "draft",
      createdDate: "2024-11-22",
      lastModified: "2024-11-22",
      aiGenerated: true,
    },
    {
      id: "4",
      title: "Interactive Geometry Explorer",
      subject: "Mathematics",
      type: "interactive",
      difficulty: "Hard",
      duration: "25 min",
      description: "Hands-on exploration of geometric shapes and properties",
      status: "review",
      createdDate: "2024-11-20",
      lastModified: "2024-11-21",
      aiGenerated: false,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 2))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const filteredContent = contentItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "all" || item.subject === selectedSubject
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesSubject && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return <BookOpen className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "quiz":
        return <FileText className="h-4 w-4" />
      case "interactive":
        return <Brain className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "review":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const generateAIContent = async () => {
    setIsGenerating(true)
    // Simulate AI content generation
    setTimeout(() => {
      setIsGenerating(false)
      alert("AI content generated! In a real app, this would create new lessons using Gemini AI.")
    }, 3000)
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
                  <h1 className="text-xl font-semibold">Content Management</h1>
                  <p className="text-sm text-gray-600">Create, manage, and organize learning materials</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={generateAIContent} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      AI Generate
                    </>
                  )}
                </Button>
                <Link href="/teacher/content/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Content
                  </Button>
                </Link>
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
          {/* Content Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{contentItems.length}</div>
                <p className="text-xs text-gray-600">Total Content</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Sparkles className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{contentItems.filter((item) => item.aiGenerated).length}</div>
                <p className="text-xs text-gray-600">AI Generated</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="h-6 w-6 mx-auto mb-2 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div className="text-2xl font-bold">
                  {contentItems.filter((item) => item.status === "published").length}
                </div>
                <p className="text-xs text-gray-600">Published</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Edit className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">
                  {contentItems.filter((item) => item.status === "draft").length}
                </div>
                <p className="text-xs text-gray-600">Drafts</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="library" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="library">Content Library</TabsTrigger>
              <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="analytics">Content Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="library" className="space-y-4">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="lesson">Lessons</SelectItem>
                        <SelectItem value="quiz">Quizzes</SelectItem>
                        <SelectItem value="video">Videos</SelectItem>
                        <SelectItem value="interactive">Interactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContent.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </div>
                        {item.aiGenerated && (
                          <Badge variant="outline" className="text-purple-600 border-purple-200">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Subject:</span>
                          <Badge variant="outline">{item.subject}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Difficulty:</span>
                          <Badge className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Status:</span>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai-tools" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="h-5 w-5 text-purple-500" />
                      AI Content Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="topic">Topic</Label>
                      <Input id="topic" placeholder="e.g., Photosynthesis, Fractions, Grammar" />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">Grade 6</SelectItem>
                          <SelectItem value="7">Grade 7</SelectItem>
                          <SelectItem value="8">Grade 8</SelectItem>
                          <SelectItem value="9">Grade 9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Content Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lesson">Lesson Plan</SelectItem>
                          <SelectItem value="quiz">Quiz Questions</SelectItem>
                          <SelectItem value="worksheet">Worksheet</SelectItem>
                          <SelectItem value="explanation">Concept Explanation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={generateAIContent} className="w-full" disabled={isGenerating}>
                      {isGenerating ? (
                        <>
                          <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                          Generating Content...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate Content
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-500" />
                      AI Assessment Builder
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="learning-objectives">Learning Objectives</Label>
                      <Textarea
                        id="learning-objectives"
                        placeholder="Describe what students should learn..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="difficulty-level">Difficulty Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="question-count">Number of Questions</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Questions</SelectItem>
                          <SelectItem value="10">10 Questions</SelectItem>
                          <SelectItem value="15">15 Questions</SelectItem>
                          <SelectItem value="20">20 Questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">
                      <Brain className="h-4 w-4 mr-2" />
                      Generate Assessment
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    AI Content Enhancement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
                      <div className="text-2xl mb-2">📝</div>
                      <h3 className="font-semibold mb-1">Improve Readability</h3>
                      <p className="text-sm text-gray-600">Make content more accessible for students</p>
                    </Card>
                    <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
                      <div className="text-2xl mb-2">🌍</div>
                      <h3 className="font-semibold mb-1">Add Local Context</h3>
                      <p className="text-sm text-gray-600">Include African examples and references</p>
                    </Card>
                    <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
                      <div className="text-2xl mb-2">🎯</div>
                      <h3 className="font-semibold mb-1">Adaptive Difficulty</h3>
                      <p className="text-sm text-gray-600">Adjust content based on student performance</p>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                    <h3 className="font-semibold mb-2">Lesson Plan Template</h3>
                    <p className="text-sm text-gray-600 mb-4">Structured template for creating comprehensive lessons</p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <h3 className="font-semibold mb-2">Quiz Template</h3>
                    <p className="text-sm text-gray-600 mb-4">Multiple choice and short answer quiz format</p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="font-semibold mb-2">Interactive Activity</h3>
                    <p className="text-sm text-gray-600 mb-4">Hands-on learning activity template</p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Video className="h-12 w-12 mx-auto mb-4 text-red-500" />
                    <h3 className="font-semibold mb-2">Video Lesson</h3>
                    <p className="text-sm text-gray-600 mb-4">Template for video-based learning content</p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="font-semibold mb-2">Assessment Rubric</h3>
                    <p className="text-sm text-gray-600 mb-4">Standardized grading criteria template</p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">📋</div>
                    <h3 className="font-semibold mb-2">Worksheet Template</h3>
                    <p className="text-sm text-gray-600 mb-4">Practice exercises and homework format</p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Introduction to Fractions</span>
                          <span>92% completion</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-lg">
                          <div className="h-2 bg-green-500 rounded-lg" style={{ width: "92%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Photosynthesis Process</span>
                          <span>78% completion</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-lg">
                          <div className="h-2 bg-blue-500 rounded-lg" style={{ width: "78%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Grammar Quiz</span>
                          <span>65% completion</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-lg">
                          <div className="h-2 bg-yellow-500 rounded-lg" style={{ width: "65%" }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Student Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">87%</div>
                        <p className="text-sm text-gray-600">Average Engagement Rate</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="font-bold text-green-600">94%</div>
                          <p className="text-gray-600">Interactive Content</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded">
                          <div className="font-bold text-orange-600">73%</div>
                          <p className="text-gray-600">Video Content</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>AI Content Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2">✅ High Performing Content</h4>
                      <p className="text-sm text-green-700">
                        AI-generated interactive math lessons show 23% higher engagement than traditional content.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Optimization Suggestion</h4>
                      <p className="text-sm text-blue-700">
                        Consider adding more visual elements to science lessons to improve comprehension rates.
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-800 mb-2">⚠️ Content Gap Identified</h4>
                      <p className="text-sm text-orange-700">
                        Students are struggling with advanced grammar concepts. Consider creating additional practice
                        materials.
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
