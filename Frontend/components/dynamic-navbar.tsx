"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import UniversalNavbar from "@/components/universal-navbar"

export default function DynamicNavbar() {
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()

  // Don't render navbar on auth pages
  if (pathname.startsWith("/auth")) {
    return null
  }

  // Don't render navbar on protected student and teacher pages (they have their own sidebar)
  if (pathname.startsWith("/student") || pathname.startsWith("/teacher")) {
    return null
  }

  // Prevents hydration mismatch and waits for auth state to be determined
  if (isLoading) {
    return null
  }

  return <UniversalNavbar variant={isAuthenticated ? "authenticated" : "public"} />
}
