"use client";

import AuthModal from "@/components/ui/AuthModal";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Image section */}
      <div className="w-1/2 bg-gradient-to-br from-blue-200 via-blue-100 to-white flex items-center justify-center">
        {/* Replace src with your project-relevant image */}
        <img
          src="/auth-side-image.png"
          alt="GestureSense AI Illustration"
          className="max-w-full max-h-full object-contain p-12"
        />
      </div>
      {/* Right: Modal section */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full py-12">
          <AuthModal />
        </div>
      </div>
    </div>
  );
}