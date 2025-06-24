"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Camera, Mail, Calendar, Zap } from "lucide-react"

export function UserInfoCard() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <Avatar className="w-24 h-24 relative border-2 border-slate-600">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold">
                AS
              </AvatarFallback>
            </Avatar>
          </div>

          <Button variant="ghost" size="sm" className="mt-3 text-slate-400 hover:text-white hover:bg-slate-700/50">
            <Camera className="w-4 h-4 mr-2" />
            Change Avatar
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-white">Alex Smith</h3>
            <Badge className="mt-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white">Premium User</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-300">
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="text-sm">alex.smith@email.com</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Joined March 2024</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Gesture + Emotion Mode</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/50">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">127</div>
                <div className="text-xs text-slate-400">Sessions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-xs text-slate-400">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
