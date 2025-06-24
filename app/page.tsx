"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Camera,
  Hand,
  Smile,
  Zap,
  Shield,
  Github,
  BookOpen,
  Play,
  Home,
  MessageSquare,
  GraduationCap,
  Heart,
  Accessibility,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Mail,
  ExternalLink,
  Upload,
  X,
  Send,
  Loader2
} from "lucide-react"
import { useTheme } from "next-themes"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentUseCase, setCurrentUseCase] = useState(0)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Hand,
      title: "Hand Gesture Recognition",
      description:
        "Detect common hand signs like thumbs up, peace, stop, and more using advanced computer vision models.",
    },
    {
      icon: Smile,
      title: "Facial Emotion Detection",
      description: "Understand user emotions such as happiness, sadness, anger, and surprise in real-time.",
    },
    {
      icon: Zap,
      title: "Real-Time Inference",
      description: "Optimized for performance with MediaPipe, TensorFlow Lite, and ONNX support.",
    },
    {
      icon: Shield,
      title: "Privacy-Focused",
      description: "Runs locally on-device. No cloud streaming. No data leaks.",
    },
  ]

  const useCases = [
    {
      icon: Home,
      title: "Touchless Control",
      description: "Control smart home devices, appliances, and interfaces with simple gestures - no physical contact required.",
    },
    {
      icon: MessageSquare,
      title: "Virtual Assistants",
      description: "Create more intuitive AI assistants that respond to both verbal commands and non-verbal emotional cues.",
    },
    {
      icon: GraduationCap,
      title: "EdTech Analysis",
      description: "Track student engagement and emotional responses during remote learning sessions for personalized teaching.",
    },
    {
      icon: Heart,
      title: "Healthcare Support",
      description: "Enable hands-free interactions in sterile medical environments and assist patients with limited mobility.",
    },
    {
      icon: Accessibility,
      title: "Accessibility UI",
      description: "Design inclusive interfaces for users with motor impairments, creating truly accessible technology.",
    },
    {
      icon: Play,
      title: "Gaming Interface",
      description: "Create immersive gaming experiences with natural gesture controls that translate player movements into game actions.",
    },
  ]

  const techStack = [
    { name: "Python", color: "bg-blue-500" },
    { name: "OpenCV", color: "bg-green-500" },
    { name: "TensorFlow", color: "bg-orange-500" },
    { name: "MediaPipe", color: "bg-purple-500" },
    { name: "React", color: "bg-cyan-500" },
    { name: "Flask", color: "bg-red-500" },
  ]

  const faqs = [
    {
      question: "Does it work offline?",
      answer:
        "Yes! GestureSense AI runs entirely on-device using local machine learning models. No internet connection required for gesture and emotion detection.",
    },
    {
      question: "Which gestures are supported?",
      answer:
        "Currently supports thumbs up, thumbs down, peace sign, stop gesture, pointing, and open palm. We're continuously adding new gestures based on community feedback.",
    },
    {
      question: "Can I run this on Raspberry Pi?",
      answer:
        "GestureSense AI is optimized for edge devices including Raspberry Pi 4+. We provide specific installation guides for ARM-based systems.",
    },
    {
      question: "What about privacy and data security?",
      answer:
        "Your privacy is our priority. All processing happens locally on your device. No video data is transmitted to external servers or stored in the cloud.",
    },
  ]

  const nextUseCase = () => {
    setCurrentUseCase((prev) => (prev + 1) % useCases.length)
  }

  const prevUseCase = () => {
    setCurrentUseCase((prev) => (prev - 1 + useCases.length) % useCases.length)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true)
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
        setUploading(false)
      }

      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('#profileBadge') && !target.closest('#profileDropdown')) {
        setProfileDropdownOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.glassmorphism-navbar') as HTMLElement
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.padding = '10px 20px'
          navbar.style.background = 'rgba(59, 130, 246, 0.25)' // Lighter blue (bg-blue-500 with opacity)
        } else {
          navbar.style.padding = '15px 30px'
          navbar.style.background = 'rgba(37, 99, 235, 0.20)' // Darker blue (bg-blue-600 with opacity)
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-indigo-500/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Glassmorphism Navigation */}
      <nav className="glassmorphism-navbar fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 flex justify-between items-center backdrop-blur-xl bg-gradient-to-r from-blue-600/20 via-sky-500/20 to-blue-500/20 border border-blue-300/20 dark:border-blue-500/20 rounded-2xl shadow-lg shadow-blue-500/10 flex-wrap gap-3 p-4">
        <div className="flex items-center gap-3 flex-1">
          <a href="#" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white dark:bg-blue-900 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full"></div>
            </div>
            <span className="font-bold text-xl">GestureSense</span>
          </a>
          <span className="project-name text-sm font-medium hidden sm:inline-block ml-2">AI Dashboard</span>
          <div className="search-bar relative ml-auto sm:ml-3 max-w-xs flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white/70">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search anything" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-10 py-2 rounded-full border-2 border-gray-300 dark:border-blue-500/70 bg-white/10 dark:bg-blue-800/10 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50 focus:outline-none focus:border-purple-500 focus:border-2 focus:bg-white/15 dark:focus:bg-blue-900/15 transition-all"
            />
          </div>
        </div>

        <ul className="nav-links hidden md:flex items-center space-x-6 text-sm font-medium">
          <li><a href="/dashboard" className="hover:opacity-80 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all">Dashboard</a></li>
          <li><a href="#features" className="hover:opacity-80 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all">Features</a></li>
          <li><a href="#use-cases" className="hover:opacity-80 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all">Use Cases</a></li>
          <li><a href="#" className="hover:opacity-80 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all">Docs</a></li>
          <li><a href="#" className="hover:opacity-80 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all">Community</a></li>
        </ul>

        <div className="profile-container relative">
          <div 
            id="profileBadge" 
            className="flex items-center gap-2 px-3 py-2 bg-blue-500/15 dark:bg-blue-600/20 rounded-full cursor-pointer border border-blue-300/20 dark:border-blue-500/20 transition-all hover:bg-blue-500/25"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 flex items-center justify-center text-white text-xs font-bold">
              AI
            </div>
            <span className="hidden sm:inline-block text-sm font-medium">Account</span>
          </div>

          <div id="profileDropdown" className={`${profileDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-3'} absolute top-full right-0 mt-3 w-60 bg-gradient-to-br from-blue-600/20 to-sky-500/20 dark:from-blue-900/80 dark:to-sky-900/80 backdrop-blur-xl rounded-xl border border-blue-300/20 dark:border-blue-500/20 shadow-xl shadow-blue-500/10 transition-all duration-300 z-50 py-3`}>
            <div className="flex items-center gap-3 px-4 py-2 hover:bg-blue-500/10 dark:hover:bg-blue-700/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <Link href="/profile" className="text-sm">My Profile</Link>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-2 hover:bg-blue-500/10 dark:hover:bg-blue-700/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              <span className="text-sm">Settings</span>
            </div>
            
            <div className="flex items-center justify-between gap-3 px-4 py-2 hover:bg-blue-500/10 dark:hover:bg-blue-700/20 transition-colors">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                <span className="text-sm">Notifications</span>
              </div>
              <span className="bg-blue-500/30 rounded-full px-2 py-0.5 text-xs">4</span>
            </div>

            <div className="border-t border-blue-500/20 my-2"></div>
            
            <div className="flex items-center gap-3 px-4 py-2 hover:bg-blue-500/10 dark:hover:bg-blue-700/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
              <span className="text-sm">Theme</span>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 py-2 hover:bg-blue-500/10 dark:hover:bg-blue-700/20 transition-colors">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                <span className="text-sm">Dark Mode</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full h-6 w-6 p-0 hover:bg-blue-500/20"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            <div className="border-t border-blue-500/20 my-2"></div>

            <div className="flex items-center gap-3 px-4 py-2 hover:bg-blue-500/10 dark:hover:bg-blue-700/20 transition-colors text-rose-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              <span className="text-sm font-medium">Log Out</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6 max-w-7xl mx-auto mt-16">
        <div className="space-y-8">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            🚀 Now with Real-Time Emotion Detection
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight">
            See Beyond the Screen
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Understand Gestures & Emotions in Real Time
          </p>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            GestureSense AI detects hand gestures and facial emotions from live video using cutting-edge machine
            learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="btn-sign-up"
              onClick={() => router.push("/auth")}
            >
              <Play className="h-5 w-5" />
              Sign up
            </Button>
            <Button
              className="btn-github-repo"
            >
              <Github className="h-5 w-5 mr-2" />
              <a href="https://github.com/BikramMondal5/GestureSense-AI">View GitHub Repo</a>
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Hero Animation Placeholder - Interactive Upload Section */}
        <div className="mt-16 relative h-auto">
          {/* Added centered "Try a Quick Demo" heading above the section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Try a Quick Demo
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            {/* Text Section */}
            <div className="md:w-1/2 text-left space-y-4">
              <h3 className="text-3xl font-bold">
                Experience GestureSense AI
              </h3>
              <p className="text-lg text-muted-foreground">
                Upload your photo to see our cutting-edge AI in action — detecting gestures and emotions with precision.
              </p>
              <p className="text-sm text-muted-foreground"><b>Supported formats:</b> .JPG, .PNG</p>
              
              {/* Send button - moved here to be visible as per the screenshot */}
              {uploadedImage && (
                <div className="mt-4 flex">
                  <Button
                    onClick={() => {}}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all flex items-center gap-2"
                  >
                    {uploading ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Camera Upload Component - Positioned more to the right */}
            <div className={`${uploadedImage ? "bg-transparent" : "bg-gradient-to-br from-blue-500/20 to-purple-500/20"} border border-white/10 backdrop-blur-md shadow-lg w-96 h-72 md:w-96 md:h-80 rounded-xl overflow-hidden md:ml-auto md:mr-0 md:translate-x-16 lg:translate-x-20`}>
              {!uploadedImage ? (
                <div
                  className="w-full h-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 cursor-pointer flex flex-col items-center justify-center relative group"
                  onClick={triggerFileInput}
                >
                  <div className="absolute inset-3 border-4 border-dashed border-blue-400/80 rounded-lg transition-all duration-300 group-active:border-blue-500 group-active:scale-95"></div>
                  <Camera className="h-20 w-20 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                  <p className="text-white/80 text-center text-sm mt-4 group-hover:text-white transition-all duration-300">Click to upload an image</p>
                </div>
              ) : (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-full object-contain cursor-pointer border border-blue-400/20 rounded-lg"
                  onClick={triggerFileInput}
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">Powerful Features</h2>
          <p className="text-xl text-muted-foreground">Advanced AI capabilities at your fingertips</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-white/10"
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">See It In Action</h2>
          <p className="text-xl text-muted-foreground">Watch GestureSense AI detect your mood & moves instantly</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center">
                  <Play className="h-12 w-12 text-white/80" />
                </div>
                <p className="text-white/60">Live Demo Video</p>
                <p className="text-sm text-white/40">Real-time gesture and emotion detection</p>
              </div>
            </div>
            <div className="absolute top-4 left-4 flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">Use Cases</h2>
          <p className="text-xl text-muted-foreground">Endless possibilities across industries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.slice(0, 3).map((useCase, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-white/10"
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <useCase.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">{useCase.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Second row with remaining use cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {useCases.slice(3).map((useCase, index) => (
            <Card
              key={index + 3}
              className="group hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-white/10"
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <useCase.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">{useCase.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* GitHub & Documentation Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">Get Started</h2>
          <p className="text-xl text-muted-foreground">Explore the code and documentation</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-full hover:bg-primary/10 transform hover:scale-105 transition-all duration-200"
            >
              <Github className="mr-2 h-5 w-5" />
              <a href="https://github.com/BikramMondal5/GestureSense-AI">View GitHub Repo</a>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-full hover:bg-primary/10 transform hover:scale-105 transition-all duration-200"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Read Developer Docs
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">FAQ</h2>
          <p className="text-xl text-muted-foreground">Common questions about GestureSense AI</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-lg px-6 bg-card/50 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-lg font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Contact/Subscribe Section */}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">Stay Updated</h2>
          <p className="text-xl text-muted-foreground">Want updates on new gestures & features? Join our community.</p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex space-x-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full px-6 py-6 text-lg bg-card/50 backdrop-blur-sm border-white/10"
            />
            <Button
              size="lg"
              className="px-8 py-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Camera className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">GestureSense AI</span>
          </div>

          <div className="flex space-x-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="https://github.com/BikramMondal5/GestureSense-AI" className="hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
          <p>© 2025 GestureSense AI. Built with ❤️ by Bikram.</p>
        </div>
      </footer>
    </div>
  )
}
