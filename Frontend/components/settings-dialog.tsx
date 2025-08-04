"use client"

import type React from "react"

import { useState } from "react"
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  User,
  Bell,
  Palette,
  Shield,
  Download,
  Wifi,
  Volume2,
  Moon,
  Sun,
  Globe,
  Battery,
  Smartphone,
} from "lucide-react"

interface SettingsDialogProps {
  trigger?: React.ReactNode
}

export function SettingsDialog({ trigger }: SettingsDialogProps) {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState({
    // Profile
    displayName: "John Doe",
    email: "john.doe@example.com",
    grade: "Grade 10",

    // Notifications
    pushNotifications: true,
    emailNotifications: false,
    studyReminders: true,
    achievementAlerts: true,
    weeklyReports: true,

    // Appearance
    theme: "system",
    fontSize: "medium",
    language: "en",
    colorScheme: "blue",

    // Learning
    aiAssistance: true,
    autoSave: true,
    offlineSync: true,
    studyGoalHours: 2,
    difficultyLevel: "adaptive",

    // Privacy
    dataCollection: true,
    analytics: false,
    shareProgress: false,

    // Performance
    videoQuality: "auto",
    downloadQuality: "high",
    cacheSize: 500,
    backgroundSync: true,

    // Audio
    soundEffects: true,
    voiceNarration: false,
    volume: 75,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Smartphone },
  ]

  const languages = [
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
    { value: "es", label: "Español" },
    { value: "ar", label: "العربية" },
    { value: "sw", label: "Kiswahili" },
  ]

  const colorSchemes = [
    { value: "blue", label: "Blue", color: "bg-blue-500" },
    { value: "green", label: "Green", color: "bg-green-500" },
    { value: "purple", label: "Purple", color: "bg-purple-500" },
    { value: "orange", label: "Orange", color: "bg-orange-500" },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
          <DialogDescription>Customize your learning experience and manage your preferences.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and account details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={settings.displayName}
                      onChange={(e) => handleSettingChange("displayName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleSettingChange("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select value={settings.grade} onValueChange={(value) => handleSettingChange("grade", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i} value={`Grade ${i + 1}`}>
                          Grade {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive and how.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications on your device</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="studyReminders">Study Reminders</Label>
                    <p className="text-sm text-gray-600">Daily reminders to study</p>
                  </div>
                  <Switch
                    id="studyReminders"
                    checked={settings.studyReminders}
                    onCheckedChange={(checked) => handleSettingChange("studyReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="achievementAlerts">Achievement Alerts</Label>
                    <p className="text-sm text-gray-600">Notifications for new achievements</p>
                  </div>
                  <Switch
                    id="achievementAlerts"
                    checked={settings.achievementAlerts}
                    onCheckedChange={(checked) => handleSettingChange("achievementAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyReports">Weekly Progress Reports</Label>
                    <p className="text-sm text-gray-600">Weekly summary of your progress</p>
                  </div>
                  <Switch
                    id="weeklyReports"
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => handleSettingChange("weeklyReports", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>Customize the look and feel of your learning environment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {themes.map((theme) => (
                      <Button
                        key={theme.value}
                        variant={settings.theme === theme.value ? "default" : "outline"}
                        className="flex items-center gap-2 h-12"
                        onClick={() => handleSettingChange("theme", theme.value)}
                      >
                        <theme.icon className="h-4 w-4" />
                        {theme.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Color Scheme</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {colorSchemes.map((scheme) => (
                      <Button
                        key={scheme.value}
                        variant={settings.colorScheme === scheme.value ? "default" : "outline"}
                        className="flex items-center gap-2 h-12"
                        onClick={() => handleSettingChange("colorScheme", scheme.value)}
                      >
                        <div className={`w-4 h-4 rounded-full ${scheme.color}`} />
                        {scheme.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Select value={settings.fontSize} onValueChange={(value) => handleSettingChange("fontSize", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="extra-large">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="language" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Language
                  </Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>Customize your learning experience and study settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="aiAssistance">AI Study Assistant</Label>
                    <p className="text-sm text-gray-600">Enable AI-powered learning assistance</p>
                  </div>
                  <Switch
                    id="aiAssistance"
                    checked={settings.aiAssistance}
                    onCheckedChange={(checked) => handleSettingChange("aiAssistance", checked)}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Daily Study Goal (hours)</Label>
                  <div className="px-3">
                    <Slider
                      value={[settings.studyGoalHours]}
                      onValueChange={(value) => handleSettingChange("studyGoalHours", value[0])}
                      max={8}
                      min={0.5}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>30 min</span>
                      <span>{settings.studyGoalHours} hours</span>
                      <span>8 hours</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Difficulty Level</Label>
                  <Select
                    value={settings.difficultyLevel}
                    onValueChange={(value) => handleSettingChange("difficultyLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="adaptive">Adaptive (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoSave">Auto-save Progress</Label>
                    <p className="text-sm text-gray-600">Automatically save your progress</p>
                  </div>
                  <Switch
                    id="autoSave"
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Audio Volume
                  </Label>
                  <div className="px-3">
                    <Slider
                      value={[settings.volume]}
                      onValueChange={(value) => handleSettingChange("volume", value[0])}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Mute</span>
                      <span>{settings.volume}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control your data and privacy settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dataCollection">Data Collection</Label>
                    <p className="text-sm text-gray-600">Allow collection of usage data to improve the platform</p>
                  </div>
                  <Switch
                    id="dataCollection"
                    checked={settings.dataCollection}
                    onCheckedChange={(checked) => handleSettingChange("dataCollection", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">Analytics</Label>
                    <p className="text-sm text-gray-600">Share anonymous analytics data</p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={settings.analytics}
                    onCheckedChange={(checked) => handleSettingChange("analytics", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="shareProgress">Share Progress</Label>
                    <p className="text-sm text-gray-600">Allow teachers to view your detailed progress</p>
                  </div>
                  <Switch
                    id="shareProgress"
                    checked={settings.shareProgress}
                    onCheckedChange={(checked) => handleSettingChange("shareProgress", checked)}
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="space-y-3">
                    <h4 className="font-medium">Data Management</h4>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                      <Button variant="outline" size="sm">
                        Clear Cache
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="h-5 w-5" />
                  Performance & Storage
                </CardTitle>
                <CardDescription>Optimize app performance and manage offline content.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="offlineSync" className="flex items-center gap-2">
                      <Wifi className="h-4 w-4" />
                      Offline Sync
                    </Label>
                    <p className="text-sm text-gray-600">Automatically sync content for offline use</p>
                  </div>
                  <Switch
                    id="offlineSync"
                    checked={settings.offlineSync}
                    onCheckedChange={(checked) => handleSettingChange("offlineSync", checked)}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Video Quality</Label>
                  <Select
                    value={settings.videoQuality}
                    onValueChange={(value) => handleSettingChange("videoQuality", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (360p)</SelectItem>
                      <SelectItem value="medium">Medium (720p)</SelectItem>
                      <SelectItem value="high">High (1080p)</SelectItem>
                      <SelectItem value="auto">Auto (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Download Quality</Label>
                  <Select
                    value={settings.downloadQuality}
                    onValueChange={(value) => handleSettingChange("downloadQuality", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Save Space)</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High (Best Quality)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Cache Size Limit (MB)</Label>
                  <div className="px-3">
                    <Slider
                      value={[settings.cacheSize]}
                      onValueChange={(value) => handleSettingChange("cacheSize", value[0])}
                      max={2000}
                      min={100}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>100 MB</span>
                      <span>{settings.cacheSize} MB</span>
                      <span>2 GB</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="space-y-3">
                    <h4 className="font-medium">Storage Management</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span>Downloaded Content:</span>
                        <Badge variant="outline">1.2 GB</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Cache:</span>
                        <Badge variant="outline">245 MB</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>User Data:</span>
                        <Badge variant="outline">12 MB</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <Badge>1.46 GB</Badge>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        Clear Cache
                      </Button>
                      <Button variant="outline" size="sm">
                        Manage Downloads
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
