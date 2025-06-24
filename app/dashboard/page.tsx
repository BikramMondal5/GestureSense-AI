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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

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

const mockSpeechPhrases = [
  "Hello, how are you today?",
  "Turn on the lights please",
  "I need help with this task",
  "Thank you for your assistance",
  "Can you show me the weather?",
  "Play my favorite music",
]

interface DetectionHistory {
  id: string
  type: "gesture" | "emotion" | "speech"
  content: string
  confidence?: number
  timestamp: Date
}

export default function Dashboard() {
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

  const videoRef = useRef<HTMLVideoElement>(null)
  const speechTimeoutRef = useRef<NodeJS.Timeout>()

  // Simulate real-time detection updates
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

  // Simulate speech recognition
  useEffect(() => {
    if (!isLiveDetection || !micEnabled) return

    const speechInterval = setInterval(() => {
      const randomPhrase = mockSpeechPhrases[Math.floor(Math.random() * mockSpeechPhrases.length)]
      setSpeechText(randomPhrase)

      // Add to history with truly unique ID
      const historyItem: DetectionHistory = {
        id: `speech-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "speech",
        content: randomPhrase,
        timestamp: new Date(),
      }
      setDetectionHistory((prev) => [historyItem, ...prev.slice(0, 4)])

      // Clear speech text after 5 seconds
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current)
      }
      speechTimeoutRef.current = setTimeout(() => {
        setSpeechText("")
      }, 5000)
    }, 7000)

    return () => {
      clearInterval(speechInterval)
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current)
      }
    }
  }, [isLiveDetection, micEnabled])

  const startLiveDetection = async () => {
    setIsLiveDetection(true)
    setCameraEnabled(true)
    setMicEnabled(true)

    // Simulate camera access
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
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
    setMicEnabled(false)
    setSpeechText("")

    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                GestureSense AI
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-blue-400 font-medium">
                  AI Dashboard
                </a>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
                <a href="/#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
                <a href="/#use-cases" className="text-gray-300 hover:text-white transition-colors">
                  Use Cases
                </a>
              </div>
            </div>
            <a href="/auth">
              <Button variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                Account
              </Button>
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            👋 Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">User</span>
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Explore gestures, emotions, and voice insights — all in real time.
          </p>
          <p className="text-gray-400 mb-6">Enable your camera and microphone to get started</p>

          <Button
            onClick={isLiveDetection ? stopLiveDetection : startLiveDetection}
            className={`text-lg px-8 py-4 rounded-full transition-all duration-300 ${
              isLiveDetection
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
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
                <Play className="mr-2 h-5 w-5" />🔴 Start Live Detection
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

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMicEnabled(!micEnabled)}
                    className={`${micEnabled ? "bg-green-500/20 border-green-500" : "bg-red-500/20 border-red-500"}`}
                  >
                    {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                  <span className="text-sm text-gray-300">Mic</span>
                </div>

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
                <Hand className="mr-2 h-5 w-5 text-blue-400" />🤚 Detected Gesture
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
                <Smile className="mr-2 h-5 w-5 text-purple-400" />😀 Detected Emotion
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
                🗣️ Detected Speech
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLiveDetection && micEnabled ? (
                <div className="min-h-[200px] flex flex-col">
                  <div className="flex-1 bg-gray-800/50 rounded-lg p-4 mb-4">
                    {speechText ? (
                      <p className="text-white text-lg leading-relaxed animate-fade-in">"{speechText}"</p>
                    ) : (
                      <p className="text-gray-500 italic">Listening for speech...</p>
                    )}
                  </div>
                  <div className="flex items-center justify-center space-x-2">
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
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Speech recognition disabled</p>
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
        >
          <Upload className="h-6 w-6" />
        </Button>
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}