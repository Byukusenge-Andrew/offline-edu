import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import DynamicNavbar from "@/components/dynamic-navbar"
import { AuthProvider } from "@/contexts/auth-context"

export const metadata: Metadata = {
  title: "OfflineEdu - AI-Powered Learning Platform",
  description: "Revolutionary offline-first educational platform with AI assistance",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          <DynamicNavbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
