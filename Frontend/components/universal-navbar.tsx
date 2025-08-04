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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BookOpen,
  Bell,
  User,
  Settings,
  LogOut,
  Battery,
  WifiOff,
  Brain,
  Menu,
  Home,
  Users,
  FileText,
  HelpCircle,
  ChevronDown,
  Search,
  Globe,
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface UniversalNavbarProps {
  variant?: "public" | "authenticated"
}

export default function UniversalNavbar({ variant = "public" }: UniversalNavbarProps) {
  const [username, setUsername] = useState("")
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [isOnline, setIsOnline] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (variant === "authenticated") {
      const storedUsername = localStorage.getItem("username")
      const storedUserType = localStorage.getItem("userType") as "student" | "teacher"

      if (storedUsername) setUsername(storedUsername)
      if (storedUserType) setUserType(storedUserType)

      // Simulate battery drain
      const interval = setInterval(() => {
        setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 2))
      }, 30000)

      // Check online status
      const handleOnline = () => setIsOnline(true)
      const handleOffline = () => setIsOnline(false)

      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)

      return () => {
        clearInterval(interval)
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [variant])

  const handleLogout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("userType")
    router.push("/")
  }

  const isActivePath = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  const publicNavItems = [
    {
      title: "Platform",
      items: [
        { title: "Features", href: "/#features", description: "Discover our AI-powered learning features" },
        { title: "How it Works", href: "/#how-it-works", description: "Learn about our offline-first approach" },
        { title: "Pricing", href: "/#pricing", description: "Choose the right plan for you" },
        { title: "Demo", href: "/demo", description: "Try our platform with a live demo" },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Documentation", href: "/documentation", description: "Complete guides and tutorials" },
        { title: "Help Center", href: "/help", description: "Get support and find answers" },
        { title: "Community", href: "/community", description: "Connect with other educators" },
        { title: "Blog", href: "/blog", description: "Latest news and educational insights" },
      ],
    },
    {
      title: "Company",
      items: [
        { title: "About Us", href: "/company/about", description: "Our mission and story" },
        { title: "Careers", href: "/company/careers", description: "Join our team" },
        { title: "Contact", href: "/company/contact", description: "Get in touch with us" },
        { title: "Privacy", href: "/legal/privacy", description: "Privacy policy and data protection" },
      ],
    },
  ]

  const authenticatedNavItems =
    userType === "student"
      ? [
          { title: "Dashboard", href: "/student/dashboard", icon: Home },
          { title: "Subjects", href: "/student/subjects", icon: BookOpen },
          { title: "Quizzes", href: "/student/quiz", icon: FileText },
          { title: "AI Study", href: "/student/ai-study", icon: Brain },
          { title: "Reports", href: "/student/reports", icon: FileText },
        ]
      : [
          { title: "Dashboard", href: "/teacher/dashboard", icon: Home },
          { title: "Students", href: "/teacher/students", icon: Users },
          { title: "Content", href: "/teacher/content", icon: BookOpen },
          { title: "Analytics", href: "/teacher/analytics", icon: FileText },
          { title: "AI Assistant", href: "/teacher/ai-assistant", icon: Brain },
        ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">OfflineEdu</span>
          </Link>

          {/* Desktop Navigation */}
          {variant === "public" ? (
            <div className="hidden md:flex items-center space-x-6">
              <NavigationMenu>
                <NavigationMenuList>
                  {publicNavItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuTrigger className="text-sm font-medium">{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items.map((subItem) => (
                            <li key={subItem.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-1">
              {authenticatedNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActivePath(item.href) ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <Button variant="ghost" size="sm" onClick={() => setSearchOpen(!searchOpen)} className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Status Indicators (Authenticated Only) */}
            {variant === "authenticated" && (
              <div className="hidden lg:flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  <Brain className="h-3 w-3 mr-1" />
                  AI
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Battery className="h-3 w-3 mr-1" />
                  {Math.round(batteryLevel)}%
                </Badge>
                <Badge variant={isOnline ? "outline" : "destructive"} className="text-xs">
                  {isOnline ? <Globe className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
                  {isOnline ? "Online" : "Offline"}
                </Badge>
              </div>
            )}

            {/* Notifications (Authenticated Only) */}
            {variant === "authenticated" && (
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
            )}

            {/* User Menu or Auth Buttons */}
            {variant === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">
                        {username ? username.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{username || "User"}</p>
                      <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                    </div>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/${userType}/profile`}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/help">
                      <HelpCircle className="h-4 w-4 mr-2" />
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
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Mobile Search */}
                  <div className="flex items-center space-x-2 p-2 border rounded-lg">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input type="text" placeholder="Search..." className="flex-1 bg-transparent outline-none text-sm" />
                  </div>

                  {/* Mobile Navigation */}
                  {variant === "public" ? (
                    <div className="space-y-4">
                      {publicNavItems.map((section) => (
                        <div key={section.title} className="space-y-2">
                          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                            {section.title}
                          </h3>
                          <div className="space-y-1">
                            {section.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block p-2 rounded-lg hover:bg-accent transition-colors"
                              >
                                <div className="font-medium">{item.title}</div>
                                <div className="text-sm text-muted-foreground">{item.description}</div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t space-y-2">
                        <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="outline" className="w-full bg-transparent">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full">Get Started</Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Mobile Status */}
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{username}</p>
                            <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Badge variant="outline" className="text-xs">
                            <Brain className="h-3 w-3" />
                          </Badge>
                          <Badge variant={isOnline ? "outline" : "destructive"} className="text-xs">
                            {isOnline ? <Globe className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                          </Badge>
                        </div>
                      </div>

                      {/* Mobile Nav Items */}
                      <div className="space-y-1">
                        {authenticatedNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                              isActivePath(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        ))}
                      </div>

                      {/* Mobile Footer */}
                      <div className="pt-4 border-t space-y-1">
                        <Link
                          href={`/${userType}/profile`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/help"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          <HelpCircle className="h-4 w-4" />
                          <span>Help & Support</span>
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout()
                            setMobileMenuOpen(false)
                          }}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors text-red-600 w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
