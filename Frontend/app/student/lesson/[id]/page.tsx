"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Play,
  RotateCcw,
  BookOpen,
  Brain,
  Volume2,
  VolumeX,
  Maximize,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = Number.parseInt(params.id as string)

  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)

  const lessonData = {
    1: {
      title: "Introduction to Algebra",
      subject: "Mathematics",
      duration: "45 min",
      difficulty: "Beginner",
      description: "Learn the fundamental concepts of algebra including variables, expressions, and basic operations.",
      steps: [
        {
          title: "What is Algebra?",
          content:
            "Algebra is a branch of mathematics that uses symbols and letters to represent numbers and quantities in formulas and equations.",
          type: "text",
          duration: "5 min",
        },
        {
          title: "Variables and Constants",
          content:
            "A variable is a symbol (usually a letter) that represents an unknown number. A constant is a fixed value that doesn't change.",
          type: "text",
          duration: "8 min",
          example: "In the expression 3x + 5, 'x' is a variable and '3' and '5' are constants.",
        },
        {
          title: "Algebraic Expressions",
          content:
            "An algebraic expression is a mathematical phrase that contains variables, constants, and operations.",
          type: "interactive",
          duration: "12 min",
          examples: ["2x + 3", "5y - 7", "3a + 2b - 1"],
        },
        {
          title: "Practice Problems",
          content: "Let's practice identifying variables and constants in algebraic expressions.",
          type: "practice",
          duration: "15 min",
          problems: [
            { expression: "4x + 7", variables: ["x"], constants: ["4", "7"] },
            { expression: "2y - 3z + 1", variables: ["y", "z"], constants: ["2", "3", "1"] },
          ],
        },
        {
          title: "Summary",
          content:
            "Great job! You've learned about variables, constants, and algebraic expressions. These are the building blocks of algebra.",
          type: "summary",
          duration: "5 min",
        },
      ],
    },
    2: {
      title: "Linear Equations",
      subject: "Mathematics",
      duration: "60 min",
      difficulty: "Beginner",
      description: "Master the art of solving linear equations with one variable.",
      steps: [
        {
          title: "What are Linear Equations?",
          content: "A linear equation is an equation where the highest power of the variable is 1.",
          type: "text",
          duration: "8 min",
        },
        {
          title: "Solving Basic Equations",
          content: "Learn the fundamental steps to solve linear equations using inverse operations.",
          type: "interactive",
          duration: "20 min",
        },
        {
          title: "Word Problems",
          content: "Apply your knowledge to solve real-world problems using linear equations.",
          type: "practice",
          duration: "25 min",
        },
        {
          title: "Review and Assessment",
          content: "Test your understanding with a comprehensive review.",
          type: "assessment",
          duration: "7 min",
        },
      ],
    },
  }

  const lesson = lessonData[lessonId as keyof typeof lessonData]

  useEffect(() => {
    if (!lesson) {
      router.push("/student/dashboard")
    }
  }, [lesson, router])

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lesson Not Found</h2>
          <p className="text-gray-600 mb-4">The requested lesson could not be found.</p>
          <Button asChild>
            <Link href="/student/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  const currentStepData = lesson.steps[currentStep]
  const progress = ((currentStep + 1) / lesson.steps.length) * 100

  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setLessonCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // Mark lesson as completed and redirect
    router.push("/student/dashboard")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/student/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{lesson.subject}</span>
              <Badge variant="secondary">{lesson.difficulty}</Badge>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {lesson.duration}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Lesson Progress</span>
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {lesson.steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </CardContent>
      </Card>

      {/* Lesson Content */}
      {!lessonCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {currentStepData.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4" />
                      {currentStepData.duration}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{currentStepData.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed">{currentStepData.content}</p>

                  {currentStepData.example && (
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-900 mb-2">Example:</h4>
                      <p className="text-blue-800">{currentStepData.example}</p>
                    </div>
                  )}

                  {currentStepData.examples && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-3">Examples:</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {currentStepData.examples.map((example, index) => (
                          <div key={index} className="bg-white p-3 rounded border text-center font-mono">
                            {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStepData.problems && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Practice Problems:</h4>
                      {currentStepData.problems.map((problem, index) => (
                        <div key={index} className="bg-yellow-50 p-4 rounded-lg">
                          <p className="font-mono text-lg mb-2">{problem.expression}</p>
                          <div className="text-sm text-gray-600">
                            <p>Variables: {problem.variables.join(", ")}</p>
                            <p>Constants: {problem.constants.join(", ")}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interactive Elements */}
                {currentStepData.type === "interactive" && (
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Interactive Exercise</h4>
                    <p className="text-gray-600 mb-4">Try solving this problem step by step:</p>
                    <div className="bg-white p-4 rounded border font-mono text-lg text-center">2x + 5 = 13</div>
                    <Button className="mt-4">
                      <Play className="h-4 w-4 mr-2" />
                      Start Interactive Exercise
                    </Button>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button onClick={handleNext}>
                    {currentStep === lesson.steps.length - 1 ? "Complete Lesson" : "Next"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Lesson Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lesson Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lesson.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                      index === currentStep
                        ? "bg-blue-100 text-blue-900"
                        : index < currentStep
                          ? "bg-green-100 text-green-900"
                          : "bg-gray-50 text-gray-600"
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className="flex-shrink-0">
                      {index < currentStep ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                            index === currentStep ? "border-blue-600 text-blue-600" : "border-gray-300"
                          }`}
                        >
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{step.title}</p>
                      <p className="text-xs opacity-75">{step.duration}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Need help understanding this concept? Ask our AI tutor!</p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/student/ai-study">Get AI Help</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Completion Screen */
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Lesson Completed!</h2>
            <p className="text-gray-600 mb-6">Congratulations! You've successfully completed "{lesson.title}".</p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleComplete}>Continue to Dashboard</Button>
              <Button variant="outline" onClick={() => setCurrentStep(0)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Review Lesson
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
