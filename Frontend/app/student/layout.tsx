"use client"

import type React from "react"

import ProtectedLayout from "@/components/protected-layout"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedLayout allowedRoles={["student"]}>{children}</ProtectedLayout>
}
