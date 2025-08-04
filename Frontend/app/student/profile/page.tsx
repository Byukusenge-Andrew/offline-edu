"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { User, Mail, Calendar, BookOpen, Trophy, Settings, Bell, Shield, Smartphone, Globe } from "lucide-react"

export default function ProfilePage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [offlineSync, setOfflineSync] = useState(true)

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || ""
    setUsername(storedUsername)
    setEmail(`${storedUsername}@example.com`)
    setBio("Passionate learner exploring mathematics and science through AI-powered education.")
    setLocation("New York, USA")
  }, [])

  const achievements = [
    { title: "Math Master", description: "Completed all algebra modules", icon: Trophy, color: "text-yellow-500" },
    { title: "Quick Learner", description: "Finished 5 lessons in one day", icon: BookOpen, color: "text-blue-500" },
    { title: "Perfect Score", description: "100% on Science Quiz", icon: Trophy, color: "text-green-500" },
    { title: "Consistent", description: "7-day learning streak", icon: Calendar, color: "text-purple-500" },
  ]

  const learningStats = [
    { label: "Lessons Completed", value: "44", icon: BookOpen },
    { label: "Certificates Earned", value: "8", icon: Trophy },
    { label: "Study Hours", value: "127", icon: Calendar },
    { label: "Average Score", value: "92%", icon: Trophy },
  ]

  const handleSave = () => {
    localStorage.setItem("username", username)
    // In a real app, this would save to a backend
    alert("Profile updated successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and learning preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details and bio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">
                    {username ? username.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="min-h-20"
                />
              </div>

              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="size-5" />
                Preferences
              </CardTitle>
              <CardDescription>Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="size-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-600">Receive notifications about your progress</p>
                  </div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="size-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Offline Sync</p>
                    <p className="text-sm text-gray-600">Automatically sync content for offline use</p>
                  </div>
                </div>
                <Switch checked={offlineSync} onCheckedChange={setOfflineSync} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="size-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-gray-600">Choose your preferred language</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  English
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="size-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Privacy Mode</p>
                    <p className="text-sm text-gray-600">Hide your activity from other users</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Learning Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Stats</CardTitle>
              <CardDescription>Your learning journey at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className="size-4 text-gray-500" />
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <span className="font-semibold">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest accomplishments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <achievement.icon className={`size-6 ${achievement.color}`} />
                  <div>
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Shield className="size-4 mr-2" />
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="size-4 mr-2" />
                Email Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
