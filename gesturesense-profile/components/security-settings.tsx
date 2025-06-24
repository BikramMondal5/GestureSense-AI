"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Lock, Trash2, AlertTriangle } from "lucide-react"
import { ToggleSwitch } from "@/components/toggle-switch"

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Account Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="alex.smith@email.com"
                className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
              </div>
            </div>
            <ToggleSwitch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>

          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
            Update Security Settings
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-400 text-sm">
            Once you delete your account, there is no going back. Please be certain.
          </p>

          {!showDeleteConfirm ? (
            <Button
              variant="outline"
              className="bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-red-400 text-sm font-medium">Are you absolutely sure? This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="bg-slate-700/50 border-slate-600 text-slate-300"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white">Yes, Delete My Account</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
