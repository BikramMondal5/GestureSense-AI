"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, Mail, Calendar, Zap, Edit3, LogOut, ArrowLeft } from "lucide-react"

// Profile components
function ProfileHeader() {
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

function UserInfoCard() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <Avatar className="w-24 h-24 relative border-2 border-slate-600">
              <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold">
                BM
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
            <h3 className="text-xl font-semibold text-white">Bikram Mondal</h3>
            <Badge className="mt-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white">Premium User</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-300">
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="text-sm">bikram@gesturesense.ai</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Joined March 2025</span>
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

function ActivitySummary() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
        
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start gap-4 border-b border-slate-700/50 pb-4">
              <div className={`w-2 h-2 mt-2 rounded-full ${
                i % 3 === 0 ? "bg-green-500" : i % 3 === 1 ? "bg-blue-500" : "bg-purple-500"
              }`}></div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-white text-sm font-medium">
                    {i % 3 === 0 
                      ? "Detected hand gesture" 
                      : i % 3 === 1 
                        ? "Recognized facial emotion" 
                        : "Speech recognition enabled"}
                  </p>
                  <Badge variant="outline" className="text-xs text-slate-400 border-slate-700">
                    {i % 3 === 0 
                      ? "👋 Wave" 
                      : i % 3 === 1 
                        ? "😊 Happy" 
                        : "🎤 Voice"}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {`${i} hour${i === 1 ? '' : 's'} ago`} • Confidence: {90 - i * 5}%
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Button variant="link" className="text-blue-400 hover:text-blue-300">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PreferencesPanel() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-white mb-6">User Preferences</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Simplified preferences for this example */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300">Detection Settings</h4>
              <div className="space-y-2">
                {["Hand Gesture Detection", "Facial Emotion Recognition", "Speech Recognition", "Notifications"].map((pref) => (
                  <div key={pref} className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">{pref}</span>
                    <div className="w-12 h-6 bg-slate-700/50 rounded-full relative">
                      <div className="absolute right-0 top-0 w-6 h-6 bg-blue-500 rounded-full shadow-lg transform translate-x-0"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300">Interface Settings</h4>
              <div className="space-y-2">
                {["Dark Mode", "High Contrast", "Reduced Motion", "Language: English"].map((pref) => (
                  <div key={pref} className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">{pref}</span>
                    <div className={`w-12 h-6 ${pref === "Language: English" ? "bg-slate-700/50" : "bg-slate-700/50"} rounded-full relative`}>
                      {pref !== "Language: English" && (
                        <div className={`absolute ${pref === "Dark Mode" ? "right-0" : "left-0"} top-0 w-6 h-6 ${
                          pref === "Dark Mode" ? "bg-blue-500" : "bg-slate-600"
                        } rounded-full shadow-lg`}></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SecuritySettings() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-white mb-6">Security Settings</h3>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-slate-300">Change Password</h4>
            <div className="grid gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Current Password</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-md py-2 px-3 text-white text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your current password"
                />
              </div>
              
              <div>
                <label className="text-xs text-slate-400 mb-1 block">New Password</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-md py-2 px-3 text-white text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter a new password"
                />
              </div>
              
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Confirm New Password</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-md py-2 px-3 text-white text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Confirm your new password"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <h4 className="text-sm font-medium text-slate-300">Two-Factor Authentication</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Enable 2FA</span>
              <div className="w-12 h-6 bg-slate-700/50 rounded-full relative">
                <div className="absolute right-0 top-0 w-6 h-6 bg-blue-500 rounded-full shadow-lg transform translate-x-0"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <h4 className="text-sm font-medium text-slate-300">Sessions</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-slate-900/30 rounded-md">
                <div>
                  <p className="text-sm text-white">Current Session</p>
                  <p className="text-xs text-slate-400">Windows • Chrome • Jun 25, 2025</p>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/20">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-slate-900/30 rounded-md">
                <div>
                  <p className="text-sm text-white">Mobile Device</p>
                  <p className="text-xs text-slate-400">iOS • Safari • Jun 24, 2025</p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            Save Security Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link href="/dashboard" className="inline-flex items-center text-slate-400 hover:text-white transition-all duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        
        <ProfileHeader />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Preferences
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <UserInfoCard />
              </div>
              <div className="lg:col-span-2">
                <ActivitySummary />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <PreferencesPanel />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}