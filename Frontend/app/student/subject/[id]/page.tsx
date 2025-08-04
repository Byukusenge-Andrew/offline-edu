"use client"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Star,
  Target,
  Brain,
  Award,
  TrendingUp,
  ArrowLeft,
  Lock, Trophy,
} from "lucide-react"
import Link from "next/link"
import {TrophyIcon} from "lucide-react";// Declare Trophy variable

interface Lesson {
  id: number
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  completed: boolean
  locked: boolean
  score?: number
  type: "video" | "interactive" | "reading" | "quiz"
}

interface SubjectData {
  id: string
  name: string
  description: string
  icon: string
  color: string
  totalLessons: number
  completedLessons: number
  averageScore: number
  estimatedTime: string
  lessons: Lesson[]
  achievements: Array<{
    id: string
    title: string
    description: string
    earned: boolean
    icon: any
  }>
}

export default function SubjectPage() {
  const params = useParams()
  const subjectId = params.id as string

  const subjectData: Record<string, SubjectData> = {
    math: {
      id: "math",
      name: "Mathematics",
      description: "Master mathematical concepts from basic arithmetic to advanced algebra and geometry.",
      icon: "🔢",
      color: "blue",
      totalLessons: 24,
      completedLessons: 18,
      averageScore: 87,
      estimatedTime: "6 weeks",
      lessons: [
        {
          id: 1,
          title: "Introduction to Algebra",
          description:
            "Learn the fundamental concepts of algebra including variables, expressions, and basic operations.",
          duration: "45 min",
          difficulty: "Beginner",
          completed: true,
          locked: false,
          score: 92,
          type: "interactive",
        },
        {
          id: 2,
          title: "Linear Equations",
          description: "Master the art of solving linear equations with one variable.",
          duration: "60 min",
          difficulty: "Beginner",
          completed: true,
          locked: false,
          score: 88,
          type: "video",
        },
        {
          id: 3,
          title: "Quadratic Equations",
          description: "Explore quadratic equations and learn multiple solving methods.",
          duration: "75 min",
          difficulty: "Intermediate",
          completed: false,
          locked: false,
          type: "interactive",
        },
        {
          id: 4,
          title: "Systems of Equations",
          description: "Solve systems of linear equations using various methods.",
          duration: "90 min",
          difficulty: "Intermediate",
          completed: false,
          locked: false,
          type: "reading",
        },
        {
          id: 5,
          title: "Polynomial Functions",
          description: "Understanding polynomial functions and their properties.",
          duration: "80 min",
          difficulty: "Advanced",
          completed: false,
          locked: true,
          type: "video",
        },
        {
          id: 6,
          title: "Trigonometry Basics",
          description: "Introduction to trigonometric functions and their applications.",
          duration: "70 min",
          difficulty: "Advanced",
          completed: false,
          locked: true,
          type: "interactive",
        },
      ],
      achievements: [
        {
          id: "1",
          title: "Algebra Master",
          description: "Complete all algebra lessons",
          earned: true,
          icon: Trophy,
        },
        {
          id: "2",
          title: "Problem Solver",
          description: "Solve 50 math problems",
          earned: false,
          icon: Target,
        },
        {
          id: "3",
          title: "Perfect Score",
          description: "Get 100% on any math quiz",
          earned: false,
          icon: Star,
        },
      ],
    },
    science: {
      id: "science",
      name: "Science",
      description: "Explore the wonders of physics, chemistry, and biology through interactive lessons.",
      icon: "🔬",
      color: "green",
      totalLessons: 20,
      completedLessons: 12,
      averageScore: 82,
      estimatedTime: "5 weeks",
      lessons: [
        {
          id: 1,
          title: "Introduction to Chemistry",
          description: "Basic concepts of atoms, molecules, and chemical reactions.",
          duration: "50 min",
          difficulty: "Beginner",
          completed: true,
          locked: false,
          score: 85,
          type: "video",
        },
        {
          id: 2,
          title: "The Periodic Table",
          description: "Understanding elements and their organization in the periodic table.",
          duration: "65 min",
          difficulty: "Beginner",
          completed: true,
          locked: false,
          score: 90,
          type: "interactive",
        },
        {
          id: 3,
          title: "Chemical Bonding",
          description: "Learn about ionic, covalent, and metallic bonds.",
          duration: "70 min",
          difficulty: "Intermediate",
          completed: false,
          locked: false,
          type: "reading",
        },
        {
          id: 4,
          title: "Chemical Reactions",
          description: "Types of chemical reactions and balancing equations.",
          duration: "80 min",
          difficulty: "Intermediate",
          completed: false,
          locked: false,
          type: "interactive",
        },
      ],
      achievements: [
        {
          id: "1",
          title: "Chemistry Explorer",
          description: "Complete chemistry basics",
          earned: true,
          icon: Award,
        },
        {
          id: "2",
          title: "Lab Master",
          description: "Complete 10 virtual experiments",
          earned: false,
          icon: Target,
        },
      ],
    },
    language: {
      id: "language",
      name: "English",
      description:
        "Improve your English language skills through comprehensive grammar, vocabulary, and writing lessons.",
      icon: "📚",
      color: "purple",
      totalLessons: 18,
      completedLessons: 15,
      averageScore: 91,
      estimatedTime: "4 weeks",
      lessons: [
        {
          id: 1,
          title: "Grammar Fundamentals",
          description: "Master the basic rules of English grammar.",
          duration: "40 min",
          difficulty: "Beginner",
          completed: true,
          locked: false,
          score: 95,
          type: "interactive",
        },
        {
          id: 2,
          title: "Vocabulary Building",
          description: "Expand your vocabulary with common and advanced words.",
          duration: "35 min",
          difficulty: "Beginner",
          completed: true,
          locked: false,
          score: 88,
          type: "reading",
        },
        {
          id: 3,
          title: "Essay Writing",
          description: "Learn to write clear, structured essays.",
          duration: "60 min",
          difficulty: "Intermediate",
          completed: false,
          locked: false,
          type: "interactive",
        },
      ],
      achievements: [
        {
          id: "1",
          title: "Grammar Master",
          description: "Perfect grammar quiz score",
          earned: true,
          icon: Star,
        },
        {
          id: "2",
          title: "Wordsmith",
          description: "Learn 100 new words",
          earned: false,
          icon: BookOpen,
        },
      ],
    },
  }

  const subject = subjectData[subjectId]

  if (!subject) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Subject Not Found</h2>
          <p className="text-gray-600 mb-4">The requested subject could not be found.</p>
          <Button asChild>
            <Link href="/student/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  const progress = (subject.completedLessons / subject.totalLessons) * 100

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "interactive":
        return <Target className="h-4 w-4" />
      case "reading":
        return <BookOpen className="h-4 w-4" />
      case "quiz":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-800"
      case "interactive":
        return "bg-purple-100 text-purple-800"
      case "reading":
        return "bg-orange-100 text-orange-800"
      case "quiz":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/student/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="text-3xl">{subject.icon}</div>
          <div>
            <h1 className="text-2xl font-bold">{subject.name}</h1>
            <p className="text-gray-600">{subject.description}</p>
          </div>
        </div>
      </div>

      {/* Subject Overview */}
      <Card className={`bg-gradient-to-r from-${subject.color}-500 to-${subject.color}-600 text-white`}>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{subject.completedLessons}</div>
              <div className="text-sm opacity-90">Lessons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.round(progress)}%</div>
              <div className="text-sm opacity-90">Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{subject.averageScore}%</div>
              <div className="text-sm opacity-90">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{subject.estimatedTime}</div>
              <div className="text-sm opacity-90">Est. Completion</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lessons" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4">
          <div className="grid gap-4">
            {subject.lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className={`transition-all hover:shadow-md ${
                  lesson.locked ? "opacity-60" : lesson.completed ? "border-green-200 bg-green-50" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        {lesson.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : lesson.locked ? (
                          <Lock className="h-6 w-6 text-gray-400" />
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
                            {lesson.id}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{lesson.title}</h3>
                          <Badge className={getDifficultyColor(lesson.difficulty)}>{lesson.difficulty}</Badge>
                          <Badge className={getTypeColor(lesson.type)} variant="outline">
                            {getLessonIcon(lesson.type)}
                            <span className="ml-1 capitalize">{lesson.type}</span>
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{lesson.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {lesson.duration}
                          </div>
                          {lesson.score && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              {lesson.score}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {lesson.completed && (
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      )}
                      <Button
                        size="sm"
                        disabled={lesson.locked}
                        asChild={!lesson.locked}
                        className={lesson.completed ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {lesson.locked ? (
                          "Locked"
                        ) : (
                          <Link href={`/student/lesson/${lesson.id}`}>{lesson.completed ? "Review" : "Start"}</Link>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {subject.achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`${achievement.earned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50"}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/*{achievement.icon({*/}
                    {/*  className: `h-8 w-8 ${achievement.earned ? "text-yellow-500" : "text-gray-400"}`,*/}
                    {/*})}*/}
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.earned && <CheckCircle className="h-6 w-6 text-green-500" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Lessons Completed</span>
                      <span>
                        {subject.completedLessons}/{subject.totalLessons}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Score</span>
                      <span>{subject.averageScore}%</span>
                    </div>
                    <Progress value={subject.averageScore} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-medium text-blue-900">Next Focus</h4>
                    <p className="text-sm text-blue-700">Continue with quadratic equations to maintain momentum.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-medium text-green-900">Strength</h4>
                    <p className="text-sm text-green-700">You excel at problem-solving exercises.</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-medium text-orange-900">Improvement</h4>
                    <p className="text-sm text-orange-700">
                      Practice more word problems for better application skills.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
