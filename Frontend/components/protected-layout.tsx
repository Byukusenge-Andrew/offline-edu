"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function ProtectedLayout({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles: ("student" | "teacher")[]
}) {
  const { isAuthenticated, user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.userType && !allowedRoles.includes(user.userType)) {
      // If user is authenticated but not in the allowed role, redirect them
      // For simplicity, redirecting to home. A better approach might be an "unauthorized" page.
      router.push("/") 
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router])

  if (isLoading || !isAuthenticated || !user) {
    // You can render a loading spinner here
    return <div>Loading...</div>
  }
  
  if (!allowedRoles.includes(user.userType!)) {
    // Render loading or null while redirecting
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
