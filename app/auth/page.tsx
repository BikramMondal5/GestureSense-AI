"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/ui/AuthModal";
import { Camera } from "lucide-react";

export default function AuthPage() {
  const [mounted, setMounted] = useState(false);

  // Ensure theme effect only runs after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-indigo-500/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left: Image & Brand section */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-600/20 via-sky-500/20 to-blue-500/20 backdrop-blur-xl border-r border-blue-500/20 flex flex-col items-center justify-center p-6">
          <div className="mb-8 text-center">
            <div className="flex items-center gap-2 justify-center mb-6">
              <div className="w-10 h-10 bg-white dark:bg-blue-900 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full"></div>
              </div>
              <span className="font-bold text-3xl">GestureSense AI</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
              Control your environment with a gesture, or a word
            </h1>
          </div>

          <div className="relative w-full max-w-md aspect-square mb-8">
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src="/placeholder.svg"
                alt="GestureSense AI Illustration"
                className="max-w-[75%] max-h-[70%] object-contain"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
          </div>

          <div className="text-center text-muted-foreground text-sm mt-auto">
            <p>© 2025 GestureSense AI. All rights reserved.</p>
          </div>
        </div>

        {/* Right: Modal section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="max-w-md w-full py-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-3 flex flex-col items-center">
                <span className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mb-3 rounded-full"></span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Authentication Portal
                </span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Sign in to access your GestureSense AI dashboard and controls
              </p>
            </div>
            <AuthModal />
          </div>
        </div>
      </div>
    </div>
  );
}