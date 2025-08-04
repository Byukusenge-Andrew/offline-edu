"use client"

import type React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Navbar from "@/components/navbar"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
