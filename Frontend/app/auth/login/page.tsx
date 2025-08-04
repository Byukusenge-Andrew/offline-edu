"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Eye, EyeOff, User, GraduationCap, ArrowLeft, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const { login, error: authError, isLoading: authLoading } = useAuth()
  const [userType, setUserType] = useState<"student" | "teacher">("student")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter both email and password")
      return
    }

    try {
      await login(formData.email, formData.password)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to continue your learning journey</p>
      </div>

      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Choose your account type and enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {(error || authError) && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error || authError}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className={`w-full ${
                    userType === "student" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
                  }`}
                  disabled={authLoading}
                >
                  {authLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    `Sign In as ${userType === "student" ? "Student" : "Teacher"}`
                  )}
                </Button>
              </div>
            </Tabs>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
              <p className="text-xs text-gray-500 mt-2">Demo: Use any username to explore the platform</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
