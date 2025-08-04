"use client"

import type React from "react"

import ProtectedLayout from "@/components/protected-layout"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedLayout allowedRoles={["teacher"]}>{children}</ProtectedLayout>
}
