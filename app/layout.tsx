import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/lib/contexts/user-context"
import { initializeApp } from "@/lib/init"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GestureSense AI - Real-Time Gesture & Emotion Recognition",
  description:
    "Advanced AI-powered system for detecting hand gestures and facial emotions in real-time using cutting-edge machine learning.",
    generator: 'v0.dev'
}

// Initialize the app in development
if (process.env.NODE_ENV === 'development') {
  initializeApp()
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen")}>
        <ThemeProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
