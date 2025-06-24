"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingUp, Clock, Hand, Heart, Zap } from "lucide-react"

export function ActivitySummary() {
  const stats = [
    {
      icon: Activity,
      label: "Total Sessions",
      value: "127",
      change: "+12 this week",
      color: "text-blue-400",
    },
    {
      icon: Hand,
      label: "Most Used Gesture",
      value: "Wave",
      change: "34% of sessions",
      color: "text-purple-400",
    },
    {
      icon: Heart,
      label: "Recent Emotion Trend",
      value: "😊 Happy",
      change: "Trending positive",
      color: "text-green-400",
    },
    {
      icon: Clock,
      label: "Last Login",
      value: "2 hours ago",
      change: "Active today",
      color: "text-yellow-400",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Activity Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-slate-300 text-sm font-medium">{stat.label}</span>
                  </div>
                  <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.change}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            Emotion Trend Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 bg-slate-700/30 rounded-lg">
            <div className="flex items-center gap-2 text-4xl">😊 📈 😌 💪 🎯</div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-slate-400 text-sm">
              Your emotional journey over the past 7 days shows consistent positivity
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
