"use client"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

// Mock user data - in a real app, this would come from an API or auth provider
const mockUserData = {
  id: "u123456",
  name: "Bikram Mondal",
  email: "bikram@gesturesense.ai",
  avatar: "/placeholder-user.jpg",
  role: "Premium User",
  bio: "AI enthusiast and technology professional with a focus on gesture recognition systems and computer vision.",
  location: "Kolkata, India",
  website: "https://mondalbikram.com",
  company: "GestureSense AI",
  joinDate: "March 2025",
  twitterHandle: "@bikramm",
  githubHandle: "BikramMondal5",
  linkedinHandle: "bikram-mondal",
  sessions: 127,
  accuracy: 89,
  lastLogin: "June 25, 2025",
  subscription: "Premium",
  subscriptionRenewal: "July 15, 2025",
  mode: "Gesture + Emotion",
  preferences: {
    handGestureDetection: true,
    facialEmotionRecognition: true,
    speechRecognition: true,
    notifications: true,
    darkMode: true,
    highContrast: false,
    reducedMotion: false,
    language: "English",
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: "May 10, 2025",
    sessions: [
      { device: "Windows", browser: "Chrome", date: "Jun 25, 2025", isActive: true },
      { device: "iOS", browser: "Safari", date: "Jun 24, 2025", isActive: false }
    ]
  }
};

// Mock activity data
const mockActivity = [
  { id: "act1", type: "gesture", content: "Wave", confidence: 95, timestamp: new Date(Date.now() - 3600000) },
  { id: "act2", type: "emotion", content: "Happy", confidence: 89, timestamp: new Date(Date.now() - 7200000) },
  { id: "act3", type: "speech", content: "Voice Command", confidence: 92, timestamp: new Date(Date.now() - 10800000) },
  { id: "act4", type: "gesture", content: "Thumbs Up", confidence: 97, timestamp: new Date(Date.now() - 14400000) },
  { id: "act5", type: "emotion", content: "Surprised", confidence: 85, timestamp: new Date(Date.now() - 18000000) },
]

// Profile components
function ProfileHeader({ userData, onOpenEditDialog }) {
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

function UserInfoCard({ userData, onAvatarClick }) {
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

function ActivitySummary({ activity }) {
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

function PreferencesPanel({ preferences, onPreferenceChange }) {
  const [localPreferences, setLocalPreferences] = useState(preferences)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
  }, [])

  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  const handleSavePreferences = () => {
    // Here you would usually make an API call to save the preferences
    onPreferenceChange(localPreferences)
  }

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
                      <div className={`absolute right-0 top-0 w-6 h-6 ${localPreferences[pref.replace(/ /g, "").toLowerCase()] ? "bg-blue-500" : "bg-slate-600"} rounded-full shadow-lg transform ${localPreferences[pref.replace(/ /g, "").toLowerCase()] ? "translate-x-0" : "translate-x-6"}`}></div>
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
          <Button onClick={handleSavePreferences} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SecuritySettings({ security, onSecurityChange }) {
  const [localSecurity, setLocalSecurity] = useState(security)
  const { toast } = useToast()

  useEffect(() => {
    setLocalSecurity(security)
  }, [security])

  const handleSaveSecurity = () => {
    // Here you would usually make an API call to save the security settings
    onSecurityChange(localSecurity)
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
                <div className={`absolute right-0 top-0 w-6 h-6 ${localSecurity.twoFactorEnabled ? "bg-blue-500" : "bg-slate-600"} rounded-full shadow-lg transform ${localSecurity.twoFactorEnabled ? "translate-x-0" : "translate-x-6"}`}></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <h4 className="text-sm font-medium text-slate-300">Sessions</h4>
            <div className="space-y-2">
              {localSecurity.sessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-900/30 rounded-md">
                  <div>
                    <p className="text-sm text-white">{session.device}</p>
                    <p className="text-xs text-slate-400">{session.browser} • {session.date}</p>
                  </div>
                  {session.isActive ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/20">Active</Badge>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSecurity} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            Save Security Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Avatar Upload Dialog Component
function AvatarUploadDialog({ isOpen, onClose, onSave }) {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
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
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
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
function EditProfileDialog({ isOpen, onClose, userData, onSave }) {
  const [formData, setFormData] = useState({...userData});
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setFormData({...userData});
    }
  }, [isOpen, userData]);
  
  const handleChange = (e) => {
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
                value={(formData.twitterHandle || '').replace('@', '')} 
                onChange={(e) => handleChange({
                  target: {
                    name: 'twitterHandle',
                    value: e.target.value ? `@${e.target.value.replace('@', '')}` : ''
                  }
                })}
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
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
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
  const [userData, setUserData] = useState(mockUserData)
  const [activityData, setActivityData] = useState(mockActivity)
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)
  const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  // Sync theme with user preferences on initial load
  useEffect(() => {
    if (userData.preferences.darkMode && theme !== "dark") {
      setTheme("dark")
    } else if (!userData.preferences.darkMode && theme !== "light") {
      setTheme("light")
    }
  }, [userData.preferences.darkMode, theme, setTheme])

  // Handle avatar change
  const handleAvatarChange = async (newAvatarUrl) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setUserData(prevData => ({
      ...prevData,
      avatar: newAvatarUrl
    }))
    
    setIsLoading(false)
    
    toast({
      title: "Avatar updated",
      description: "Your profile picture has been updated successfully",
    })
  }

  // Handle profile data update
  const handleProfileUpdate = async (updatedData) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setUserData(prevData => ({
      ...prevData,
      ...updatedData
    }))
    
    setIsLoading(false)
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    })
  }

  // Handle preference changes
  const handlePreferenceChange = async (preferences) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setUserData(prevData => ({
      ...prevData,
      preferences: preferences
    }))
    
    // Sync theme with preference
    if (preferences.darkMode && theme !== "dark") {
      setTheme("dark")
    } else if (!preferences.darkMode && theme !== "light") {
      setTheme("light")
    }
    
    setIsLoading(false)
    
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated successfully",
    })
  }

  // Handle security settings changes
  const handleSecurityChange = async (securityData, type = "general") => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setUserData(prevData => ({
      ...prevData,
      security: {
        ...prevData.security,
        ...securityData
      }
    }))
    
    setIsLoading(false)
    
    const messages = {
      password: "Your password has been updated successfully",
      twoFactor: userData.security.twoFactorEnabled ? 
        "Two-factor authentication has been disabled" : 
        "Two-factor authentication has been enabled",
      session: "Session has been revoked successfully",
      general: "Your security settings have been updated"
    }
    
    toast({
      title: "Security updated",
      description: messages[type] || messages.general,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link href="/dashboard" className="inline-flex items-center text-slate-400 hover:text-white transition-all duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        
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
                <ActivitySummary
                  activity={activityData}
                />
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

      {/* Avatar Upload Dialog */}
      <AvatarUploadDialog
        isOpen={isAvatarDialogOpen}
        onClose={() => setIsAvatarDialogOpen(false)}
        onSave={handleAvatarChange}
      />

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        isOpen={isEditProfileDialogOpen}
        onClose={() => setIsEditProfileDialogOpen(false)}
        userData={userData}
        onSave={handleProfileUpdate}
      />
    </div>
  )
}