"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, CheckCircle, AlertTriangle, Info, Award, BookOpen, Users, Brain } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "achievement"
  title: string
  message: string
  timestamp: string
  read: boolean
  category: "system" | "learning" | "social" | "ai"
  actionUrl?: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "New Certificate Earned!",
      message: "Congratulations! You've earned the Mathematics Foundation certificate.",
      timestamp: "2 minutes ago",
      read: false,
      category: "learning",
      actionUrl: "/student/certificates",
    },
    {
      id: "2",
      type: "info",
      title: "AI Study Recommendation",
      message: "Based on your progress, we recommend reviewing fraction concepts.",
      timestamp: "1 hour ago",
      read: false,
      category: "ai",
    },
    {
      id: "3",
      type: "success",
      title: "Content Sync Complete",
      message: "Your offline content has been updated with 3 new lessons.",
      timestamp: "3 hours ago",
      read: true,
      category: "system",
    },
    {
      id: "4",
      type: "warning",
      title: "Low Battery Warning",
      message: "Your device battery is below 20%. Consider enabling power saving mode.",
      timestamp: "5 hours ago",
      read: false,
      category: "system",
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIcon = (type: string, category: string) => {
    if (type === "achievement") return <Award className="h-4 w-4 text-yellow-500" />
    if (category === "ai") return <Brain className="h-4 w-4 text-purple-500" />
    if (category === "learning") return <BookOpen className="h-4 w-4 text-blue-500" />
    if (category === "social") return <Users className="h-4 w-4 text-green-500" />

    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50"
      case "achievement":
        return "border-l-yellow-500 bg-yellow-50"
      case "info":
        return "border-l-blue-500 bg-blue-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-l-4 ${getTypeColor(notification.type)} ${
                      !notification.read ? "bg-opacity-100" : "bg-opacity-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getIcon(notification.type, notification.category)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                        className="flex-shrink-0 h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex gap-2 mt-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs h-6"
                        >
                          Mark as read
                        </Button>
                      )}
                      {notification.actionUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-6 text-blue-600"
                          onClick={() => {
                            // Navigate to action URL
                            window.location.href = notification.actionUrl!
                          }}
                        >
                          View
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No notifications</p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  setNotifications(notifications.map((n) => ({ ...n, read: true })))
                }}
              >
                Mark all as read
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
