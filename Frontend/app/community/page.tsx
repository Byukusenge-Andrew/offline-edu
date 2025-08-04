"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  MessageSquare,
  Search,
  Star,
  Clock,
  Award,
  BookOpen,
  MessageCircle,
  Eye,
  ThumbsUp,
  Pin,
  User,
  Crown,
  Shield,
  CheckCircle,
} from "lucide-react"
import UniversalNavbar from "@/components/universal-navbar"

interface CommunityPost {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar?: string
    role: "student" | "teacher" | "admin" | "moderator"
    reputation: number
    badges: string[]
  }
  category: string
  tags: string[]
  likes: number
  replies: number
  views: number
  createdAt: string
  pinned: boolean
  solved: boolean
}

interface StudyGroup {
  id: string
  name: string
  description: string
  subject: string
  members: number
  maxMembers: number
  level: "beginner" | "intermediate" | "advanced"
  meetingTime: string
  isPrivate: boolean
  moderator: {
    name: string
    avatar?: string
  }
}

interface TopContributor {
  id: string
  name: string
  avatar?: string
  role: "student" | "teacher" | "admin"
  reputation: number
  posts: number
  helpfulAnswers: number
  badges: string[]
}

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const communityPosts: CommunityPost[] = [
    {
      id: "1",
      title: "How to effectively use AI tutoring for mathematics?",
      content:
        "I'm struggling with algebra and wondering how to make the most of the AI tutoring feature. Any tips from experienced users?",
      author: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "student",
        reputation: 245,
        badges: ["Active Learner", "Math Enthusiast"],
      },
      category: "AI Features",
      tags: ["AI", "mathematics", "tutoring", "algebra"],
      likes: 23,
      replies: 8,
      views: 156,
      createdAt: "2024-01-15T10:30:00Z",
      pinned: false,
      solved: true,
    },
    {
      id: "2",
      title: "Best practices for offline content synchronization",
      content:
        "As a teacher in a rural area with limited internet, I need advice on managing offline content sync effectively. What strategies work best?",
      author: {
        name: "Michael Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "teacher",
        reputation: 892,
        badges: ["Expert Educator", "Community Helper", "Offline Pioneer"],
      },
      category: "Offline Learning",
      tags: ["offline", "synchronization", "rural-education", "best-practices"],
      likes: 45,
      replies: 15,
      views: 234,
      createdAt: "2024-01-14T14:20:00Z",
      pinned: true,
      solved: false,
    },
    {
      id: "3",
      title: "Creating engaging quiz questions - tips and tricks",
      content:
        "I've been creating quizzes for my students but want to make them more engaging. What techniques do you use to create compelling questions?",
      author: {
        name: "Dr. Emily Watson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "teacher",
        reputation: 1456,
        badges: ["Quiz Master", "Content Creator", "Top Contributor"],
      },
      category: "Content Creation",
      tags: ["quizzes", "engagement", "assessment", "teaching-tips"],
      likes: 67,
      replies: 22,
      views: 389,
      createdAt: "2024-01-13T09:15:00Z",
      pinned: false,
      solved: false,
    },
    {
      id: "4",
      title: "Mobile app vs web version - which is better for students?",
      content:
        "I'm curious about the differences between using OfflineEdu on mobile vs web. What are the pros and cons of each platform?",
      author: {
        name: "Alex Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "student",
        reputation: 156,
        badges: ["Mobile User"],
      },
      category: "Platform Discussion",
      tags: ["mobile", "web", "comparison", "user-experience"],
      likes: 12,
      replies: 6,
      views: 98,
      createdAt: "2024-01-12T16:45:00Z",
      pinned: false,
      solved: false,
    },
  ]

  const studyGroups: StudyGroup[] = [
    {
      id: "1",
      name: "Advanced Mathematics Study Circle",
      description: "Weekly sessions focusing on calculus, linear algebra, and advanced problem-solving techniques.",
      subject: "Mathematics",
      members: 24,
      maxMembers: 30,
      level: "advanced",
      meetingTime: "Saturdays 2:00 PM UTC",
      isPrivate: false,
      moderator: {
        name: "Prof. David Kim",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "2",
      name: "English Literature Book Club",
      description:
        "Monthly discussions on classic and contemporary literature with guided analysis and creative writing exercises.",
      subject: "English",
      members: 18,
      maxMembers: 25,
      level: "intermediate",
      meetingTime: "First Sunday of each month, 3:00 PM UTC",
      isPrivate: false,
      moderator: {
        name: "Ms. Jennifer Adams",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "3",
      name: "Science Experiment Lab",
      description: "Hands-on virtual experiments and discussions about physics, chemistry, and biology concepts.",
      subject: "Science",
      members: 31,
      maxMembers: 35,
      level: "beginner",
      meetingTime: "Wednesdays 4:00 PM UTC",
      isPrivate: false,
      moderator: {
        name: "Dr. Maria Santos",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "4",
      name: "AI & Technology Innovators",
      description:
        "Exploring the latest in AI, machine learning, and educational technology. Perfect for tech-savvy learners.",
      subject: "Technology",
      members: 42,
      maxMembers: 50,
      level: "advanced",
      meetingTime: "Fridays 6:00 PM UTC",
      isPrivate: false,
      moderator: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
  ]

  const topContributors: TopContributor[] = [
    {
      id: "1",
      name: "Dr. Emily Watson",
      avatar: "/placeholder.svg?height=48&width=48",
      role: "teacher",
      reputation: 1456,
      posts: 89,
      helpfulAnswers: 67,
      badges: ["Quiz Master", "Content Creator", "Top Contributor"],
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=48&width=48",
      role: "teacher",
      reputation: 892,
      posts: 45,
      helpfulAnswers: 38,
      badges: ["Expert Educator", "Community Helper", "Offline Pioneer"],
    },
    {
      id: "3",
      name: "Prof. David Kim",
      avatar: "/placeholder.svg?height=48&width=48",
      role: "teacher",
      reputation: 734,
      posts: 32,
      helpfulAnswers: 29,
      badges: ["Math Expert", "Study Group Leader"],
    },
    {
      id: "4",
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=48&width=48",
      role: "student",
      reputation: 245,
      posts: 18,
      helpfulAnswers: 12,
      badges: ["Active Learner", "Math Enthusiast"],
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "AI Features", label: "AI Features" },
    { value: "Offline Learning", label: "Offline Learning" },
    { value: "Content Creation", label: "Content Creation" },
    { value: "Platform Discussion", label: "Platform Discussion" },
    { value: "Study Tips", label: "Study Tips" },
    { value: "Technical Support", label: "Technical Support" },
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "moderator":
        return <Shield className="h-4 w-4 text-blue-500" />
      case "teacher":
        return <BookOpen className="h-4 w-4 text-green-500" />
      case "student":
        return <User className="h-4 w-4 text-gray-500" />
      default:
        return <User className="h-4 w-4 text-gray-500" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
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

  const filteredPosts = communityPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversalNavbar variant="public" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with educators and learners worldwide. Share knowledge, ask questions, and grow together in our
            vibrant learning community.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">12,847</h3>
              <p className="text-gray-600">Active Members</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-3">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">3,456</h3>
              <p className="text-gray-600">Discussions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-3">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">89</h3>
              <p className="text-gray-600">Study Groups</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto mb-3">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
              <p className="text-gray-600">Solutions Shared</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="discussions" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Discussions</span>
            </TabsTrigger>
            <TabsTrigger value="study-groups" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Study Groups</span>
            </TabsTrigger>
            <TabsTrigger value="contributors" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Top Contributors</span>
            </TabsTrigger>
          </TabsList>

          {/* Discussions Tab */}
          <TabsContent value="discussions">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search discussions..."
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
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="replies">Most Replies</SelectItem>
                    <SelectItem value="views">Most Views</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Discussion Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          {post.pinned && <Pin className="h-4 w-4 text-blue-500" />}
                          {post.solved && <CheckCircle className="h-4 w-4 text-green-500" />}
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {post.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{post.category}</Badge>
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">{post.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{post.author.name}</span>
                              {getRoleIcon(post.author.role)}
                              <span className="text-xs">({post.author.reputation} rep)</span>
                            </div>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {post.likes}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {post.replies}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {post.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Create New Discussion */}
            <div className="mt-8 text-center">
              <Button size="lg">
                <MessageSquare className="h-4 w-4 mr-2" />
                Start New Discussion
              </Button>
            </div>
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="study-groups">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription className="mt-2">{group.description}</CardDescription>
                      </div>
                      <Badge className={`${getLevelColor(group.level)} ml-2`}>{group.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Subject:</span>
                        <Badge variant="outline">{group.subject}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Members:</span>
                        <span className="font-medium">
                          {group.members}/{group.maxMembers}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Meeting Time:</span>
                        <span className="font-medium">{group.meetingTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-600">Moderator:</span>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={group.moderator.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{group.moderator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{group.moderator.name}</span>
                      </div>
                      <div className="pt-3">
                        <Button className="w-full" disabled={group.members >= group.maxMembers}>
                          {group.members >= group.maxMembers ? "Group Full" : "Join Group"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button size="lg" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Create Study Group
              </Button>
            </div>
          </TabsContent>

          {/* Top Contributors Tab */}
          <TabsContent value="contributors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topContributors.map((contributor, index) => (
                <Card key={contributor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <Avatar className="h-16 w-16 mx-auto">
                        <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-lg">{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {index < 3 && (
                        <div className="absolute -top-2 -right-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{contributor.name}</h3>
                    <div className="flex items-center justify-center space-x-1 mb-3">
                      {getRoleIcon(contributor.role)}
                      <span className="text-sm text-gray-600 capitalize">{contributor.role}</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Reputation:</span>
                        <span className="font-medium">{contributor.reputation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Posts:</span>
                        <span className="font-medium">{contributor.posts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Helpful Answers:</span>
                        <span className="font-medium">{contributor.helpfulAnswers}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {contributor.badges.slice(0, 2).map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                      {contributor.badges.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{contributor.badges.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Community Guidelines */}
        <section className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Community Guidelines
              </CardTitle>
              <CardDescription>
                Help us maintain a positive and productive learning environment for everyone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">✓ Do</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Be respectful and constructive in your interactions</li>
                    <li>• Search before posting to avoid duplicates</li>
                    <li>• Provide clear, detailed questions and answers</li>
                    <li>• Share your knowledge and help others learn</li>
                    <li>• Use appropriate tags and categories</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-700">✗ Don't</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Post spam, advertisements, or off-topic content</li>
                    <li>• Share personal information or contact details</li>
                    <li>• Use offensive language or engage in harassment</li>
                    <li>• Post homework answers without explanation</li>
                    <li>• Create multiple accounts or fake profiles</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
