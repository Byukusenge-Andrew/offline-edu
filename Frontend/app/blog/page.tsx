"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Calendar,
  Star,
  ArrowRight,
  Mail,
  Brain,
  Globe,
  Smartphone,
  GraduationCap,
  Award,
  Users,
} from "lucide-react"
import UniversalNavbar from "@/components/universal-navbar"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar?: string
    role: string
  }
  category: string
  tags: string[]
  publishedAt: string
  readTime: string
  featured: boolean
  views: number
  likes: number
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [email, setEmail] = useState("")

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of AI-Powered Education: Transforming Learning in 2024",
      excerpt:
        "Explore how artificial intelligence is revolutionizing education, from personalized learning paths to intelligent tutoring systems that adapt to each student's unique needs.",
      content: "Full article content here...",
      author: {
        name: "Dr. Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "AI Education Researcher",
      },
      category: "AI & Technology",
      tags: ["AI", "machine-learning", "personalized-learning", "future-of-education"],
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      featured: true,
      views: 2847,
      likes: 156,
    },
    {
      id: "2",
      title: "Offline Learning: Bridging the Digital Divide in Rural Education",
      excerpt:
        "Discover how offline-first educational platforms are making quality education accessible to students in remote areas with limited internet connectivity.",
      content: "Full article content here...",
      author: {
        name: "Michael Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Education Technology Specialist",
      },
      category: "Accessibility",
      tags: ["offline-learning", "digital-divide", "rural-education", "accessibility"],
      publishedAt: "2024-01-12",
      readTime: "6 min read",
      featured: true,
      views: 1923,
      likes: 89,
    },
    {
      id: "3",
      title: "Creating Engaging Interactive Content: A Teacher's Guide",
      excerpt:
        "Learn practical strategies for developing interactive lessons that keep students engaged and improve learning outcomes in both online and offline environments.",
      content: "Full article content here...",
      author: {
        name: "Emily Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Curriculum Designer",
      },
      category: "Teaching Strategies",
      tags: ["interactive-content", "engagement", "lesson-design", "teaching-tips"],
      publishedAt: "2024-01-10",
      readTime: "10 min read",
      featured: true,
      views: 3156,
      likes: 234,
    },
    {
      id: "4",
      title: "Mobile Learning Revolution: Education in Your Pocket",
      excerpt:
        "Examine the growing trend of mobile learning and how smartphones and tablets are becoming powerful educational tools for students worldwide.",
      content: "Full article content here...",
      author: {
        name: "Alex Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Mobile Technology Expert",
      },
      category: "Mobile Learning",
      tags: ["mobile-learning", "smartphones", "tablets", "accessibility"],
      publishedAt: "2024-01-08",
      readTime: "7 min read",
      featured: false,
      views: 1456,
      likes: 67,
    },
    {
      id: "5",
      title: "Assessment Innovation: Beyond Traditional Testing",
      excerpt:
        "Explore modern assessment methods that provide better insights into student learning while reducing test anxiety and promoting authentic evaluation.",
      content: "Full article content here...",
      author: {
        name: "Dr. Maria Santos",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Assessment Specialist",
      },
      category: "Assessment",
      tags: ["assessment", "evaluation", "testing", "student-performance"],
      publishedAt: "2024-01-05",
      readTime: "9 min read",
      featured: false,
      views: 2134,
      likes: 98,
    },
    {
      id: "6",
      title: "Building Learning Communities: The Power of Peer Collaboration",
      excerpt:
        "Discover how fostering collaborative learning environments can enhance student engagement and create supportive educational communities.",
      content: "Full article content here...",
      author: {
        name: "Jennifer Adams",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Community Learning Expert",
      },
      category: "Community Learning",
      tags: ["collaboration", "peer-learning", "community", "social-learning"],
      publishedAt: "2024-01-03",
      readTime: "5 min read",
      featured: false,
      views: 987,
      likes: 45,
    },
  ]

  const categories = [
    { value: "all", label: "All Categories", icon: Globe },
    { value: "AI & Technology", label: "AI & Technology", icon: Brain },
    { value: "Teaching Strategies", label: "Teaching Strategies", icon: GraduationCap },
    { value: "Mobile Learning", label: "Mobile Learning", icon: Smartphone },
    { value: "Assessment", label: "Assessment", icon: Award },
    { value: "Accessibility", label: "Accessibility", icon: Users },
    { value: "Community Learning", label: "Community Learning", icon: Users },
  ]

  const featuredPosts = blogPosts.filter((post) => post.featured)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversalNavbar variant="public" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">OfflineEdu Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tips, and stories from the world of education technology. Stay updated with the latest trends in
            AI-powered learning and offline education.
          </p>
        </div>

        {/* Featured Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Featured Article */}
            <div className="lg:col-span-2">
              {featuredPosts[0] && (
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <Brain className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <h3 className="text-xl font-bold">AI & Education</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary">{featuredPosts[0].category}</Badge>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{featuredPosts[0].readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{featuredPosts[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={featuredPosts[0].author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{featuredPosts[0].author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{featuredPosts[0].author.name}</p>
                          <p className="text-xs text-gray-500">{featuredPosts[0].author.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(featuredPosts[0].publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Side Featured Articles */}
            <div className="space-y-6">
              {featuredPosts.slice(1, 3).map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-medium">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center">
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  {post.category === "AI & Technology" && <Brain className="h-12 w-12 mx-auto mb-2" />}
                  {post.category === "Teaching Strategies" && <GraduationCap className="h-12 w-12 mx-auto mb-2" />}
                  {post.category === "Mobile Learning" && <Smartphone className="h-12 w-12 mx-auto mb-2" />}
                  {post.category === "Assessment" && <Award className="h-12 w-12 mx-auto mb-2" />}
                  {post.category === "Accessibility" && <Users className="h-12 w-12 mx-auto mb-2" />}
                  {post.category === "Community Learning" && <Users className="h-12 w-12 mx-auto mb-2" />}
                  <p className="text-sm font-medium">{post.category}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
                      <p className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center mb-12">
          <div className="max-w-2xl mx-auto">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-4">Stay Updated with OfflineEdu</h2>
            <p className="text-blue-100 mb-6">
              Get the latest articles, educational insights, and platform updates delivered directly to your inbox.
            </p>
            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-gray-900"
              />
              <Button type="submit" variant="secondary" className="whitespace-nowrap">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-blue-100 mt-3">No spam, unsubscribe at any time. Read our privacy policy.</p>
          </div>
        </section>

        {/* Categories Overview */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(1).map((category) => {
              const categoryPosts = blogPosts.filter((post) => post.category === category.value)
              return (
                <Card key={category.value} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                      <category.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.label}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {categoryPosts.length} article{categoryPosts.length !== 1 ? "s" : ""}
                    </p>
                    <Button variant="outline" size="sm">
                      View Articles <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
