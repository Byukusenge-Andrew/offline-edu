"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, X, HelpCircle, Clock } from "lucide-react"

interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer" | "essay"
  question: string
  options?: string[]
  correctAnswer: string
  points: number
  explanation?: string
}

interface CreateQuizDialogProps {
  trigger?: React.ReactNode
  onQuizCreated?: (quiz: any) => void
}

export function CreateQuizDialog({ trigger, onQuizCreated }: CreateQuizDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    grade: "",
    timeLimit: "",
    passingScore: "",
    attempts: "",
    randomizeQuestions: false,
    showResults: true,
    tags: [] as string[],
  })
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 1,
    explanation: "",
  })
  const [newTag, setNewTag] = useState("")

  const subjects = ["Mathematics", "English", "Science", "History", "Geography", "Biology", "Chemistry", "Physics"]
  const grades = [
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ]
  const questionTypes = [
    { value: "multiple-choice", label: "Multiple Choice" },
    { value: "true-false", label: "True/False" },
    { value: "short-answer", label: "Short Answer" },
    { value: "essay", label: "Essay" },
  ]

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleQuestionChange = (field: string, value: any) => {
    setCurrentQuestion((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const addQuestion = () => {
    if (currentQuestion.question && currentQuestion.correctAnswer) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        type: currentQuestion.type as Question["type"],
        question: currentQuestion.question,
        options: currentQuestion.options,
        correctAnswer: currentQuestion.correctAnswer,
        points: currentQuestion.points || 1,
        explanation: currentQuestion.explanation,
      }

      setQuestions((prev) => [...prev, newQuestion])
      setCurrentQuestion({
        type: "multiple-choice",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        points: 1,
        explanation: "",
      })
    }
  }

  const removeQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId))
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newQuiz = {
        id: Date.now().toString(),
        ...formData,
        questions,
        totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
        createdAt: new Date().toISOString(),
        status: "draft",
      }

      onQuizCreated?.(newQuiz)
      setOpen(false)
      setCurrentStep(1)

      // Reset form
      setFormData({
        title: "",
        description: "",
        subject: "",
        grade: "",
        timeLimit: "",
        passingScore: "",
        attempts: "",
        randomizeQuestions: false,
        showResults: true,
        tags: [],
      })
      setQuestions([])
    } catch (error) {
      console.error("Failed to create quiz:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const canProceedToStep2 = formData.title && formData.subject && formData.grade
  const canSubmit = questions.length > 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Create New Quiz
          </DialogTitle>
          <DialogDescription>
            Step {currentStep} of 2: {currentStep === 1 ? "Quiz Settings" : "Add Questions"}
          </DialogDescription>
        </DialogHeader>

        {currentStep === 1 ? (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter quiz title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the quiz content and objectives"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level *</Label>
                  <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeLimit" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time Limit (minutes)
                  </Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    placeholder="30"
                    value={formData.timeLimit}
                    onChange={(e) => handleInputChange("timeLimit", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passingScore">Passing Score (%)</Label>
                  <Input
                    id="passingScore"
                    type="number"
                    placeholder="70"
                    value={formData.passingScore}
                    onChange={(e) => handleInputChange("passingScore", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attempts">Max Attempts</Label>
                  <Input
                    id="attempts"
                    type="number"
                    placeholder="3"
                    value={formData.attempts}
                    onChange={(e) => handleInputChange("attempts", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="randomize"
                    checked={formData.randomizeQuestions}
                    onCheckedChange={(checked) => handleInputChange("randomizeQuestions", checked as boolean)}
                  />
                  <Label htmlFor="randomize">Randomize question order</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showResults"
                    checked={formData.showResults}
                    onCheckedChange={(checked) => handleInputChange("showResults", checked as boolean)}
                  />
                  <Label htmlFor="showResults">Show results immediately after completion</Label>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Question Builder */}
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold">Add Question</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <Select value={currentQuestion.type} onValueChange={(value) => handleQuestionChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={currentQuestion.points}
                    onChange={(e) => handleQuestionChange("points", Number.parseInt(e.target.value) || 1)}
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Question</Label>
                <Textarea
                  placeholder="Enter your question"
                  value={currentQuestion.question}
                  onChange={(e) => handleQuestionChange("question", e.target.value)}
                  rows={2}
                />
              </div>

              {currentQuestion.type === "multiple-choice" && (
                <div className="space-y-2">
                  <Label>Answer Options</Label>
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(currentQuestion.options || [])]
                          newOptions[index] = e.target.value
                          handleQuestionChange("options", newOptions)
                        }}
                      />
                      <Checkbox
                        checked={currentQuestion.correctAnswer === option}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleQuestionChange("correctAnswer", option)
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.type === "true-false" && (
                <div className="space-y-2">
                  <Label>Correct Answer</Label>
                  <Select
                    value={currentQuestion.correctAnswer}
                    onValueChange={(value) => handleQuestionChange("correctAnswer", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(currentQuestion.type === "short-answer" || currentQuestion.type === "essay") && (
                <div className="space-y-2">
                  <Label>Sample Answer / Keywords</Label>
                  <Textarea
                    placeholder="Enter sample answer or keywords for grading"
                    value={currentQuestion.correctAnswer}
                    onChange={(e) => handleQuestionChange("correctAnswer", e.target.value)}
                    rows={2}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Explanation (Optional)</Label>
                <Textarea
                  placeholder="Explain the correct answer"
                  value={currentQuestion.explanation}
                  onChange={(e) => handleQuestionChange("explanation", e.target.value)}
                  rows={2}
                />
              </div>

              <Button
                type="button"
                onClick={addQuestion}
                disabled={!currentQuestion.question || !currentQuestion.correctAnswer}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            {/* Questions List */}
            {questions.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Questions ({questions.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-3 flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{question.type}</Badge>
                          <Badge variant="secondary">{question.points} pts</Badge>
                        </div>
                        <p className="text-sm font-medium">
                          {index + 1}. {question.question}
                        </p>
                        {question.type === "multiple-choice" && (
                          <p className="text-xs text-gray-600 mt-1">Correct: {question.correctAnswer}</p>
                        )}
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {currentStep === 1 ? (
            <Button type="button" onClick={() => setCurrentStep(2)} disabled={!canProceedToStep2}>
              Next: Add Questions
            </Button>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button type="button" onClick={handleSubmit} disabled={isLoading || !canSubmit}>
                {isLoading ? "Creating..." : "Create Quiz"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
