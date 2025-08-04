import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import DynamicNavbar from "@/components/dynamic-navbar"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={inter.className}>
        <AuthProvider>
          <DynamicNavbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
