"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UniversalNavbar from "@/components/universal-navbar";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  Search,
  BookOpen,
  Users,
  Settings,
  Brain,
  Battery,
  WifiOff,
  Video,
  FileText,
  MessageSquare,
  Phone,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

export default function HelpPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const faqItems: FAQItem[] = [
    {
      id: "1",
      question: "How do I access lessons when offline?",
      answer:
        "All lessons are automatically downloaded to your device when connected to power and internet. Once downloaded, you can access them anytime without internet connection. Look for the 'Offline Available' badge next to lessons.",
      category: "getting-started",
      tags: ["offline", "lessons", "download"],
    },
    {
      id: "2",
      question: "Why is my battery draining quickly?",
      answer:
        "OfflineEdu is optimized for low power consumption. Enable 'Low Power Mode' in Settings to extend battery life. This reduces screen brightness, limits background processes, and optimizes performance for battery conservation.",
      category: "technical",
      tags: ["battery", "power", "optimization"],
    },
    {
      id: "3",
      question: "How do I sync my progress with other devices?",
      answer:
        "Connect your device to power and internet, then go to Settings > Sync. Your progress will automatically upload when connection is available. Use the same student ID on other devices to access your progress.",
      category: "account",
      tags: ["sync", "progress", "devices"],
    },
    {
      id: "4",
      question: "How does AI grading work for teachers?",
      answer:
        "AI grading uses advanced algorithms to evaluate student responses, providing instant feedback and suggestions. Teachers can review and modify AI suggestions before finalizing grades. The system learns from teacher corrections to improve accuracy.",
      category: "ai-features",
      tags: ["ai", "grading", "teachers", "assessment"],
    },
    {
      id: "5",
      question: "Can I use OfflineEdu without internet?",
      answer:
        "Yes! OfflineEdu is designed for offline-first learning. All core features work without internet. You only need connection for initial setup, content updates, and progress synchronization.",
      category: "getting-started",
      tags: ["offline", "internet", "connectivity"],
    },
    {
      id: "6",
      question: "How do I generate content with AI?",
      answer:
        "Teachers can use the AI Assistant to generate lesson plans, quizzes, and educational content. Go to Teacher Dashboard > AI Assistant, describe what you need, and the AI will create customized content for your students.",
      category: "ai-features",
      tags: ["ai", "content", "generation", "teachers"],
    },
    {
      id: "7",
      question: "What subjects are available?",
      answer:
        "OfflineEdu currently offers Mathematics, Science, and English for grades 6-9. Each subject includes interactive lessons, quizzes, practice exercises, and progress tracking. More subjects are being added regularly.",
      category: "curriculum",
      tags: ["subjects", "curriculum", "grades"],
    },
    {
      id: "8",
      question: "How do I track student progress as a teacher?",
      answer:
        "Use the Teacher Dashboard to monitor all student activities. View individual progress, class analytics, performance trends, and AI-generated insights. You can also generate detailed reports and certificates.",
      category: "teacher-tools",
      tags: ["progress", "tracking", "analytics", "reports"],
    },
  ]

  const categories = [
    { id: "all", name: "All Topics", icon: BookOpen },
    { id: "getting-started", name: "Getting Started", icon: BookOpen },
    { id: "technical", name: "Technical Issues", icon: Settings },
    { id: "account", name: "Account & Sync", icon: Users },
    { id: "ai-features", name: "AI Features", icon: Brain },
    { id: "curriculum", name: "Curriculum", icon: FileText },
    { id: "teacher-tools", name: "Teacher Tools", icon: Users },
  ]

  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversalNavbar/>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold">Help Center</h1>
                  <p className="text-sm text-gray-600">Find answers and get support</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Battery className="h-3 w-3" />
                  85%
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
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for help topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/support">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold mb-2">Contact Support</h3>
                  <p className="text-sm text-gray-600">Get help from our support team</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Video className="h-8 w-8 mx-auto mb-3 text-green-500" />
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm text-gray-600">Watch step-by-step guides</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 mx-auto mb-3 text-purple-500" />
                <h3 className="font-semibold mb-2">User Manual</h3>
                <p className="text-sm text-gray-600">Complete documentation</p>
              </CardContent>
            </Card>
          </div>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Browse by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2 justify-start"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions ({filteredFAQs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-gray-700">{faq.answer}</p>
                          <div className="flex flex-wrap gap-1">
                            {faq.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-semibold mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or browse by category</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Still Need Help */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-blue-900 mb-2">Still need help?</h3>
              <p className="text-blue-700 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/support">
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
