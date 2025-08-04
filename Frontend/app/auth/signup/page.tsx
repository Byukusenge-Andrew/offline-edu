"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Eye, EyeOff, User, GraduationCap, ArrowLeft, AlertCircle, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"student" | "teacher">("student")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    // Profile Info
    grade: "",
    school: "",
    subjects: [] as string[],
    language: "en",
    // Terms
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  })

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.username) {
      setError("Please fill in all required fields")
      return false
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      return false
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (userType === "student" && !formData.grade) {
      setError("Please select your grade level")
      return false
    }
    if (userType === "teacher" && formData.subjects.length === 0) {
      setError("Please select at least one subject you teach")
      return false
    }
    return true
  }

  const handleNext = () => {
    setError("")
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeTerms || !formData.agreePrivacy) {
      setError("Please agree to the Terms of Service and Privacy Policy")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate account creation
    setTimeout(() => {
      localStorage.setItem("username", formData.username)
      localStorage.setItem("userType", userType)
      localStorage.setItem("isAuthenticated", "true")

      if (userType === "student") {
        router.push("/student/dashboard")
      } else {
        router.push("/teacher/dashboard")
      }
      setIsLoading(false)
    }, 2000)
  }

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Art",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join OfflineEdu</h1>
          <p className="text-gray-600 mt-2">Create your account and start learning</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Step {step} of 3 - Let's get you set up</CardDescription>
            <div className="flex space-x-2 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? "bg-blue-600" : "bg-gray-200"}`} />
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
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
                  </Tabs>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      placeholder="johndoe123"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="At least 6 characters"
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">Profile Information</h3>
                    <p className="text-sm text-gray-600">Help us personalize your experience</p>
                  </div>

                  {userType === "student" && (
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level *</Label>
                      <Select
                        value={formData.grade}
                        onValueChange={(value) => setFormData({ ...formData, grade: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">Grade 6</SelectItem>
                          <SelectItem value="7">Grade 7</SelectItem>
                          <SelectItem value="8">Grade 8</SelectItem>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                          <SelectItem value="11">Grade 11</SelectItem>
                          <SelectItem value="12">Grade 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {userType === "teacher" && (
                    <div className="space-y-2">
                      <Label>Subjects You Teach *</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                        {subjects.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <Checkbox
                              id={subject}
                              checked={formData.subjects.includes(subject)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({
                                    ...formData,
                                    subjects: [...formData.subjects, subject],
                                  })
                                } else {
                                  setFormData({
                                    ...formData,
                                    subjects: formData.subjects.filter((s) => s !== subject),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={subject} className="text-sm">
                              {subject}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="school">School/Institution</Label>
                    <Input
                      id="school"
                      placeholder="Enter your school name"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => setFormData({ ...formData, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="sw">Swahili</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold">Almost Done!</h3>
                    <p className="text-sm text-gray-600">Please review and accept our terms</p>
                  </div>

                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">Account Summary</h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Name:</strong> {formData.firstName} {formData.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p>
                        <strong>Username:</strong> {formData.username}
                      </p>
                      <p>
                        <strong>Account Type:</strong> {userType === "student" ? "Student" : "Teacher"}
                      </p>
                      {userType === "student" && formData.grade && (
                        <p>
                          <strong>Grade:</strong> Grade {formData.grade}
                        </p>
                      )}
                      {userType === "teacher" && formData.subjects.length > 0 && (
                        <p>
                          <strong>Subjects:</strong> {formData.subjects.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                      />
                      <Label htmlFor="terms" className="text-sm leading-5">
                        I agree to the{" "}
                        <Link href="/legal/terms" className="text-blue-600 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={formData.agreePrivacy}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreePrivacy: checked as boolean })}
                      />
                      <Label htmlFor="privacy" className="text-sm leading-5">
                        I agree to the{" "}
                        <Link href="/legal/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>{" "}
                        *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="marketing"
                        checked={formData.agreeMarketing}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeMarketing: checked as boolean })}
                      />
                      <Label htmlFor="marketing" className="text-sm leading-5">
                        I would like to receive educational updates and newsletters (optional)
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className={`flex-1 ${
                      userType === "student" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className={`flex-1 ${
                      userType === "student" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                )}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
