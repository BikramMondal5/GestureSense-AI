"use client"

import { useState, useRef, useEffect, ChangeEvent } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { 
  Camera, 
  Mail, 
  Calendar, 
  Zap, 
  Edit3, 
  LogOut, 
  ArrowLeft, 
  User, 
  Briefcase, 
  MapPin, 
  Globe, 
  Twitter, 
  Github, 
  Linkedin,
  Lock,
  Shield,
  Key,
  Smartphone,
  Trash2,
  Check,
  AlertCircle,
  Save,
  RefreshCw,
  X,
  Upload
} from "lucide-react"
import { getUserProfile, updateUserProfile, updateUserPreferences, updateUserSecurity } from "@/lib/utils"
import { useUser } from "@/lib/contexts/user-context"
import { LoadingState } from "@/components/loading-state"
import { ComponentLoader } from "@/components/component-loader"

interface Session {
  device: string
  browser: string
  date: string
  isActive: boolean
}

interface Security {
  twoFactorEnabled: boolean
  lastPasswordChange: string
  sessions: Session[]
}

interface Preferences {
  handGestureDetection: boolean
  facialEmotionRecognition: boolean
  speechRecognition: boolean
  notifications: boolean
  darkMode: boolean
  highContrast: boolean
  reducedMotion: boolean
  language: string
}

interface UserData {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  bio: string
  location: string
  website: string
  company: string
  joinDate: string
  twitterHandle: string
  githubHandle: string
  linkedinHandle: string
  sessions: number
  accuracy: number
  mode: string
  preferences: Preferences
  security: Security
}

interface Activity {
  id: string
  type: "gesture" | "emotion" | "speech"
  content: string
  confidence: number
  timestamp: Date
}

