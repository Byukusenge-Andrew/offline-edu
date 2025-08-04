"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  BookOpen,
  Users,
  BarChart3,
  Brain,
  FileText,
  Award,
  User,
  GraduationCap,
  Calculator,
  Beaker,
  Globe,
  Home,
  MessageSquare,
  HelpCircle,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Navigation items for students
const studentNavItems = [
  {
    title: "Dashboard",
    url: "/student/dashboard",
    icon: Home,
  },
  {
    title: "AI Study Assistant",
    url: "/student/ai-study",
    icon: Brain,
  },
  {
    title: "Mathematics",
    url: "/student/subject/math",
    icon: Calculator,
  },
  {
    title: "Science",
    url: "/student/subject/science",
    icon: Beaker,
  },
  {
    title: "English",
    url: "/student/subject/language",
    icon: Globe,
  },
  {
    title: "Quiz Center",
    url: "/student/quiz",
    icon: FileText,
  },
  {
    title: "Reports",
    url: "/student/reports",
    icon: BarChart3,
  },
  {
    title: "Certificates",
    url: "/student/certificates",
    icon: Award,
  },
  {
    title: "Profile",
    url: "/student/profile",
    icon: User,
  },
]

// Navigation items for teachers
const teacherNavItems = [
  {
    title: "Dashboard",
    url: "/teacher/dashboard",
    icon: Home,
  },
  {
    title: "Students",
    url: "/teacher/students",
    icon: Users,
  },
  {
    title: "AI Assistant",
    url: "/teacher/ai-assistant",
    icon: Brain,
  },
  {
    title: "Content Library",
    url: "/teacher/content",
    icon: BookOpen,
  },
  {
    title: "AI Grading",
    url: "/teacher/grading",
    icon: GraduationCap,
  },
  {
    title: "Analytics",
    url: "/teacher/analytics",
    icon: BarChart3,
  },
]

const supportItems = [
  {
    title: "Help Center",
    url: "/help",
    icon: HelpCircle,
  },
  {
    title: "Contact Support",
    url: "/support",
    icon: MessageSquare,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const pathname = usePathname()
  const [userType, setUserType] = React.useState<"student" | "teacher" | null>(null)
  const [username, setUsername] = React.useState("")

  React.useEffect(() => {
    const storedUserType = localStorage.getItem("userType") as "student" | "teacher"
    const storedUsername = localStorage.getItem("username") || ""
    setUserType(storedUserType)
    setUsername(storedUsername)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("username")
    router.push("/")
  }

  const navItems = userType === "student" ? studentNavItems : teacherNavItems

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <BookOpen className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">OfflineEdu</span>
                  <span className="truncate text-xs">Learning Platform</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {username ? username.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{username || "User"}</span>
                  <span className="truncate text-xs capitalize">{userType || "Guest"}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-auto h-6 w-6 p-0">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
