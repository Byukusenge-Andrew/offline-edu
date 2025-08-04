"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BookOpen,
  Search,
  ExternalLink,
  Clock,
  Users,
  GraduationCap,
  Smartphone,
  Brain,
  Download,
  Code,
  HelpCircle,
  ArrowRight,
  PlayCircle,
  FileText,
  Video,
  Lightbulb,
} from "lucide-react"
import UniversalNavbar from "@/components/universal-navbar"

interface DocSection {
  id: string
  title: string
  description: string
  icon: any
  articles: DocArticle[]
}

interface DocArticle {
  id: string
  title: string
  description: string
  readTime: string
  difficulty: "beginner" | "intermediate" | "advanced"
  type: "guide" | "tutorial" | "reference" | "video"
  popular: boolean
}

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("getting-started")

  const docSections: DocSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Everything you need to know to begin using OfflineEdu",
      icon: PlayCircle,
      articles: [
        {
          id: "quick-start",
          title: "Quick Start Guide",
          description: "Get up and running with OfflineEdu in under 10 minutes",
          readTime: "5 min",
          difficulty: "beginner",
          type: "guide",
          popular: true,
        },
        {
          id: "installation",
          title: "Installation & Setup",
          description: "Complete installation guide for all platforms",
          readTime: "15 min",
          difficulty: "beginner",
          type: "tutorial",
          popular: true,
        },
        {
          id: "first-lesson",
          title: "Creating Your First Lesson",
          description: "Step-by-step tutorial for creating engaging lessons",
          readTime: "20 min",
          difficulty: "beginner",
          type: "tutorial",
          popular: false,
        },
        {
          id: "user-roles",
          title: "Understanding User Roles",
          description: "Learn about student, teacher, and admin permissions",
          readTime: "8 min",
          difficulty: "beginner",
          type: "guide",
          popular: false,
        },
      ],
    },
    {
      id: "students",
      title: "For Students",
      description: "Guides and tutorials for student users",
      icon: GraduationCap,
      articles: [
        {
          id: "student-dashboard",
          title: "Navigating Your Dashboard",
          description: "Complete guide to the student dashboard interface",
          readTime: "10 min",
          difficulty: "beginner",
          type: "guide",
          popular: true,
        },
        {
          id: "taking-quizzes",
          title: "Taking Quizzes and Assessments",
          description: "How to complete quizzes and view your results",
          readTime: "12 min",
          difficulty: "beginner",
          type: "tutorial",
          popular: true,
        },
        {
          id: "ai-study-assistant",
          title: "Using the AI Study Assistant",
          description: "Maximize your learning with AI-powered assistance",
          readTime: "18 min",
          difficulty: "intermediate",
          type: "guide",
          popular: true,
        },
        {
          id: "progress-tracking",
          title: "Tracking Your Progress",
          description: "Understanding your learning analytics and reports",
          readTime: "15 min",
          difficulty: "beginner",
          type: "guide",
          popular: false,
        },
        {
          id: "offline-learning",
          title: "Learning Offline",
          description: "How to download and access content without internet",
          readTime: "10 min",
          difficulty: "beginner",
          type: "tutorial",
          popular: true,
        },
      ],
    },
    {
      id: "teachers",
      title: "For Teachers",
      description: "Comprehensive guides for educators",
      icon: Users,
      articles: [
        {
          id: "teacher-dashboard",
          title: "Teacher Dashboard Overview",
          description: "Navigate and utilize your teaching dashboard effectively",
          readTime: "15 min",
          difficulty: "beginner",
          type: "guide",
          popular: true,
        },
        {
          id: "content-creation",
          title: "Creating Educational Content",
          description: "Best practices for creating engaging lessons and materials",
          readTime: "25 min",
          difficulty: "intermediate",
          type: "tutorial",
          popular: true,
        },
        {
          id: "student-management",
          title: "Managing Students",
          description: "Add, organize, and monitor student progress",
          readTime: "20 min",
          difficulty: "beginner",
          type: "guide",
          popular: true,
        },
        {
          id: "grading-system",
          title: "Grading and Assessment",
          description: "Complete guide to grading tools and rubrics",
          readTime: "18 min",
          difficulty: "intermediate",
          type: "tutorial",
          popular: false,
        },
        {
          id: "analytics-insights",
          title: "Analytics and Insights",
          description: "Understanding student performance data and trends",
          readTime: "22 min",
          difficulty: "intermediate",
          type: "guide",
          popular: true,
        },
      ],
    },
    {
      id: "offline-features",
      title: "Offline Features",
      description: "Learn about our offline-first capabilities",
      icon: Download,
      articles: [
        {
          id: "offline-overview",
          title: "Offline Mode Overview",
          description: "Understanding how offline functionality works",
          readTime: "12 min",
          difficulty: "beginner",
          type: "guide",
          popular: true,
        },
        {
          id: "content-sync",
          title: "Content Synchronization",
          description: "How content syncs between online and offline modes",
          readTime: "15 min",
          difficulty: "intermediate",
          type: "tutorial",
          popular: false,
        },
        {
          id: "offline-assessment",
          title: "Offline Assessments",
          description: "Taking and submitting assessments without internet",
          readTime: "10 min",
          difficulty: "beginner",
          type: "guide",
          popular: true,
        },
        {
          id: "data-management",
          title: "Offline Data Management",
          description: "How your data is stored and managed offline",
          readTime: "18 min",
          difficulty: "advanced",
          type: "reference",
          popular: false,
        },
      ],
    },
    {
      id: "ai-features",
      title: "AI Features",
      description: "Harness the power of artificial intelligence",
      icon: Brain,
      articles: [
        {
          id: "ai-overview",
          title: "AI Features Overview",
          description: "Introduction to AI-powered learning tools",
          readTime: "10 min",
          difficulty: "beginner",
          type: "guide",
          popular: true,
        },
        {
          id: "personalized-learning",
          title: "Personalized Learning Paths",
          description: "How AI creates customized learning experiences",
          readTime: "20 min",
          difficulty: "intermediate",
          type: "guide",
          popular: true,
        },
        {
          id: "ai-tutoring",
          title: "AI Tutoring Assistant",
          description: "Getting help from your AI tutor",
          readTime: "15 min",
          difficulty: "beginner",
          type: "tutorial",
          popular: true,
        },
        {
          id: "content-generation",
          title: "AI Content Generation",
          description: "Using AI to create quizzes and learning materials",
          readTime: "25 min",
          difficulty: "advanced",
          type: "tutorial",
          popular: false,
        },
        {
          id: "performance-analysis",
          title: "AI Performance Analysis",
          description: "Understanding AI-driven learning analytics",
          readTime: "18 min",
          difficulty: "intermediate",
          type: "guide",
          popular: false,
        },
      ],
    },
    {
      id: "mobile",
      title: "Mobile App",
      description: "Using OfflineEdu on mobile devices",
      icon: Smartphone,
      articles: [
        {
          id: "mobile-setup",
          title: "Mobile App Setup",
          description: "Download and configure the mobile app",
          readTime: "8 min",
          difficulty: "beginner",
          type: "tutorial",
          popular: true,
        },
        {
          id: "mobile-features",
          title: "Mobile-Specific Features",
          description: "Features unique to the mobile experience",
          readTime: "12 min",
          difficulty: "beginner",
          type: "guide",
          popular: false,
        },
        {
          id: "mobile-offline",
          title: "Mobile Offline Learning",
          description: "Optimizing offline learning on mobile devices",
          readTime: "15 min",
          difficulty: "intermediate",
          type: "tutorial",
          popular: true,
        },
        {
          id: "mobile-sync",
          title: "Mobile Data Synchronization",
          description: "Keeping your mobile data in sync",
          readTime: "10 min",
          difficulty: "beginner",
          type: "guide",
          popular: false,
        },
      ],
    },
  ]

  const popularArticles = docSections
    .flatMap((section) => section.articles)
    .filter((article) => article.popular)
    .slice(0, 6)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-4 w-4" />
      case "tutorial":
        return <PlayCircle className="h-4 w-4" />
      case "reference":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredSections = docSections
    .map((section) => ({
      ...section,
      articles: section.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((section) => section.articles.length > 0 || searchQuery === "")

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversalNavbar variant="public" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guides, tutorials, and references to help you make the most of OfflineEdu's powerful features.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        {/* Popular Articles */}
        {searchQuery === "" && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
              Popular Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(article.type)}
                        <Badge variant="secondary" className="text-xs">
                          {article.type}
                        </Badge>
                      </div>
                      <Badge className={`text-xs ${getDifficultyColor(article.difficulty)}`}>
                        {article.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                      <Button variant="ghost" size="sm">
                        Read <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Documentation Sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8">
            {docSections.map((section) => (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center space-x-2">
                <section.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{section.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {docSections.map((section) => (
            <TabsContent key={section.id} value={section.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <section.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                      <CardDescription className="text-lg">{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.articles
                      .filter(
                        (article) =>
                          searchQuery === "" ||
                          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.description.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((article) => (
                        <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {getTypeIcon(article.type)}
                                <Badge variant="outline" className="text-xs">
                                  {article.type}
                                </Badge>
                                {article.popular && (
                                  <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <Badge className={`text-xs ${getDifficultyColor(article.difficulty)}`}>
                                {article.difficulty}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{article.title}</CardTitle>
                            <CardDescription>{article.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-1" />
                                {article.readTime}
                              </div>
                              <Button variant="ghost" size="sm">
                                Read <ArrowRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Links */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">API Reference</h3>
                <p className="text-sm text-gray-600 mb-4">Complete API documentation for developers</p>
                <Button variant="outline" size="sm">
                  View API Docs <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <Download className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Downloads</h3>
                <p className="text-sm text-gray-600 mb-4">Get the latest apps and resources</p>
                <Button variant="outline" size="sm">
                  Download Center <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-gray-600 mb-4">Join our community of educators</p>
                <Button variant="outline" size="sm">
                  Join Community <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto mb-4">
                  <HelpCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-sm text-gray-600 mb-4">Get help when you need it</p>
                <Button variant="outline" size="sm">
                  Contact Support <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I get started with OfflineEdu?</AccordionTrigger>
                  <AccordionContent>
                    Start with our Quick Start Guide which will walk you through account setup, basic navigation, and
                    creating your first lesson or taking your first quiz. The entire process takes less than 10 minutes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I use OfflineEdu without an internet connection?</AccordionTrigger>
                  <AccordionContent>
                    Yes! OfflineEdu is designed with offline-first functionality. You can download content, take
                    assessments, and continue learning even without an internet connection. Your progress will sync
                    automatically when you reconnect.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How does the AI tutoring feature work?</AccordionTrigger>
                  <AccordionContent>
                    Our AI tutor provides personalized assistance based on your learning patterns and progress. It can
                    answer questions, provide explanations, suggest study materials, and create custom practice problems
                    tailored to your needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
                  <AccordionContent>
                    Yes, OfflineEdu is available on iOS and Android devices. The mobile app includes all core features
                    and is optimized for learning on the go, with enhanced offline capabilities for mobile users.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I create content as a teacher?</AccordionTrigger>
                  <AccordionContent>
                    Teachers can create lessons, quizzes, and assignments using our intuitive content creation tools.
                    Check out our "Creating Educational Content" guide for best practices and step-by-step instructions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
