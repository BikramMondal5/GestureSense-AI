"use client"

import { useState, useEffect, useRef } from "react"
import {
  Camera,
  Mic,
  MicOff,
  CameraOff,
  Hand,
  Smile,
  MessageSquare,
  Play,
  Pause,
  Settings,
  HelpCircle,
  Upload,
  Lightbulb,
  Bell,
  Volume2,
  RotateCcw,
  Sun,
  Moon,
  ExternalLink,
  Github,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import Link from "next/link"

// Speech recognition interface for TypeScript
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

// Mock data for demonstrations
const mockGestures = [
  { emoji: "✌️", name: "Peace", confidence: 95 },
  { emoji: "👍", name: "Thumbs Up", confidence: 88 },
  { emoji: "👋", name: "Wave", confidence: 92 },
  { emoji: "🤚", name: "Stop", confidence: 85 },
  { emoji: "👌", name: "OK", confidence: 90 },
  { emoji: "🤟", name: "Love You", confidence: 87 },
]

const mockEmotions = [
  { emoji: "😊", name: "Happy", confidence: 92 },
  { emoji: "😐", name: "Neutral", confidence: 78 },
  { emoji: "😮", name: "Surprised", confidence: 85 },
  { emoji: "😔", name: "Sad", confidence: 72 },
  { emoji: "😠", name: "Angry", confidence: 68 },
  { emoji: "😴", name: "Tired", confidence: 80 },
]


interface DetectionHistory {
  id: string
  type: "gesture" | "emotion" | "speech"
  content: string
  confidence?: number
  timestamp: Date
}

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [isLiveDetection, setIsLiveDetection] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [micEnabled, setMicEnabled] = useState(false)
  const [gesturesEnabled, setGesturesEnabled] = useState(true)
  const [emotionsEnabled, setEmotionsEnabled] = useState(true)
  const [currentGesture, setCurrentGesture] = useState(mockGestures[0])
  const [currentEmotion, setCurrentEmotion] = useState(mockEmotions[0])
  const [speechText, setSpeechText] = useState("")
  const [detectionHistory, setDetectionHistory] = useState<DetectionHistory[]>([])
  const [moodScore, setMoodScore] = useState(75)
  const [isListening, setIsListening] = useState(false)
  const [speechConfidence, setSpeechConfidence] = useState(0)
  const [recognitionError, setRecognitionError] = useState("")
  const [mounted, setMounted] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  // New state variables for file upload
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false)
  const [imageDetectionResults, setImageDetectionResults] = useState<{
    gesture?: typeof mockGestures[0],
    emotion?: typeof mockEmotions[0]
  } | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const speechTimeoutRef = useRef<NodeJS.Timeout>()
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialization of speech recognition
  useEffect(() => {
    // Check browser compatibility for speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || 
                             (window as any).webkitSpeechRecognition ||
                             null;
    
    if (SpeechRecognition && !recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      // Handle speech recognition results
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        // Get confidence from the last result
        if (event.results.length > 0) {
          const lastResultIndex = event.results.length - 1;
          const confidence = Math.round(event.results[lastResultIndex][0].confidence * 100);
          setSpeechConfidence(confidence);
        }
        
        setSpeechText(transcript);
        
        // If result is final, add to history
        if (event.results[event.results.length - 1].isFinal) {
          const historyItem: DetectionHistory = {
            id: `speech-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: "speech",
            content: transcript,
            confidence: speechConfidence,
            timestamp: new Date(),
          }
          setDetectionHistory((prev) => [historyItem, ...prev.slice(0, 4)]);
          
          // Reset transcript after short delay
          if (speechTimeoutRef.current) {
            clearTimeout(speechTimeoutRef.current);
          }
          speechTimeoutRef.current = setTimeout(() => {
            setSpeechText("");
          }, 5000);
        }
      };
      
      // Handle speech recognition errors
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event);
        setRecognitionError(event.error);
        setIsListening(false);
      };
      
      // Recognition has ended
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Handle toggling the microphone
  const toggleMicrophone = async () => {
    if (!recognitionRef.current) {
      console.error("Speech recognition not supported in this browser");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setMicEnabled(false);
    } else {
      try {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Start recognition
        recognitionRef.current.start();
        setIsListening(true);
        setMicEnabled(true);
        setRecognitionError("");
      } catch (error) {
        console.error("Error accessing microphone", error);
        setRecognitionError("Microphone access denied");
      }
    }
  };

  // Simulate real-time detection updates for gestures and emotions
  useEffect(() => {
    if (!isLiveDetection) return

    const interval = setInterval(() => {
      if (gesturesEnabled) {
        const randomGesture = mockGestures[Math.floor(Math.random() * mockGestures.length)]
        setCurrentGesture(randomGesture)

        // Add to history with truly unique ID
        const historyItem: DetectionHistory = {
          id: `gesture-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: "gesture",
          content: randomGesture.name,
          confidence: randomGesture.confidence,
          timestamp: new Date(),
        }
        setDetectionHistory((prev) => [historyItem, ...prev.slice(0, 4)])
      }

      if (emotionsEnabled) {
        const randomEmotion = mockEmotions[Math.floor(Math.random() * mockEmotions.length)]
        setCurrentEmotion(randomEmotion)

        // Update mood score based on emotion
        const emotionScores: Record<string, number> = {
          Happy: 90,
          Neutral: 70,
          Surprised: 75,
          Sad: 40,
          Angry: 30,
          Tired: 50,
        }
        setMoodScore(emotionScores[randomEmotion.name] || 70)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isLiveDetection, gesturesEnabled, emotionsEnabled])

  const startLiveDetection = async () => {
    setIsLiveDetection(true)
    setCameraEnabled(true)
    
    // Don't automatically enable microphone - user will toggle it separately
    // setMicEnabled(true)

    // Simulate camera access
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false, // Don't request audio here - we'll do it separately
        })
        videoRef.current.srcObject = stream
      } catch (error) {
        console.log("Camera access not available in demo")
      }
    }
  }

  const stopLiveDetection = () => {
    setIsLiveDetection(false)
    setCameraEnabled(false)
    
    // Stop the microphone if it's enabled
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    setMicEnabled(false)
    setSpeechText("")
    setIsListening(false)

    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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

  // Add file upload handler
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, etc.)');
      return;
    }
    
    // Create URL for preview
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsUploadModalOpen(true);
    
    // Simulate image analysis
    setIsAnalyzingImage(true);
    setTimeout(() => {
      // Choose random gesture and emotion for the simulated result
      const randomGesture = mockGestures[Math.floor(Math.random() * mockGestures.length)];
      const randomEmotion = mockEmotions[Math.floor(Math.random() * mockEmotions.length)];
      
      setImageDetectionResults({
        gesture: randomGesture,
        emotion: randomEmotion
      });
      
      // Add to history
      const gestureHistoryItem: DetectionHistory = {
        id: `upload-gesture-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "gesture",
        content: randomGesture.name,
        confidence: randomGesture.confidence,
        timestamp: new Date(),
      };
      
      const emotionHistoryItem: DetectionHistory = {
        id: `upload-emotion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "emotion",
        content: randomEmotion.name,
        confidence: randomEmotion.confidence,
        timestamp: new Date(),
      };
      
      setDetectionHistory((prev) => [gestureHistoryItem, emotionHistoryItem, ...prev.slice(0, 3)]);
      setIsAnalyzingImage(false);
    }, 2000); // Simulate processing time
  };

  // Clean up object URL when component unmounts or when modal is closed
  const cleanupUploadedImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
      setUploadedImage(null);
      setImageDetectionResults(null);
    }
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
    cleanupUploadedImage();
  };

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search anything" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-10 py-2 rounded-full border border-blue-300/30 dark:border-blue-500/30 bg-white/10 dark:bg-blue-800/10 text-white dark:text-white placeholder:text-white/70 dark:placeholder:text-white/50 focus:outline-none focus:border-purple-500 focus:border-2 focus:bg-white/15 dark:focus:bg-blue-900/15 transition-all"
            />
          </div>
        </div>

        <ul className="nav-links hidden md:flex items-center space-x-6 text-sm font-medium">
          <li><a href="/dashboard" className="hover:opacity-80 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-300 after:transition-all">Dashboard</a></li>
          <li><a href="/#features" className="hover:opacity-80 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all">Features</a></li>
          <li><a href="/#use-cases" className="hover:opacity-80 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all">Use Cases</a></li>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            👋 Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Bikram</span>
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Explore gestures, emotions, and voice insights — all in real time.
          </p>
          <p className="text-gray-400 mb-6">Enable your camera and microphone to get started</p>

          <Button
            onClick={isLiveDetection ? stopLiveDetection : startLiveDetection}
            className={`text-lg px-6 py-6 rounded-full transition-all duration-300 ${
              isLiveDetection
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105"
            }`}
          >
            {isLiveDetection ? (
              <>
                <Pause className="mr-2 h-5 w-5" />
                Stop Live Detection
              </>
            ) : (
              <>
                🔴 Start Live Detection
              </>
            )}
          </Button>
        </div>

        {/* Live Video Feed Section */}
        <Card className="mb-8 bg-black/40 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-white flex items-center">
                <Camera className="mr-2 h-5 w-5" />
                Live Video Feed
              </CardTitle>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCameraEnabled(!cameraEnabled)}
                    className={`${cameraEnabled ? "bg-green-500/20 border-green-500" : "bg-red-500/20 border-red-500"}`}
                  >
                    {cameraEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                  </Button>
                  <span className="text-sm text-gray-300">Camera</span>
                </div>

                <HoverCard>
                  <HoverCardTrigger>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleMicrophone}
                        className={`${isListening ? "bg-green-500/20 border-green-500 animate-pulse" : "bg-red-500/20 border-red-500"}`}
                      >
                        {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                      <span className="text-sm text-gray-300">Mic</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Speech Recognition</h4>
                      <p className="text-xs text-muted-foreground">
                        {isListening 
                          ? "Currently listening for speech. Click to stop." 
                          : "Click to enable real-time speech recognition."}
                      </p>
                      {recognitionError && (
                        <div className="p-2 bg-red-500/20 border border-red-500/50 rounded text-xs">
                          Error: {recognitionError}
                        </div>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <div className="flex items-center space-x-2">
                  <Switch checked={gesturesEnabled} onCheckedChange={setGesturesEnabled} />
                  <span className="text-sm text-gray-300">✋ Gestures</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch checked={emotionsEnabled} onCheckedChange={setEmotionsEnabled} />
                  <span className="text-sm text-gray-300">😃 Emotions</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-500/25">
              <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />

              {!cameraEnabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <CameraOff className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Camera is disabled</p>
                  </div>
                </div>
              )}

              {isLiveDetection && cameraEnabled && (
                <div className="absolute inset-0">
                  {/* Simulated detection overlay points */}
                  <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>

                  {/* Status indicator */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-500 animate-pulse">🔴 LIVE</Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detection Output Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Detected Gesture */}
          <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Hand className="mr-2 h-5 w-5 text-blue-400" />Detected Gesture
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLiveDetection && gesturesEnabled ? (
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">{currentGesture.emoji}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{currentGesture.name}</h3>
                  <div className="space-y-2">
                    <Progress value={currentGesture.confidence} className="h-2" />
                    <p className="text-sm text-gray-400">Confidence: {currentGesture.confidence}%</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Hand className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No gesture detected</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detected Emotion */}
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Smile className="mr-2 h-5 w-5 text-purple-400" />Detected Emotion
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLiveDetection && emotionsEnabled ? (
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-pulse">{currentEmotion.emoji}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{currentEmotion.name}</h3>
                  <div className="space-y-2">
                    <Progress value={currentEmotion.confidence} className="h-2" />
                    <p className="text-sm text-gray-400">Confidence: {currentEmotion.confidence}%</p>
                  </div>
                  <div className="mt-4 p-3 bg-purple-500/20 rounded-lg">
                    <p className="text-sm text-purple-300">Mood Score: {moodScore}%</p>
                    <Progress value={moodScore} className="h-1 mt-1" />
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Smile className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No emotion detected</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detected Speech */}
          <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-green-400" />
                Detected Speech
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isListening ? (
                <div className="min-h-[200px] flex flex-col">
                  <div className="flex-1 bg-gray-800/50 rounded-lg p-4 mb-4">
                    {speechText ? (
                      <p className="text-white text-lg leading-relaxed animate-fade-in">"{speechText}"</p>
                    ) : (
                      <p className="text-gray-500 italic">Listening for speech...</p>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                    {speechConfidence > 0 && (
                      <div className="w-full space-y-1">
                        <Progress value={speechConfidence} className="h-1" />
                        <p className="text-xs text-gray-400 text-center">Confidence: {speechConfidence}%</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Speech recognition disabled</p>
                  <p className="text-sm mt-2">Click the mic button to enable</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Panel */}
        <Card className="mb-8 bg-black/40 border-orange-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="mr-2 h-5 w-5 text-orange-400" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                <Lightbulb className="mr-2 h-4 w-4" />
                Toggle Lights
              </Button>
              <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                <Bell className="mr-2 h-4 w-4" />
                Send Alert
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                <Volume2 className="mr-2 h-4 w-4" />
                Play Music
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset System
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* History Section */}
        <Card className="bg-black/40 border-gray-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {detectionHistory.length > 0 ? (
              <div className="space-y-3">
                {detectionHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.type === "gesture"
                            ? "bg-blue-400"
                            : item.type === "emotion"
                              ? "bg-purple-400"
                              : "bg-green-400"
                        }`}
                      ></div>
                      <div>
                        <p className="text-white font-medium">{item.content}</p>
                        <p className="text-gray-400 text-sm capitalize">{item.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.confidence && <p className="text-sm text-gray-300">{item.confidence}%</p>}
                      <p className="text-xs text-gray-500">{formatTime(item.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No recent activity</p>
                <p className="text-sm mt-2">Start live detection to see your activity here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handleUploadClick}
        >
          <Upload className="h-6 w-6" />
        </Button>
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>

        {/* Hidden file input for upload */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Upload Image Analysis Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeUploadModal}></div>
          <Card className="relative max-w-lg w-full mx-4 sm:mx-auto bg-black/80 border border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Upload className="mr-2 h-5 w-5 text-purple-400" />
                Image Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzingImage ? (
                <div className="py-6 text-center">
                  {uploadedImage && (
                    <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden border-2 border-purple-500/50">
                      <img src={uploadedImage} alt="Uploaded image" className="w-full h-full object-contain bg-black" />
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center px-4">
                          <p className="text-white font-medium mb-3">Analyzing image...</p>
                          <div className="flex justify-center space-x-2">
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                            <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="text-gray-400">Processing your image to detect gestures and emotions...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {uploadedImage && (
                    <div className="w-full aspect-video mb-6 rounded-lg overflow-hidden border-2 border-purple-500/50">
                      <img src={uploadedImage} alt="Uploaded image" className="w-full h-full object-contain bg-black" />
                    </div>
                  )}

                  {imageDetectionResults?.gesture && (
                    <div className="text-center">
                      <div className="text-6xl mb-2">{imageDetectionResults.gesture.emoji}</div>
                      <h3 className="text-2xl font-bold text-white mb-1">{imageDetectionResults.gesture.name}</h3>
                      <Progress value={imageDetectionResults.gesture.confidence} className="h-2" />
                      <p className="text-sm text-gray-400">Confidence: {imageDetectionResults.gesture.confidence}%</p>
                    </div>
                  )}

                  {imageDetectionResults?.emotion && (
                    <div className="text-center">
                      <div className="text-6xl mb-2">{imageDetectionResults.emotion.emoji}</div>
                      <h3 className="text-2xl font-bold text-white mb-1">{imageDetectionResults.emotion.name}</h3>
                      <Progress value={imageDetectionResults.emotion.confidence} className="h-2" />
                      <p className="text-sm text-gray-400">Confidence: {imageDetectionResults.emotion.confidence}%</p>
                    </div>
                  )}

                  <div className="mt-4">
                    <Button
                      onClick={closeUploadModal}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}