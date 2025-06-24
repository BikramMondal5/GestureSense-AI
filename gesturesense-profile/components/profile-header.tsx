"use client"

import { Button } from "@/components/ui/button"
import { Edit3, LogOut } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span className="text-2xl">👤</span>
          My Profile
        </h1>
        <p className="text-slate-400 mt-2">Manage your personal details, preferences, and activity.</p>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-slate-500 transition-all duration-300"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
        <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-red-500/25 transition-all duration-300">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
