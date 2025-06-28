"use client"

import { ErrorBoundary } from "@/components/error-boundary"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
}