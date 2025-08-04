"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Download,
  Search,
  Filter,
  Star,
  Clock,
  FileText,
  Video,
  Headphones,
  ImageIcon,
  Code,
  Globe,
  Smartphone,
  GraduationCap,
  Award,
} from "lucide-react"
import UniversalNavbar from "@/components/universal-navbar"

interface Resource {
  id: string
  title: string
  description: string
  type: "guide" | "template" | "video" | "audio" | "image" | "code" | "dataset"
  category: "teaching" | "learning" | "technology" | "curriculum" | "assessment" | "offline"
  level: "beginner" | "intermediate" | "advanced"
  downloads: number
  rating: number
  duration?: string
  size?: string
  format: string
  featured: boolean
  tags: string[]
  author: string
  publishedAt: string
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("popular")

  const resources: Resource[] = [
    {
      id: "1",
      title: "Complete Offline Teaching Guide",
      description:
        "Comprehensive guide for educators transitioning to offline-first teaching methodologies with practical examples and best practices.",
      type: "guide",
      category: "teaching",
      level: "beginner",
      downloads: 15420,
      rating: 4.8,
      duration: "45 min read",
      size: "2.3 MB",
      format: "PDF",
      featured: true,
      tags: ["offline", "teaching", "methodology", "best-practices"],
      author: "Dr. Sarah Johnson",
      publishedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Interactive Math Lesson Templates",
      description:
        "Ready-to-use lesson templates for mathematics covering grades 1-12 with interactive elements and assessment rubrics.",
      type: "template",
      category: "curriculum",
      level: "intermediate",
      downloads: 8930,
      rating: 4.6,
      size: "15.7 MB",
      format: "ZIP",
      featured: true,
      tags: ["mathematics", "templates", "interactive", "K-12"],
      author: "Math Education Team",
      publishedAt: "2024-01-10",
    },
    {
      id: "3",
      title: "AI-Powered Learning Analytics",
      description:
        "Video series explaining how to leverage AI for student performance analysis and personalized learning path creation.",
      type: "video",
      category: "technology",
      level: "advanced",
      downloads: 5670,
      rating: 4.9,
      duration: "2h 30min",
      size: "1.2 GB",
      format: "MP4",
      featured: true,
      tags: ["AI", "analytics", "personalization", "data-science"],
      author: "Tech Innovation Lab",
      publishedAt: "2024-01-08",
    },
    {
      id: "4",
      title: "Student Assessment Rubrics",
      description:
        "Comprehensive collection of assessment rubrics for various subjects and learning objectives with scoring guidelines.",
      type: "template",
      category: "assessment",
      level: "beginner",
      downloads: 12340,
      rating: 4.7,
      size: "5.2 MB",
      format: "DOCX",
      featured: false,
      tags: ["assessment", "rubrics", "evaluation", "standards"],
      author: "Assessment Specialists",
      publishedAt: "2024-01-05",
    },
    {
      id: "5",
      title: "Offline Content Synchronization API",
      description:
        "Complete API documentation and code samples for implementing offline content sync in educational applications.",
      type: "code",
      category: "technology",
      level: "advanced",
      downloads: 3210,
      rating: 4.5,
      size: "890 KB",
      format: "ZIP",
      featured: false,
      tags: ["API", "offline", "synchronization", "development"],
      author: "Development Team",
      publishedAt: "2024-01-03",
    },
    {
      id: "6",
      title: "Pronunciation Guide Audio Pack",
      description:
        "High-quality audio recordings for language learning with native speaker pronunciations in 12 languages.",
      type: "audio",
      category: "learning",
      level: "beginner",
      downloads: 7890,
      rating: 4.8,
      duration: "3h 45min",
      size: "450 MB",
      format: "MP3",
      featured: false,
      tags: ["language", "pronunciation", "audio", "multilingual"],
      author: "Language Learning Center",
      publishedAt: "2024-01-01",
    },
  ]

  const categories = [
    { value: "all", label: "All Categories", icon: Globe },
    { value: "teaching", label: "Teaching", icon: GraduationCap },
    { value: "learning", label: "Learning", icon: BookOpen },
    { value: "technology", label: "Technology", icon: Smartphone },
    { value: "curriculum", label: "Curriculum", icon: FileText },
    { value: "assessment", label: "Assessment", icon: Award },
    { value: "offline", label: "Offline", icon: Download },
  ]

  const resourceTypes = [
    { value: "all", label: "All Types", icon: FileText },
    { value: "guide", label: "Guides", icon: BookOpen },
    { value: "template", label: "Templates", icon: FileText },
    { value: "video", label: "Videos", icon: Video },
    { value: "audio", label: "Audio", icon: Headphones },
    { value: "image", label: "Images", icon: ImageIcon },
    { value: "code", label: "Code", icon: Code },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-4 w-4" />
      case "template":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "code":
        return <Code className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
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

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesType = selectedType === "all" || resource.type === selectedType
    const matchesLevel = selectedLevel === "all" || resource.level === selectedLevel

    return matchesSearch && matchesCategory && matchesType && matchesLevel
  })

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const featuredResources = resources.filter((r) => r.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversalNavbar variant="public" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resource Library</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover comprehensive educational resources, templates, guides, and tools to enhance your teaching and
            learning experience.
          </p>
        </div>

        {/* Featured Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(resource.type)}
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <Badge className={`text-xs ${getLevelColor(resource.level)}`}>{resource.level}</Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {resource.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {resource.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resource.format}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search resources..."
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
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center">
                      <type.icon className="h-4 w-4 mr-2" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{filteredResources.length} Resources Found</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            <span>
              Filtered by: {selectedCategory !== "all" && selectedCategory}, {selectedType !== "all" && selectedType}
            </span>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(resource.type)}
                    <Badge variant="secondary" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <Badge className={`text-xs ${getLevelColor(resource.level)}`}>{resource.level}</Badge>
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {resource.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {resource.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resource.size}</span>
                  </div>

                  {resource.duration && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {resource.duration}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{resource.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    By {resource.author} • {new Date(resource.publishedAt).toLocaleDateString()}
                  </div>

                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download {resource.format}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {sortedResources.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Resources
            </Button>
          </div>
        )}

        {/* No Results */}
        {sortedResources.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedType("all")
                setSelectedLevel("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
