"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  Battery,
  WifiOff,
  Download,
  Calendar,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface ClassAnalytics {
  totalStudents: number
  activeStudents: number
  averageProgress: number
  completionRate: number
  averageStudyTime: number
  strugglingStudents: number
}

interface SubjectPerformance {
  subject: string
  averageScore: number
  completionRate: number
  timeSpent: number
  strugglingCount: number
  excellentCount: number
}

interface StudentPerformance {
  id: string
  name: string
  overallScore: number
  mathScore: number
  scienceScore: number
  englishScore: number
  studyTime: number
  status: "excellent" | "good" | "struggling"
  lastActive: string
}

export default function AnalyticsPage() {
  const router = useRouter()
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedClass, setSelectedClass] = useState("all")

  const classAnalytics: ClassAnalytics = {
    totalStudents: 28,
    activeStudents: 24,
    averageProgress: 73,
    completionRate: 68,
    averageStudyTime: 2.4,
    strugglingStudents: 4,
  }

  const subjectPerformance: SubjectPerformance[] = [
    {
      subject: "Mathematics",
      averageScore: 78,
      completionRate: 72,
      timeSpent: 45.2,
      strugglingCount: 3,
      excellentCount: 12,
    },
    {
      subject: "Science",
      averageScore: 71,
      completionRate: 65,
      timeSpent: 38.7,
      strugglingCount: 5,
      excellentCount: 8,
    },
    {
      subject: "English",
      averageScore: 82,
      completionRate: 78,
      timeSpent: 41.3,
      strugglingCount: 2,
      excellentCount: 15,
    },
  ]

  const topPerformers: StudentPerformance[] = [
    {
      id: "1",
      name: "Fatima Al-Rashid",
      overallScore: 94,
      mathScore: 96,
      scienceScore: 91,
      englishScore: 95,
      studyTime: 4.2,
      status: "excellent",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Amara Johnson",
      overallScore: 89,
      mathScore: 87,
      scienceScore: 85,
      englishScore: 95,
      studyTime: 3.8,
      status: "excellent",
      lastActive: "1 hour ago",
    },
    {
      id: "3",
      name: "David Okonkwo",
      overallScore: 86,
      mathScore: 88,
      scienceScore: 82,
      englishScore: 88,
      studyTime: 3.5,
      status: "excellent",
      lastActive: "3 hours ago",
    },
  ]

  const strugglingStudents: StudentPerformance[] = [
    {
      id: "4",
      name: "Joseph Mbeki",
      overallScore: 45,
      mathScore: 42,
      scienceScore: 38,
      englishScore: 55,
      studyTime: 1.2,
      status: "struggling",
      lastActive: "2 days ago",
    },
    {
      id: "5",
      name: "Sarah Kimani",
      overallScore: 52,
      mathScore: 48,
      scienceScore: 55,
      englishScore: 53,
      studyTime: 1.8,
      status: "struggling",
      lastActive: "1 day ago",
    },
  ]

  const weeklyTrends = [
    { week: "Week 1", engagement: 78, completion: 65, average: 72 },
    { week: "Week 2", engagement: 82, completion: 70, average: 75 },
    { week: "Week 3", engagement: 85, completion: 73, average: 78 },
    { week: "Week 4", engagement: 88, completion: 76, average: 81 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 2))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "struggling":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const exportReport = () => {
    alert("Analytics report exported! In a real app, this would download a comprehensive PDF report.")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold">Class Analytics</h1>
                  <p className="text-sm text-gray-600">Comprehensive performance insights and trends</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={exportReport} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Battery className="h-3 w-3" />
                  {Math.round(batteryLevel)}%
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <WifiOff className="h-3 w-3" />
                  Offline
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{classAnalytics.totalStudents}</div>
                <p className="text-xs text-gray-600">Total Students</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{classAnalytics.activeStudents}</div>
                <p className="text-xs text-gray-600">Active Students</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{classAnalytics.averageProgress}%</div>
                <p className="text-xs text-gray-600">Avg Progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">{classAnalytics.completionRate}%</div>
                <p className="text-xs text-gray-600">Completion Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-indigo-500" />
                <div className="text-2xl font-bold">{classAnalytics.averageStudyTime}h</div>
                <p className="text-xs text-gray-600">Avg Study Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">{classAnalytics.strugglingStudents}</div>
                <p className="text-xs text-gray-600">Need Help</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
              <TabsTrigger value="students">Student Performance</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Class Performance Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Excellent (90-100%)</span>
                          <span>8 students</span>
                        </div>
                        <Progress value={29} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Good (70-89%)</span>
                          <span>16 students</span>
                        </div>
                        <Progress value={57} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Needs Improvement (50-69%)</span>
                          <span>3 students</span>
                        </div>
                        <Progress value={11} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Struggling (&lt;50%)</span>
                          <span>1 student</span>
                        </div>
                        <Progress value={3} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Study Time Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">67.2h</div>
                        <p className="text-sm text-gray-600">Total Class Study Time</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="font-bold text-green-600">4.2h</div>
                          <p className="text-gray-600">Top Performer</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded">
                          <div className="font-bold text-orange-600">0.8h</div>
                          <p className="text-gray-600">Needs Attention</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-1">✅ Achievements</h4>
                      <p className="text-sm text-green-700">12 students completed new lessons today</p>
                      <p className="text-sm text-green-700">3 new certificates earned this week</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-800 mb-1">⚠️ Attention Needed</h4>
                      <p className="text-sm text-yellow-700">4 students haven't logged in for 2+ days</p>
                      <p className="text-sm text-yellow-700">2 students struggling with Math concepts</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-1">📊 Trends</h4>
                      <p className="text-sm text-blue-700">Overall performance up 5% this month</p>
                      <p className="text-sm text-blue-700">English scores showing strongest improvement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-4">
              <div className="grid gap-4">
                {subjectPerformance.map((subject) => (
                  <Card key={subject.subject}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{subject.subject}</CardTitle>
                        <Badge variant="outline">{subject.averageScore}% Average</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Average Score</p>
                          <div className="text-2xl font-bold">{subject.averageScore}%</div>
                          <Progress value={subject.averageScore} className="h-2 mt-1" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                          <div className="text-2xl font-bold">{subject.completionRate}%</div>
                          <Progress value={subject.completionRate} className="h-2 mt-1" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Total Study Time</p>
                          <div className="text-2xl font-bold">{subject.timeSpent}h</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-bold text-green-600">{subject.excellentCount}</div>
                            <p className="text-gray-600">Excellent</p>
                          </div>
                          <div className="text-center p-2 bg-red-50 rounded">
                            <div className="font-bold text-red-600">{subject.strugglingCount}</div>
                            <p className="text-gray-600">Struggling</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPerformers.map((student, index) => (
                        <div key={student.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-gray-600">
                              Overall: {student.overallScore}% • Study Time: {student.studyTime}h/day
                            </p>
                            <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                              <div>Math: {student.mathScore}%</div>
                              <div>Science: {student.scienceScore}%</div>
                              <div>English: {student.englishScore}%</div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Students Needing Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {strugglingStudents.map((student) => (
                        <div key={student.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-gray-600">
                              Overall: {student.overallScore}% • Study Time: {student.studyTime}h/day
                            </p>
                            <p className="text-xs text-red-600">Last active: {student.lastActive}</p>
                            <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                              <div>Math: {student.mathScore}%</div>
                              <div>Science: {student.scienceScore}%</div>
                              <div>English: {student.englishScore}%</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Intervene
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Weekly Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyTrends.map((week, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{week.week}</h4>
                          <Badge variant="outline">Avg: {week.average}%</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Engagement</span>
                              <span>{week.engagement}%</span>
                            </div>
                            <Progress value={week.engagement} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Completion</span>
                              <span>{week.completion}%</span>
                            </div>
                            <Progress value={week.completion} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Average Score</span>
                              <span>{week.average}%</span>
                            </div>
                            <Progress value={week.average} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-yellow-800">Mathematics</h4>
                        <p className="text-sm text-yellow-700">Geometry concepts need reinforcement</p>
                        <p className="text-xs text-yellow-600">5 students struggling with this topic</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-800">Science</h4>
                        <p className="text-sm text-orange-700">Physics fundamentals require attention</p>
                        <p className="text-xs text-orange-600">3 students need additional support</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Success Stories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800">English Literature</h4>
                        <p className="text-sm text-green-700">15% improvement in reading comprehension</p>
                        <p className="text-xs text-green-600">Class average increased to 82%</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800">Study Habits</h4>
                        <p className="text-sm text-blue-700">Daily engagement up 20% this month</p>
                        <p className="text-xs text-blue-600">More consistent learning patterns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Insights & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2">🎯 Learning Optimization</h4>
                      <p className="text-sm text-blue-700 mb-2">
                        Students perform 23% better when lessons are scheduled between 2-4 PM. Consider adjusting
                        difficult topics to this time window.
                      </p>
                      <Button size="sm" variant="outline">
                        Apply Recommendation
                      </Button>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2">📈 Performance Prediction</h4>
                      <p className="text-sm text-green-700 mb-2">
                        Based on current trends, class average is projected to reach 78% by month-end. Focus on
                        struggling students to achieve 80% target.
                      </p>
                      <Button size="sm" variant="outline">
                        View Action Plan
                      </Button>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 mb-2">🔍 Content Analysis</h4>
                      <p className="text-sm text-purple-700 mb-2">
                        Interactive lessons show 35% higher engagement than video-only content. Consider adding more
                        interactive elements to Science modules.
                      </p>
                      <Button size="sm" variant="outline">
                        Update Content
                      </Button>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-800 mb-2">⚠️ Early Warning System</h4>
                      <p className="text-sm text-orange-700 mb-2">
                        2 students show patterns indicating potential dropout risk. Immediate intervention recommended
                        within 48 hours.
                      </p>
                      <Button size="sm" variant="outline">
                        Create Intervention Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Patterns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Morning (8-12 PM)</span>
                          <span>65% engagement</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Afternoon (12-6 PM)</span>
                          <span>88% engagement</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Evening (6-10 PM)</span>
                          <span>72% engagement</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Effectiveness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Interactive Lessons</span>
                          <span>92% effective</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Video Content</span>
                          <span>78% effective</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Text-based Lessons</span>
                          <span>65% effective</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
