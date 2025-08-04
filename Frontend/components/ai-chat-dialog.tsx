"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, Send, User, Lightbulb, BookOpen, HelpCircle, Loader2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AiChatDialogProps {
  trigger?: React.ReactNode
  context?: {
    subject?: string
    lesson?: string
    studentLevel?: string
  }
}

export function AiChatDialog({ trigger, context }: AiChatDialogProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Hello! I'm your AI study assistant. I'm here to help you understand concepts, solve problems, and guide your learning journey. ${
        context?.subject ? `I see you're working on ${context.subject}` : "What would you like to learn about today?"
      }`,
      timestamp: new Date(),
      suggestions: ["Explain this concept", "Help me solve a problem", "Give me practice questions", "Study tips"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAiResponse(messageText, context)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateAiResponse = (userMessage: string, context?: any) => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("explain") || lowerMessage.includes("what is")) {
      return {
        content:
          "I'd be happy to explain that concept! Let me break it down into simple steps:\n\n1. **Definition**: This concept refers to...\n2. **Key Points**: The main things to remember are...\n3. **Example**: Here's a practical example...\n\nWould you like me to elaborate on any of these points?",
        suggestions: ["Give me more examples", "How do I apply this?", "What's the next topic?", "Quiz me on this"],
      }
    }

    if (lowerMessage.includes("solve") || lowerMessage.includes("problem")) {
      return {
        content:
          "Let's work through this problem step by step:\n\n**Step 1**: First, identify what we know and what we need to find.\n**Step 2**: Choose the appropriate method or formula.\n**Step 3**: Apply the method carefully.\n**Step 4**: Check our answer.\n\nCan you share the specific problem you're working on?",
        suggestions: [
          "Show me another example",
          "I need help with step 2",
          "Give me a similar problem",
          "Explain the formula",
        ],
      }
    }

    if (lowerMessage.includes("practice") || lowerMessage.includes("quiz")) {
      return {
        content:
          "Great! Practice is key to mastering any subject. Here are some practice questions for you:\n\n**Question 1**: [Sample question based on your current topic]\n**Question 2**: [Another practice question]\n**Question 3**: [A slightly more challenging question]\n\nTry solving these and let me know if you need help with any of them!",
        suggestions: ["Check my answer", "Give me harder questions", "Explain the solution", "More practice please"],
      }
    }

    if (lowerMessage.includes("study tips") || lowerMessage.includes("how to study")) {
      return {
        content:
          "Here are some effective study strategies:\n\n📚 **Active Learning**: Don't just read - summarize, question, and teach concepts to yourself\n⏰ **Spaced Repetition**: Review material at increasing intervals\n🎯 **Focus Sessions**: Use 25-minute focused study blocks with short breaks\n📝 **Practice Testing**: Quiz yourself regularly\n🤝 **Teach Others**: Explaining concepts helps solidify your understanding\n\nWhich study method would you like to try first?",
        suggestions: [
          "Help me make a study schedule",
          "More memory techniques",
          "How to stay motivated",
          "Subject-specific tips",
        ],
      }
    }

    return {
      content:
        "I understand you're asking about that topic. Let me help you with a comprehensive explanation and some practical guidance. Based on your question, here's what I think would be most helpful:\n\n• **Key concept explanation**\n• **Step-by-step approach**\n• **Common mistakes to avoid**\n• **Practice opportunities**\n\nWhat specific aspect would you like me to focus on?",
      suggestions: ["Give me examples", "Explain step by step", "Common mistakes", "Practice problems"],
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Brain className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Study Assistant
          </DialogTitle>
          <DialogDescription>
            Get personalized help with your studies. Ask questions, request explanations, or get practice problems.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "ai" && (
                    <Avatar className="h-8 w-8 bg-purple-100">
                      <AvatarFallback>
                        <Brain className="h-4 w-4 text-purple-600" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "user" ? "bg-blue-600 text-white ml-auto" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>

                    {message.suggestions && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs bg-transparent"
                            onClick={() => handleSendMessage(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  {message.type === "user" && (
                    <Avatar className="h-8 w-8 bg-blue-100">
                      <AvatarFallback>
                        <User className="h-4 w-4 text-blue-600" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8 bg-purple-100">
                    <AvatarFallback>
                      <Brain className="h-4 w-4 text-purple-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="border-t pt-3 mb-3">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage("Explain this concept in simple terms")}
                className="text-xs"
              >
                <Lightbulb className="h-3 w-3 mr-1" />
                Explain Concept
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage("Give me practice problems")}
                className="text-xs"
              >
                <BookOpen className="h-3 w-3 mr-1" />
                Practice Problems
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage("I need study tips")}
                className="text-xs"
              >
                <HelpCircle className="h-3 w-3 mr-1" />
                Study Tips
              </Button>
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about your studies..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isLoading} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
