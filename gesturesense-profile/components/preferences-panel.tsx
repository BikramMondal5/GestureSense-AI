"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Mic, BookOpen, Hand, Bell, Zap } from "lucide-react"
import { ToggleSwitch } from "@/components/toggle-switch"

export function PreferencesPanel() {
  const [preferences, setPreferences] = useState({
    emotionDetection: true,
    voiceRecognition: false,
    autoLogSessions: true,
    personalizedGestures: true,
    criticalAlerts: true,
    advancedAnalytics: false,
  })

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const preferenceItems = [
    {
      key: "emotionDetection" as const,
      icon: Eye,
      title: "Emotion Detection",
      description: "Enable real-time emotion analysis during sessions",
    },
    {
      key: "voiceRecognition" as const,
      icon: Mic,
      title: "Voice Recognition",
      description: "Allow voice commands and audio input processing",
    },
    {
      key: "autoLogSessions" as const,
      icon: BookOpen,
      title: "Auto-Log Sessions",
      description: "Automatically save and track your interaction sessions",
    },
    {
      key: "personalizedGestures" as const,
      icon: Hand,
      title: "Personalized Gestures",
      description: "Learn and adapt to your unique gesture patterns",
    },
    {
      key: "criticalAlerts" as const,
      icon: Bell,
      title: "Critical Alert Notifications",
      description: "Receive important system and security notifications",
    },
    {
      key: "advancedAnalytics" as const,
      icon: Zap,
      title: "Advanced Analytics",
      description: "Enable detailed performance metrics and insights",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {preferenceItems.map((item) => {
        const Icon = item.icon
        return (
          <Card
            key={item.key}
            className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>
                </div>
                <ToggleSwitch checked={preferences[item.key]} onCheckedChange={() => handleToggle(item.key)} />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
