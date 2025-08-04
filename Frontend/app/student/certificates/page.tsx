"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Award,
  Download,
  Share2,
  Trophy,
  Star,
  Calendar,
  BookOpen,
  Target,
  Brain,
  Users,
  Clock,
  CheckCircle,
  Lock,
} from "lucide-react"

interface Certificate {
  id: string
  title: string
  description: string
  subject: string
  dateEarned: string
  type: "completion" | "achievement" | "mastery" | "special"
  level: "Bronze" | "Silver" | "Gold" | "Platinum"
  requirements: string[]
  earned: boolean
  progress?: number
  maxProgress?: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  earned: boolean
  dateEarned?: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  points: number
}

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  const certificates: Certificate[] = [
    {
      id: "math-algebra-completion",
      title: "Algebra Fundamentals",
      description: "Successfully completed all basic algebra lessons with excellent performance",
      subject: "Mathematics",
      dateEarned: "2024-01-15",
      type: "completion",
      level: "Gold",
      requirements: [
        "Complete all 12 algebra lessons",
        "Achieve 80% or higher on all quizzes",
        "Pass the final assessment with 85%+",
      ],
      earned: true,
    },
    {
      id: "science-chemistry-mastery",
      title: "Chemistry Master",
      description: "Demonstrated mastery of fundamental chemistry concepts",
      subject: "Science",
      dateEarned: "2024-01-10",
      type: "mastery",
      level: "Platinum",
      requirements: [
        "Complete chemistry module",
        "Score 90%+ on all assessments",
        "Complete 5 virtual lab experiments",
      ],
      earned: true,
    },
    {
      id: "english-grammar-expert",
      title: "Grammar Expert",
      description: "Mastered English grammar rules and usage",
      subject: "English",
      dateEarned: "",
      type: "completion",
      level: "Silver",
      requirements: [
        "Complete grammar fundamentals",
        "Pass grammar assessment with 85%+",
        "Complete writing exercises",
      ],
      earned: false,
      progress: 8,
      maxProgress: 10,
    },
    {
      id: "math-geometry-explorer",
      title: "Geometry Explorer",
      description: "Explored the world of shapes, angles, and spatial relationships",
      subject: "Mathematics",
      dateEarned: "",
      type: "achievement",
      level: "Bronze",
      requirements: ["Complete 8 geometry lessons", "Solve 25 geometry problems", "Create geometric constructions"],
      earned: false,
      progress: 3,
      maxProgress: 8,
    },
    {
      id: "ai-study-pioneer",
      title: "AI Study Pioneer",
      description: "Early adopter of AI-powered learning tools",
      subject: "Technology",
      dateEarned: "2024-01-08",
      type: "special",
      level: "Gold",
      requirements: [
        "Use AI study assistant 20+ times",
        "Complete AI-generated practice sets",
        "Provide feedback on AI recommendations",
      ],
      earned: true,
    },
    {
      id: "consistent-learner",
      title: "Consistent Learner",
      description: "Maintained a learning streak for 30 consecutive days",
      subject: "General",
      dateEarned: "",
      type: "achievement",
      level: "Silver",
      requirements: [
        "Study for 30 consecutive days",
        "Complete at least 1 lesson per day",
        "Maintain 80%+ average score",
      ],
      earned: false,
      progress: 15,
      maxProgress: 30,
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "first-lesson",
      title: "First Steps",
      description: "Completed your first lesson",
      icon: BookOpen,
      earned: true,
      dateEarned: "2024-01-01",
      rarity: "Common",
      points: 10,
    },
    {
      id: "quiz-master",
      title: "Quiz Master",
      description: "Scored 100% on a quiz",
      icon: Target,
      earned: true,
      dateEarned: "2024-01-05",
      rarity: "Rare",
      points: 50,
    },
    {
      id: "speed-learner",
      title: "Speed Learner",
      description: "Completed 5 lessons in one day",
      icon: Clock,
      earned: true,
      dateEarned: "2024-01-12",
      rarity: "Epic",
      points: 100,
    },
    {
      id: "ai-collaborator",
      title: "AI Collaborator",
      description: "Used AI study assistant 50 times",
      icon: Brain,
      earned: false,
      rarity: "Legendary",
      points: 200,
    },
    {
      id: "social-learner",
      title: "Social Learner",
      description: "Helped 10 classmates with questions",
      icon: Users,
      earned: false,
      rarity: "Epic",
      points: 150,
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Bronze":
        return "from-amber-600 to-amber-800"
      case "Silver":
        return "from-gray-400 to-gray-600"
      case "Gold":
        return "from-yellow-400 to-yellow-600"
      case "Platinum":
        return "from-purple-400 to-purple-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "completion":
        return <CheckCircle className="h-6 w-6" />
      case "achievement":
        return <Trophy className="h-6 w-6" />
      case "mastery":
        return <Star className="h-6 w-6" />
      case "special":
        return <Award className="h-6 w-6" />
      default:
        return <Award className="h-6 w-6" />
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-600 bg-gray-100"
      case "Rare":
        return "text-blue-600 bg-blue-100"
      case "Epic":
        return "text-purple-600 bg-purple-100"
      case "Legendary":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const downloadCertificate = (certificate: Certificate) => {
    // In a real app, this would generate and download a PDF certificate
    alert(`Downloading certificate: ${certificate.title}`)
  }

  const shareCertificate = (certificate: Certificate) => {
    // In a real app, this would open sharing options
    alert(`Sharing certificate: ${certificate.title}`)
  }

  const earnedCertificates = certificates.filter((cert) => cert.earned)
  const inProgressCertificates = certificates.filter((cert) => !cert.earned)
  const earnedAchievements = achievements.filter((ach) => ach.earned)
  const lockedAchievements = achievements.filter((ach) => !ach.earned)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificates & Achievements</h1>
        <p className="text-gray-600">Celebrate your learning milestones and accomplishments</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{earnedCertificates.length}</div>
            <p className="text-sm text-gray-600">Certificates Earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{earnedAchievements.length}</div>
            <p className="text-sm text-gray-600">Achievements Unlocked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{earnedAchievements.reduce((sum, ach) => sum + ach.points, 0)}</div>
            <p className="text-sm text-gray-600">Total Points</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{inProgressCertificates.length}</div>
            <p className="text-sm text-gray-600">In Progress</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="certificates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-4">
          {/* Earned Certificates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Earned Certificates
              </CardTitle>
              <CardDescription>Your completed learning achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {earnedCertificates.map((certificate) => (
                  <Card key={certificate.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div
                        className={`w-full h-32 bg-gradient-to-br ${getLevelColor(certificate.level)} rounded-lg mb-4 flex items-center justify-center`}
                      >
                        <div className="text-center text-white">
                          {getTypeIcon(certificate.type)}
                          <div className="text-sm font-medium mt-2">{certificate.level}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold">{certificate.title}</h3>
                        <p className="text-sm text-gray-600">{certificate.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {certificate.dateEarned}
                        </div>
                        <Badge variant="outline">{certificate.subject}</Badge>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" onClick={() => downloadCertificate(certificate)}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => shareCertificate(certificate)}>
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* In Progress Certificates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                In Progress
              </CardTitle>
              <CardDescription>Certificates you're working towards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inProgressCertificates.map((certificate) => (
                  <Card key={certificate.id} className="border-dashed">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${getLevelColor(certificate.level)} rounded-lg flex items-center justify-center opacity-50`}
                        >
                          <Lock className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{certificate.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{certificate.description}</p>
                          {certificate.progress && certificate.maxProgress && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>
                                  {certificate.progress}/{certificate.maxProgress}
                                </span>
                              </div>
                              <Progress
                                value={(certificate.progress / certificate.maxProgress) * 100}
                                className="h-2"
                              />
                            </div>
                          )}
                        </div>
                        <Badge
                          className={
                            getLevelColor(certificate.level).replace("from-", "bg-").replace(" to-", "").split(" ")[0]
                          }
                        >
                          {certificate.level}
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {certificate.requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gray-300 rounded-full" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          {/* Earned Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-purple-500" />
                Unlocked Achievements
              </CardTitle>
              <CardDescription>Your learning milestones and special accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {earnedAchievements.map((achievement) => (
                  <Card key={achievement.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 rounded-lg">
                          <achievement.icon className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                            <span className="text-sm text-gray-500">+{achievement.points} points</span>
                            {achievement.dateEarned && (
                              <span className="text-xs text-gray-400">{achievement.dateEarned}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Locked Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-gray-500" />
                Locked Achievements
              </CardTitle>
              <CardDescription>Achievements waiting to be unlocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {lockedAchievements.map((achievement) => (
                  <Card key={achievement.id} className="opacity-60 border-dashed">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <achievement.icon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-700">{achievement.title}</h3>
                          <p className="text-sm text-gray-500">{achievement.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-gray-500">
                              {achievement.rarity}
                            </Badge>
                            <span className="text-sm text-gray-400">+{achievement.points} points</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your progress across different subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mathematics</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">2 certificates earned, 1 in progress</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Science</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">1 certificate earned, 1 in progress</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>English</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">1 certificate in progress</p>
                </div>
              </CardContent>
            </Card>

            {/* Next Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Next Milestones</CardTitle>
                <CardDescription>Upcoming achievements you can unlock</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Grammar Expert Certificate</h4>
                  <p className="text-sm text-gray-600">Complete 2 more grammar lessons</p>
                  <Progress value={80} className="h-2 mt-2" />
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Consistent Learner Achievement</h4>
                  <p className="text-sm text-gray-600">Study for 15 more consecutive days</p>
                  <Progress value={50} className="h-2 mt-2" />
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">AI Collaborator Achievement</h4>
                  <p className="text-sm text-gray-600">Use AI assistant 25 more times</p>
                  <Progress value={50} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievement Points Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Achievement Points</CardTitle>
              <CardDescription>Points earned from different types of achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">10</div>
                  <div className="text-sm text-gray-500">Common</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">50</div>
                  <div className="text-sm text-blue-500">Rare</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">100</div>
                  <div className="text-sm text-purple-500">Epic</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">0</div>
                  <div className="text-sm text-yellow-500">Legendary</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
