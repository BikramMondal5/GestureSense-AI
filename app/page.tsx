"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentUseCase, setCurrentUseCase] = useState(0)

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
      description: "Smart device control",
    },
    {
      icon: MessageSquare,
      title: "Virtual Assistants",
      description: "Emotion-aware AI",
    },
    {
      icon: GraduationCap,
      title: "EdTech Analysis",
      description: "Feedback analysis",
    },
    {
      icon: Heart,
      title: "Healthcare Support",
      description: "Diagnostic assistance",
    },
    {
      icon: Accessibility,
      title: "Accessibility UI",
      description: "Hands-free interfaces",
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

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Camera className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">GestureSense AI</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6 max-w-7xl mx-auto">
        <div className="space-y-8">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            🚀 Now with Real-Time Emotion Detection
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
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
              size="lg"
              className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
            >
              <Play className="mr-2 h-5 w-5" />
              Try Live Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg rounded-full hover:bg-primary/10 transform hover:scale-105 transition-all duration-200"
            >
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>
        </div>

        {/* Hero Animation Placeholder */}
        <div className="mt-16 relative">
          <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
            <div className="w-60 h-60 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full flex items-center justify-center animate-pulse">
              <Camera className="h-20 w-20 text-white/80" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground">Advanced AI capabilities at your fingertips</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-white/10"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">See It In Action</h2>
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
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Use Cases</h2>
          <p className="text-xl text-muted-foreground">Endless possibilities across industries</p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center space-x-8 overflow-hidden">
            <Button variant="ghost" size="icon" onClick={prevUseCase} className="rounded-full hover:bg-primary/10">
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex space-x-6 min-w-0">
              {useCases.slice(currentUseCase, currentUseCase + 3).map((useCase, index) => (
                <Card
                  key={index}
                  className="w-64 flex-shrink-0 hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-white/10"
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center mb-3">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Button variant="ghost" size="icon" onClick={nextUseCase} className="rounded-full hover:bg-primary/10">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Built With</h2>
          <p className="text-xl text-muted-foreground">Open-source ML frameworks and real-time computer vision tools</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {techStack.map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`px-6 py-3 text-lg font-medium ${tech.color} text-white hover:scale-110 transition-transform duration-200`}
            >
              {tech.name}
            </Badge>
          ))}
        </div>
      </section>

      {/* GitHub & Documentation Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Get Started</h2>
          <p className="text-xl text-muted-foreground">Explore the code and documentation</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-full hover:bg-primary/10 transform hover:scale-105 transition-all duration-200"
            >
              <Github className="mr-2 h-5 w-5" />
              View GitHub Repo
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">FAQ</h2>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Stay Updated</h2>
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
            <a href="#" className="hover:text-foreground transition-colors">
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
