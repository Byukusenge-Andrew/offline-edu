"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Target,
  Clock,
  CheckCircle,
  XCircle,
  Brain,
  Trophy,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Play,
  BookOpen,
  Star,
} from "lucide-react"

interface Question {
  id: number
  type: "multiple-choice" | "true-false" | "short-answer"
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  points: number
  difficulty: "Easy" | "Medium" | "Hard"
}

interface Quiz {
  id: string
  title: string
  subject: string
  description: string
  timeLimit: number // in minutes
  totalQuestions: number
  totalPoints: number
  difficulty: "Easy" | "Medium" | "Hard"
  questions: Question[]
}

interface QuizResult {
  score: number
  totalPoints: number
  percentage: number
  timeSpent: number
  correctAnswers: number
  totalQuestions: number
}

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<QuizResult | null>(null)

  const availableQuizzes: Quiz[] = [
    {
      id: "math-algebra",
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      description: "Test your understanding of basic algebraic concepts and operations.",
      timeLimit: 30,
      totalQuestions: 10,
      totalPoints: 100,
      difficulty: "Medium",
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "What is the value of x in the equation 2x + 5 = 13?",
          options: ["2", "4", "6", "8"],
          correctAnswer: 1,
          explanation: "To solve 2x + 5 = 13, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
          points: 10,
          difficulty: "Easy",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "Which of the following is equivalent to 3(x + 2)?",
          options: ["3x + 2", "3x + 6", "x + 6", "3x + 5"],
          correctAnswer: 1,
          explanation: "Using the distributive property: 3(x + 2) = 3x + 3(2) = 3x + 6",
          points: 10,
          difficulty: "Easy",
        },
        {
          id: 3,
          type: "true-false",
          question: "The equation y = 2x + 3 represents a linear function.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation: "Yes, this is a linear function because it has the form y = mx + b where m and b are constants.",
          points: 10,
          difficulty: "Medium",
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "What is the slope of the line passing through points (2, 3) and (4, 7)?",
          options: ["1", "2", "3", "4"],
          correctAnswer: 1,
          explanation: "Slope = (y₂ - y₁)/(x₂ - x₁) = (7 - 3)/(4 - 2) = 4/2 = 2",
          points: 15,
          difficulty: "Medium",
        },
        {
          id: 5,
          type: "short-answer",
          question: "Solve for x: x² - 5x + 6 = 0",
          correctAnswer: "x = 2 or x = 3",
          explanation: "Factor: (x - 2)(x - 3) = 0, so x = 2 or x = 3",
          points: 20,
          difficulty: "Hard",
        },
      ],
    },
    {
      id: "science-chemistry",
      title: "Basic Chemistry",
      subject: "Science",
      description: "Explore fundamental chemistry concepts including atoms, molecules, and reactions.",
      timeLimit: 25,
      totalQuestions: 8,
      totalPoints: 80,
      difficulty: "Easy",
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "What is the chemical symbol for water?",
          options: ["H₂O", "CO₂", "NaCl", "O₂"],
          correctAnswer: 0,
          explanation: "Water consists of 2 hydrogen atoms and 1 oxygen atom, hence H₂O.",
          points: 10,
          difficulty: "Easy",
        },
        {
          id: 2,
          type: "true-false",
          question: "An atom has more protons than electrons.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation: "In a neutral atom, the number of protons equals the number of electrons.",
          points: 10,
          difficulty: "Easy",
        },
      ],
    },
    {
      id: "english-grammar",
      title: "English Grammar Basics",
      subject: "English",
      description: "Test your knowledge of fundamental English grammar rules and usage.",
      timeLimit: 20,
      totalQuestions: 12,
      totalPoints: 120,
      difficulty: "Easy",
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Which sentence is grammatically correct?",
          options: [
            "Me and John went to the store.",
            "John and I went to the store.",
            "John and me went to the store.",
            "I and John went to the store.",
          ],
          correctAnswer: 1,
          explanation: "Use 'I' as the subject of the sentence, and put the other person first: 'John and I'.",
          points: 10,
          difficulty: "Easy",
        },
      ],
    },
  ]

  const recentQuizzes = [
    { title: "Algebra Basics", subject: "Mathematics", score: 85, date: "2 days ago" },
    { title: "Photosynthesis", subject: "Science", score: 92, date: "1 week ago" },
    { title: "Grammar Rules", subject: "English", score: 78, date: "1 week ago" },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      handleSubmitQuiz()
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setCurrentQuestion(0)
    setAnswers({})
    setTimeLeft(quiz.timeLimit * 60)
    setIsActive(true)
    setQuizCompleted(false)
    setShowResults(false)
    setResults(null)
  }

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const nextQuestion = () => {
    if (selectedQuiz && currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    if (!selectedQuiz) return

    setIsActive(false)
    setQuizCompleted(true)

    let correctAnswers = 0
    let totalPoints = 0

    selectedQuiz.questions.forEach((question) => {
      const userAnswer = answers[question.id]
      if (userAnswer !== undefined) {
        if (question.type === "multiple-choice" || question.type === "true-false") {
          if (Number.parseInt(userAnswer) === question.correctAnswer) {
            correctAnswers++
            totalPoints += question.points
          }
        } else if (question.type === "short-answer") {
          // Simple string comparison for demo - in real app would be more sophisticated
          if (userAnswer.toLowerCase().includes(question.correctAnswer.toString().toLowerCase())) {
            correctAnswers++
            totalPoints += question.points
          }
        }
      }
    })

    const percentage = Math.round((totalPoints / selectedQuiz.totalPoints) * 100)
    const timeSpent = selectedQuiz.timeLimit * 60 - timeLeft

    setResults({
      score: totalPoints,
      totalPoints: selectedQuiz.totalPoints,
      percentage,
      timeSpent,
      correctAnswers,
      totalQuestions: selectedQuiz.questions.length,
    })

    setShowResults(true)
  }

  const resetQuiz = () => {
    setSelectedQuiz(null)
    setCurrentQuestion(0)
    setAnswers({})
    setTimeLeft(0)
    setIsActive(false)
    setQuizCompleted(false)
    setShowResults(false)
    setResults(null)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-blue-600"
    if (percentage >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  if (showResults && results) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              {results.percentage >= 80 ? (
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              ) : (
                <Target className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
              <p className="text-gray-600">Here are your results for "{selectedQuiz?.title}"</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(results.percentage)}`}>{results.percentage}%</div>
                <div className="text-sm text-gray-600">Final Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">
                  {results.correctAnswers}/{results.totalQuestions}
                </div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">
                  {results.score}/{results.totalPoints}
                </div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">{formatTime(results.timeSpent)}</div>
                <div className="text-sm text-gray-600">Time Spent</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={resetQuiz}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Take Another Quiz
              </Button>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Review Answers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedQuiz?.questions.map((question, index) => {
                const userAnswer = answers[question.id]
                const isCorrect =
                  question.type === "multiple-choice" || question.type === "true-false"
                    ? Number.parseInt(userAnswer || "-1") === question.correctAnswer
                    : userAnswer?.toLowerCase().includes(question.correctAnswer.toString().toLowerCase())

                return (
                  <div key={question.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium">Question {index + 1}</h4>
                      <p className="text-sm text-gray-600">{question.question}</p>
                      {!isCorrect && <p className="text-sm text-blue-600 mt-1">{question.explanation}</p>}
                    </div>
                    <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (selectedQuiz && !quizCompleted) {
    const question = selectedQuiz.questions[currentQuestion]
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100

    return (
      <div className="space-y-6">
        {/* Quiz Header */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold">{selectedQuiz.title}</h1>
                <p className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {selectedQuiz.questions.length}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className={`font-mono ${timeLeft < 300 ? "text-red-600" : ""}`}>{formatTime(timeLeft)}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleSubmitQuiz}>
                  Submit Quiz
                </Button>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Question {currentQuestion + 1}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                <Badge variant="outline">{question.points} points</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg font-medium leading-relaxed">{question.question}</div>

            {question.type === "multiple-choice" && question.options && (
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === "true-false" && question.options && (
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`tf-${index}`} />
                    <Label htmlFor={`tf-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === "short-answer" && (
              <Textarea
                placeholder="Type your answer here..."
                value={answers[question.id] || ""}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="min-h-24"
              />
            )}

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={previousQuestion} disabled={currentQuestion === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button onClick={currentQuestion === selectedQuiz.questions.length - 1 ? handleSubmitQuiz : nextQuestion}>
                {currentQuestion === selectedQuiz.questions.length - 1 ? "Submit Quiz" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Center</h1>
        <p className="text-gray-600">Test your knowledge and track your progress</p>
      </div>

      {/* Available Quizzes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Available Quizzes
          </CardTitle>
          <CardDescription>Choose a quiz to test your knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableQuizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{quiz.title}</h3>
                      <p className="text-sm text-gray-600">{quiz.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Subject:</span>
                        <Badge variant="outline">{quiz.subject}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Questions:</span>
                        <span>{quiz.totalQuestions}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Time Limit:</span>
                        <span>{quiz.timeLimit} min</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Difficulty:</span>
                        <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                      </div>
                    </div>

                    <Button onClick={() => startQuiz(quiz)} className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Start Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Quiz Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Recent Results
          </CardTitle>
          <CardDescription>Your latest quiz performances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentQuizzes.map((quiz, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{quiz.title}</h4>
                  <p className="text-sm text-gray-600">
                    {quiz.subject} • {quiz.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getScoreColor(quiz.score)} bg-transparent border`}>{quiz.score}%</Badge>
                  {quiz.score >= 90 && <Star className="h-4 w-4 text-yellow-500" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Study Recommendations */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Study Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg">
              <h4 className="font-medium text-purple-900">📈 Recommended Focus</h4>
              <p className="text-sm text-purple-700">
                Based on your recent performance, consider reviewing algebra concepts before taking the advanced math
                quiz.
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <h4 className="font-medium text-blue-900">🎯 Next Challenge</h4>
              <p className="text-sm text-blue-700">
                You're ready for the intermediate science quiz! Your chemistry knowledge is strong.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