interface ComponentProps {
  userData: UserData;
  onOpenEditDialog: () => void;
  onAvatarClick: () => void;
  activity: Activity[];
  preferences: Preferences;
  onPreferenceChange: (prefs: Preferences) => void;
  security: Security;
  onSecurityChange: (security: Partial<Security>, type?: 'password' | 'twoFactor' | 'session' | 'general') => void;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

// Mock activity data for now since we don't have activity API yet
const mockActivity: Activity[] = [
  { id: "act1", type: "gesture", content: "Wave", confidence: 95, timestamp: new Date(Date.now() - 3600000) },
  { id: "act2", type: "emotion", content: "Happy", confidence: 89, timestamp: new Date(Date.now() - 7200000) },
  { id: "act3", type: "speech", content: "Voice Command", confidence: 92, timestamp: new Date(Date.now() - 10800000) },
  { id: "act4", type: "gesture", content: "Thumbs Up", confidence: 97, timestamp: new Date(Date.now() - 14400000) },
  { id: "act5", type: "emotion", content: "Surprised", confidence: 85, timestamp: new Date(Date.now() - 18000000) },
]

// Profile components
function ProfileHeader({ userData, onOpenEditDialog }: Pick<ComponentProps, "userData" | "onOpenEditDialog">) {
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
          onClick={onOpenEditDialog}
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

function UserInfoCard({ userData, onAvatarClick }: Pick<ComponentProps, "userData" | "onAvatarClick">) {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <Avatar className="w-24 h-24 relative border-2 border-slate-600" onClick={onAvatarClick}>
              <AvatarImage src={userData.avatar} alt="Profile" />
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
            <h3 className="text-xl font-semibold text-white">{userData.name}</h3>
            <Badge className="mt-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white">{userData.role}</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-300">
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="text-sm">{userData.email}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Joined {userData.joinDate}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm">{userData.mode} Mode</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/50">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{userData.sessions}</div>
                <div className="text-xs text-slate-400">Sessions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{userData.accuracy}%</div>
                <div className="text-xs text-slate-400">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ActivitySummary({ activity }: Pick<ComponentProps, "activity">) {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
        
        <div className="space-y-4">
          {activity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 border-b border-slate-700/50 pb-4">
              <div className={`w-2 h-2 mt-2 rounded-full ${
                activity.type === "gesture" ? "bg-green-500" : activity.type === "emotion" ? "bg-blue-500" : "bg-purple-500"
              }`}></div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-white text-sm font-medium">
                    {activity.type === "gesture" 
                      ? "Detected hand gesture" 
                      : activity.type === "emotion" 
                        ? "Recognized facial emotion" 
                        : "Speech recognition enabled"}
                  </p>
                  <Badge variant="outline" className="text-xs text-slate-400 border-slate-700">
                    {activity.type === "gesture" 
                      ? "👋 Wave" 
                      : activity.type === "emotion" 
                        ? "😊 Happy" 
                        : "🎤 Voice"}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {`${Math.floor((Date.now() - activity.timestamp.getTime()) / 3600000)} hour${Math.floor((Date.now() - activity.timestamp.getTime()) / 3600000) === 1 ? '' : 's'} ago`} • Confidence: {activity.confidence}%
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

function PreferencesPanel({ preferences, onPreferenceChange }: Pick<ComponentProps, "preferences" | "onPreferenceChange">) {
  const [localPreferences, setLocalPreferences] = useState(preferences)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  const handleToggle = (key: keyof typeof localPreferences) => {
    setLocalPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleLanguageChange = (value: string) => {
    setLocalPreferences(prev => ({
      ...prev,
      language: value
    }))
  }

  const handleSavePreferences = async () => {
    setIsSaving(true)
    await onPreferenceChange(localPreferences)
    setIsSaving(false)
  }

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-white mb-6">System Preferences</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Hand Gesture Detection</Label>
              <p className="text-sm text-slate-400">Enable real-time hand gesture recognition</p>
            </div>
            <Switch
              checked={localPreferences.handGestureDetection}
              onCheckedChange={() => handleToggle('handGestureDetection')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Facial Emotion Recognition</Label>
              <p className="text-sm text-slate-400">Enable real-time facial expression analysis</p>
            </div>
            <Switch
              checked={localPreferences.facialEmotionRecognition}
              onCheckedChange={() => handleToggle('facialEmotionRecognition')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Speech Recognition</Label>
              <p className="text-sm text-slate-400">Enable voice commands and speech input</p>
            </div>
            <Switch
              checked={localPreferences.speechRecognition}
              onCheckedChange={() => handleToggle('speechRecognition')}
            />
          </div>

          <Separator className="bg-slate-700" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Dark Mode</Label>
              <p className="text-sm text-slate-400">Use dark color scheme</p>
            </div>
            <Switch
              checked={localPreferences.darkMode}
              onCheckedChange={() => handleToggle('darkMode')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">High Contrast</Label>
              <p className="text-sm text-slate-400">Increase contrast for better visibility</p>
            </div>
            <Switch
              checked={localPreferences.highContrast}
              onCheckedChange={() => handleToggle('highContrast')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Reduced Motion</Label>
              <p className="text-sm text-slate-400">Minimize animations and transitions</p>
            </div>
            <Switch
              checked={localPreferences.reducedMotion}
              onCheckedChange={() => handleToggle('reducedMotion')}
            />
          </div>

          <Separator className="bg-slate-700" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Notifications</Label>
              <p className="text-sm text-slate-400">Enable system notifications</p>
            </div>
            <Switch
              checked={localPreferences.notifications}
              onCheckedChange={() => handleToggle('notifications')}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Language</Label>
            <Select
              value={localPreferences.language}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-full bg-slate-800 border-slate-700">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="Chinese">Chinese</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSavePreferences}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <ComponentLoader size="sm" className="mr-2" />
                Saving...
              </>
            ) : (
              'Save Preferences'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SecuritySettings({ security, onSecurityChange }: Pick<ComponentProps, "security" | "onSecurityChange">) {
  const [localSecurity, setLocalSecurity] = useState(security)
  const [isSaving, setIsSaving] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isRevokingSession, setIsRevokingSession] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setLocalSecurity(security)
  }, [security])

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "All password fields are required",
        variant: "destructive"
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      })
      return
    }

    setIsSaving(true)
    try {
      await onSecurityChange({
        lastPasswordChange: new Date().toISOString()
      }, 'password')
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleTwoFactorToggle = async () => {
    setIsSaving(true)
    try {
      await onSecurityChange({
        twoFactorEnabled: !localSecurity.twoFactorEnabled
      }, 'twoFactor')
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRevokeSession = async (sessionDate: string) => {
    setIsRevokingSession(sessionDate)
    try {
      const updatedSessions = localSecurity.sessions.map(session =>
        session.date === sessionDate 
          ? { ...session, isActive: false }
          : session
      )
      await onSecurityChange({
        sessions: updatedSessions
      }, 'session')
    } catch (err) {
      console.error(err)
    } finally {
      setIsRevokingSession(null)
    }
  }

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-white mb-6">Security Settings</h3>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-slate-300">Change Password</h4>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="currentPassword" className="text-xs text-slate-400 mb-1">Current Password</Label>
                <Input 
                  id="currentPassword"
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white"
                  placeholder="Enter your current password"
                />
              </div>
              
              <div>
                <Label htmlFor="newPassword" className="text-xs text-slate-400 mb-1">New Password</Label>
                <Input 
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white"
                  placeholder="Enter a new password"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword" className="text-xs text-slate-400 mb-1">Confirm New Password</Label>
                <Input 
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white"
                  placeholder="Confirm your new password"
                />
              </div>
              
              <Button
                onClick={handlePasswordChange}
                disabled={isSaving || !currentPassword || !newPassword || !confirmPassword}
                className="w-fit"
              >
                {isSaving ? (
                  <>
                    <ComponentLoader size="sm" className="mr-2" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4 mr-2" />
                    Update Password
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <h4 className="text-sm font-medium text-slate-300">Two-Factor Authentication</h4>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Enable 2FA</Label>
                <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
              </div>
              <Switch
                checked={localSecurity.twoFactorEnabled}
                onCheckedChange={handleTwoFactorToggle}
                disabled={isSaving}
              />
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <h4 className="text-sm font-medium text-slate-300">Active Sessions</h4>
            <div className="space-y-2">
              {localSecurity.sessions.map((session) => (
                <div key={session.date} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-md">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{session.device}</span>
                      {session.isActive && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">
                      <span>{session.browser}</span>
                      <span className="mx-2">•</span>
                      <span>Last active: {session.date}</span>
                    </div>
                  </div>
                  {session.isActive ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevokeSession(session.date)}
                      disabled={isRevokingSession === session.date}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      {isRevokingSession === session.date ? (
                        <ComponentLoader size="sm" />
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Revoke
                        </>
                      )}
                    </Button>
                  ) : (
                    <Badge variant="outline" className="text-slate-400 border-slate-600">
                      Inactive
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Avatar Upload Dialog Component
function AvatarUploadDialog({ isOpen, onClose, onSave }: Pick<ComponentProps, "isOpen" | "onClose" | "onSave">) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!preview) return;
    
    setIsUploading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // On successful upload
    onSave(preview);
    setIsUploading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Update Profile Picture</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-4 py-4">
          {preview ? (
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-75"></div>
              <img 
                src={preview} 
                alt="Profile preview" 
                className="relative w-32 h-32 object-cover rounded-full border-2 border-slate-600"
              />
            </div>
          ) : (
            <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center border-2 border-dashed border-slate-600">
              <User className="w-16 h-16 text-slate-600" />
            </div>
          )}
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="border-slate-600">
              <Upload className="w-4 h-4 mr-2" />
              {preview ? "Change Image" : "Select Image"}
            </Button>
            
            {preview && (
              <Button variant="destructive" onClick={() => setPreview(null)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            )}
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleUpload}
            disabled={!preview || isUploading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isUploading ? (
              <>
                <ComponentLoader size="sm" className="mr-2" />
                Uploading...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Edit Profile Dialog Component
function EditProfileDialog({ isOpen, onClose, userData, onSave }: Pick<ComponentProps, "isOpen" | "onClose" | "userData" | "onSave">) {
  const [formData, setFormData] = useState({...userData});
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setFormData({...userData});
    }
  }, [isOpen, userData]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    onSave(formData);
    setIsSaving(false);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-slate-300">Full Name</Label>
            <Input 
              id="name" 
              name="name"
              value={formData.name || ''} 
              onChange={handleChange}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input 
              id="email" 
              name="email"
              value={formData.email || ''} 
              onChange={handleChange}
              className="bg-slate-800 border-slate-700 text-white"
              disabled
            />
            <p className="text-xs text-slate-500">Email cannot be changed</p>
          </div>
          
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="bio" className="text-slate-300">Bio</Label>
            <Textarea 
              id="bio" 
              name="bio"
              value={formData.bio || ''} 
              onChange={handleChange}
              className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
              placeholder="Tell us about yourself"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="company" className="text-slate-300">Company</Label>
            <Input 
              id="company" 
              name="company"
              value={formData.company || ''} 
              onChange={handleChange}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="location" className="text-slate-300">Location</Label>
            <Input 
              id="location" 
              name="location"
              value={formData.location || ''} 
              onChange={handleChange}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="website" className="text-slate-300">Website</Label>
            <Input 
              id="website" 
              name="website"
              value={formData.website || ''} 
              onChange={handleChange}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="twitterHandle" className="text-slate-300">Twitter</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">@</span>
              <Input 
                id="twitterHandle" 
                name="twitterHandle"
                value={formData.twitterHandle?.replace('@', '') || ''} 
                onChange={(e) => {
                  const newValue = e.target.value ? `@${e.target.value.replace('@', '')}` : ''
                  handleChange({
                    ...e,
                    target: {
                      ...e.target,
                      name: 'twitterHandle',
                      value: newValue
                    }
                  })
                }}
                className="bg-slate-800 border-slate-700 text-white pl-8"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="githubHandle" className="text-slate-300">GitHub Username</Label>
            <Input 
              id="githubHandle" 
              name="githubHandle"
              value={formData.githubHandle || ''} 
              onChange={handleChange}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="linkedinHandle" className="text-slate-300">LinkedIn Username</Label>
            <Input 
              id="linkedinHandle" 
              name="linkedinHandle"
              value={formData.linkedinHandle || ''} 
              onChange={handleChange}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-slate-400">Cancel</Button>
          <Button 
            onClick={handleSave} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <ComponentLoader size="sm" className="mr-2" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activityData, setActivityData] = useState<Activity[]>(mockActivity)
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)
  const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false)
  const [isSavingAvatar, setIsSavingAvatar] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPreferences, setIsSavingPreferences] = useState(false)
  const [isSavingSecurity, setIsSavingSecurity] = useState(false)
  
  const { user: userData, isLoading, error, refreshUser } = useUser()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  // Sync theme with user preferences on initial load
  useEffect(() => {
    if (userData?.preferences?.darkMode && theme !== "dark") {
      setTheme("dark")
    } else if (!userData?.preferences?.darkMode && theme !== "light") {
      setTheme("light")
    }
  }, [userData?.preferences?.darkMode, theme, setTheme])

  // Handle loading states and error display
  if (isLoading) {
    return <LoadingState message="Loading profile..." />
  }

  if (error || !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="p-6 rounded-lg border bg-background">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <h3 className="font-medium">{error ? "Error" : "No Data"}</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || "Profile data not available"}
          </p>
        </div>
      </div>
    )
  }

  // Handle avatar change
  const handleAvatarChange = async (newAvatarUrl: string) => {
    if (!userData) return
    
    try {
      setIsSavingAvatar(true)
      await updateUserProfile(userData.id, {
        avatar: newAvatarUrl
      })
      await refreshUser()
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully",
      })
    } catch (err) {
      console.error("Failed to update avatar:", err)
      toast({
        title: "Error",
        description: "Failed to update avatar. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSavingAvatar(false)
      setIsAvatarDialogOpen(false)
    }
  }

  // Handle profile data update
  const handleProfileUpdate = async (updatedData: Partial<UserData>) => {
    if (!userData) return
    
    try {
      setIsSavingProfile(true)
      await updateUserProfile(userData.id, updatedData)
      await refreshUser()
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully",
      })
    } catch (err) {
      console.error("Failed to update profile:", err)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSavingProfile(false)
      setIsEditProfileDialogOpen(false)
    }
  }

  // Handle preferences update
  const handlePreferenceChange = async (updatedPreferences: Partial<Preferences>) => {
    if (!userData) return

    try {
      setIsSavingPreferences(true)
      await updateUserPreferences(userData.id, updatedPreferences)
      await refreshUser()
      
      // Sync theme if darkMode preference changed
      if ('darkMode' in updatedPreferences) {
        setTheme(updatedPreferences.darkMode ? 'dark' : 'light')
      }
      
      toast({
        title: "Preferences updated",
        description: "Your preferences have been updated successfully",
      })
    } catch (err) {
      console.error("Failed to update preferences:", err)
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSavingPreferences(false)
    }
  }

  // Handle security settings update
  const handleSecurityChange = async (updatedSecurity: Partial<Security>) => {
    if (!userData) return

    try {
      setIsSavingSecurity(true)
      await updateUserSecurity(userData.id, updatedSecurity)
      await refreshUser()
      toast({
        title: "Security settings updated",
        description: "Your security settings have been updated successfully",
      })
    } catch (err) {
      console.error("Failed to update security settings:", err)
      toast({
        title: "Error",
        description: "Failed to update security settings. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSavingSecurity(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ProfileHeader
          userData={userData}
          onOpenEditDialog={() => setIsEditProfileDialogOpen(true)}
        />

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
                <UserInfoCard
                  userData={userData}
                  onAvatarClick={() => setIsAvatarDialogOpen(true)}
                />
              </div>
              <div className="lg:col-span-2">
                <ActivitySummary activity={activityData} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <PreferencesPanel
              preferences={userData.preferences}
              onPreferenceChange={handlePreferenceChange}
            />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <SecuritySettings
              security={userData.security}
              onSecurityChange={handleSecurityChange}
            />
          </TabsContent>
        </Tabs>
      </div>

      <AvatarUploadDialog
        isOpen={isAvatarDialogOpen}
        onClose={() => setIsAvatarDialogOpen(false)}
        onSave={handleAvatarChange}
      />

      <EditProfileDialog
        isOpen={isEditProfileDialogOpen}
        onClose={() => setIsEditProfileDialogOpen(false)}
        userData={userData}
        onSave={handleProfileUpdate}
      />
    </div>
  )
}