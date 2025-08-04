"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BookOpen,
  Bell,
  User,
  Settings,
  LogOut,
  Battery,
  WifiOff,
  Brain,
  Clock,
  MessageSquare,
  Award,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Notification {
  id: string
  type: "achievement" | "assignment" | "system" | "ai" | "grade"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
}

export default function Navbar() {
  const [username, setUsername] = useState("")
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "New Achievement Unlocked!",
      message: "You've completed 10 math lessons in a row. Keep up the great work!",
      timestamp: "2 minutes ago",
      read: false,
      priority: "medium",
    },
    {
      id: "2",
      type: "assignment",
      title: "New Assignment Available",
      message: "Your teacher has assigned a new quiz on Algebra basics.",
      timestamp: "1 hour ago",
      read: false,
      priority: "high",
    },
    {
      id: "3",
      type: "ai",
      title: "AI Study Recommendation",
      message: "Based on your progress, we recommend reviewing fractions before the next lesson.",
      timestamp: "3 hours ago",
      read: true,
      priority: "low",
    },
    {
      id: "4",
      type: "grade",
      title: "Quiz Results Available",
      message: "Your Science quiz has been graded. Score: 92%",
      timestamp: "1 day ago",
      read: true,
      priority: "medium",
    },
    {
      id: "5",
      type: "system",
      title: "Content Sync Complete",
      message: "All offline content has been updated successfully.",
      timestamp: "2 days ago",
      read: true,
      priority: "low",
    },
  ])

  const router = useRouter()

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    const storedUserType = localStorage.getItem("userType") as "student" | "teacher"

    if (storedUsername) setUsername(storedUsername)
    if (storedUserType) setUserType(storedUserType)

    // Simulate battery drain
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 2))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("userType")
    router.push("/")
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Award className="h-4 w-4 text-yellow-500" />
      case "assignment":
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case "ai":
        return <Brain className="h-4 w-4 text-purple-500" />
      case "grade":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "system":
        return <Settings className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-blue-500 bg-blue-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  if (!userType) return null

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <Link href={userType === "student" ? "/student/dashboard" : "/teacher/dashboard"}>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900">OfflineEdu</h1>
                <p className="text-xs text-gray-600 capitalize">{userType} Portal</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Center - Status Indicators */}
        <div className="hidden md:flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1 text-purple-600">
            <Brain className="h-3 w-3" />
            AI Active
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Battery className="h-3 w-3" />
            {Math.round(batteryLevel)}%
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 text-orange-600">
            <WifiOff className="h-3 w-3" />
            Offline Mode
          </Badge>
        </div>

        {/* Right Side - Notifications and User Menu */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all read
                    </Button>
                  )}
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-l-4 cursor-pointer hover:bg-gray-50 transition-colors ${getPriorityColor(
                          notification.priority,
                        )} ${!notification.read ? "bg-blue-50" : ""}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4
                                className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {notification.title}
                              </h4>
                              {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                            </div>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-400">{notification.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-3 border-t bg-gray-50">
                <Button variant="ghost" size="sm" className="w-full justify-start bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{username ? username.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{username || "User"}</p>
                  <p className="text-xs text-gray-600 capitalize">{userType}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/${userType}/profile`} className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Help & Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Status Bar */}
      <div className="md:hidden mt-3 flex items-center justify-center gap-2">
        <Badge variant="outline" className="text-xs">
          <Brain className="h-3 w-3 mr-1" />
          AI
        </Badge>
        <Badge variant="outline" className="text-xs">
          <Battery className="h-3 w-3 mr-1" />
          {Math.round(batteryLevel)}%
        </Badge>
        <Badge variant="outline" className="text-xs">
          <WifiOff className="h-3 w-3 mr-1" />
          Offline
        </Badge>
      </div>
    </nav>
  )
}
