"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Brain,
  Users,
  WifiOff,
  Globe,
  Smartphone,
  Award,
  TrendingUp,
  Star,
  Play,
  CheckCircle,
  ArrowRight,
  User,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"student" | "teacher">("student")
  const router = useRouter()

  const handleLogin = () => {
    if (username.trim()) {
      // Redirect to login page instead of direct dashboard access
      router.push("/auth/login")
    }
  }

  const features = [
    {
      icon: WifiOff,
      title: "Offline-First Learning",
      description: "Access all content without internet connection",
      color: "text-blue-600",
    },
    {
      icon: Brain,
      title: "AI-Powered Assistance",
      description: "Personalized learning with intelligent tutoring",
      color: "text-purple-600",
    },
    {
      icon: Users,
      title: "Teacher Supervision",
      description: "AI content reviewed and approved by teachers",
      color: "text-green-600",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Works perfectly on any device",
      color: "text-orange-600",
    },
    {
      icon: Globe,
      title: "Localized Content",
      description: "African context and local examples",
      color: "text-red-600",
    },
    {
      icon: Award,
      title: "Gamified Learning",
      description: "Earn certificates and achievements",
      color: "text-yellow-600",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Students Learning", icon: Users },
    { number: "500+", label: "Teachers", icon: GraduationCap },
    { number: "1,000+", label: "Lessons", icon: BookOpen },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
  ]

  const testimonials = [
    {
      name: "Amara Johnson",
      role: "Grade 8 Student",
      content:
        "OfflineEdu helped me understand math concepts I struggled with. The AI tutor explains things so clearly!",
      rating: 5,
    },
    {
      name: "Mr. Kwame Asante",
      role: "Mathematics Teacher",
      content:
        "This platform revolutionized my teaching. I can create personalized content and track every student's progress.",
      rating: 5,
    },
    {
      name: "Fatima Al-Rashid",
      role: "Grade 9 Student",
      content:
        "I love that I can learn even when there's no internet. The offline feature is a game-changer for rural students.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">🚀 AI-Powered Education Platform</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Learn Anywhere,
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {" "}
                    Anytime
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Revolutionary offline-first educational platform with AI assistance, designed specifically for African
                  students and teachers.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">100% Offline Capable</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">AI-Powered Learning</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Teacher Supervised</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Login Card */}
            <div className="lg:justify-self-end">
              <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Welcome to OfflineEdu</CardTitle>
                  <CardDescription>Sign in to start your learning journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs value={userType} onValueChange={(value) => setUserType(value as "student" | "teacher")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="student" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Student
                      </TabsTrigger>
                      <TabsTrigger value="teacher" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Teacher
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="student" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="student-username">Username</Label>
                        <Input
                          id="student-username"
                          placeholder="Enter your username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-password">Password</Label>
                        <Input
                          id="student-password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={() => router.push("/auth/login")}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Sign In as Student
                      </Button>
                    </TabsContent>

                    <TabsContent value="teacher" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="teacher-username">Username</Label>
                        <Input
                          id="teacher-username"
                          placeholder="Enter your username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teacher-password">Password</Label>
                        <Input
                          id="teacher-password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={() => router.push("/auth/login")}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        Sign In as Teacher
                      </Button>
                    </TabsContent>
                  </Tabs>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">
                        Sign up here
                      </Link>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">Demo credentials: Use any username to explore</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose OfflineEdu?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for African education challenges with cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real feedback from students and teachers across Africa</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Transform Education?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of students and teachers already using OfflineEdu</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Learning Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="text-xl font-bold">OfflineEdu</span>
              </div>
              <p className="text-gray-400">Empowering African education through AI-powered offline learning.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>For Students</li>
                <li>For Teachers</li>
                <li>For Schools</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Community</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OfflineEdu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
