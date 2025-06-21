"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface SignupFormData {
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

export default function AuthModal() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const signupForm = useForm<SignupFormData>();
  const loginForm = useForm<LoginFormData>();

  const handleLogin = (data: LoginFormData) => {
    console.log('Login data:', data);
    // Add your login logic here
  };

  const handleSignup = (data: SignupFormData) => {
    console.log('Signup data:', data);
    // Add your signup logic here
  };

  return (
    <div className="w-full max-w-md p-6 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-blue-700/30 rounded-2xl shadow-2xl border border-blue-500/20 overflow-y-auto max-h-[80vh]">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {tab === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {tab === "login"
            ? "Login to access GestureSense AI."
            : "Sign up to get started with GestureSense AI."}
        </p>
      </div>
      <div className="flex w-full mb-6 bg-blue-950/30 rounded-xl overflow-hidden border border-blue-500/20">
        <button
          className={`flex-1 py-2 text-base font-semibold transition-colors duration-300 focus:outline-none ${
            tab === "login"
              ? "bg-gradient-to-r from-blue-600/80 to-blue-400/80 text-white shadow"
              : "text-muted-foreground hover:bg-blue-800/20"
          }`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 text-base font-semibold transition-colors duration-300 focus:outline-none ${
            tab === "signup"
              ? "bg-gradient-to-r from-blue-600/80 to-blue-400/80 text-white shadow"
              : "text-muted-foreground hover:bg-blue-800/20"
          }`}
          onClick={() => setTab("signup")}
        >
          Signup
        </button>
      </div>
      <div>
        {tab === "login" ? (
          <form className="space-y-4" onSubmit={loginForm.handleSubmit(handleLogin)}>
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1" htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@email.com"
                required
                {...loginForm.register("email")}
                className="w-full px-3 py-2 rounded-lg border border-blue-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none text-sm bg-blue-900/20 text-white placeholder:text-blue-200/50 transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="Password"
                required
                {...loginForm.register("password")}
                className="w-full px-3 py-2 rounded-lg border border-blue-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none text-sm bg-blue-900/20 text-white placeholder:text-blue-200/50 transition shadow-sm"
              />
            </div>
            <div className="text-right text-sm mb-2">
              <a href="#" className="text-blue-300 hover:text-blue-200 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold text-base shadow hover:from-blue-700 hover:to-purple-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              Login
            </button>
            <div className="text-center mt-3 text-sm text-muted-foreground">
              Not a member?{' '}
              <button type="button" className="text-blue-300 hover:text-blue-200 hover:underline" onClick={() => setTab("signup")}>Signup now</button>
            </div>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={signupForm.handleSubmit(handleSignup)}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1" htmlFor="signup-firstname">First Name</label>
                <input
                  id="signup-firstname"
                  type="text"
                  placeholder="First name"
                  required
                  {...signupForm.register("firstName")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none text-sm bg-blue-900/20 text-white placeholder:text-blue-200/50 transition shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1" htmlFor="signup-lastname">Last Name</label>
                <input
                  id="signup-lastname"
                  type="text"
                  placeholder="Last name"
                  required
                  {...signupForm.register("lastName")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none text-sm bg-blue-900/20 text-white placeholder:text-blue-200/50 transition shadow-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1" htmlFor="signup-username">Username</label>
                <input
                  id="signup-username"
                  type="text"
                  placeholder="Choose username"
                  required
                  {...signupForm.register("username")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none text-sm bg-blue-900/20 text-white placeholder:text-blue-200/50 transition shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1" htmlFor="signup-dob">Date of Birth</label>
                <input
                  id="signup-dob"
                  type="date"
                  required
                  {...signupForm.register("dateOfBirth")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none text-sm bg-blue-900/20 text-white placeholder:text-blue-200/50 transition shadow-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1" htmlFor="signup-email">Email Address</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@email.com"
                required
                {...signupForm.register("email")}
                className="w-full px-3 py-2 rounded-lg border border-blue-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none text-sm bg-blue-900/20 text-white placeholder:text-blue-200/50 transition shadow-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1" htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Password"
                  required
                  {...signupForm.register("password")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none text-sm bg-blue-900/20 text-white placeholder:text-blue-200/50 transition shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1" htmlFor="signup-confirm">Confirm</label>
                <input
                  id="signup-confirm"
                  type="password"
                  placeholder="Confirm password"
                  required
                  {...signupForm.register("confirmPassword")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none text-sm bg-blue-900/20 text-white placeholder:text-blue-200/50 transition shadow-sm"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-2.5 mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold text-base shadow hover:from-blue-700 hover:to-purple-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              Create Account
            </button>
            
            <div className="text-center mt-3 text-sm text-muted-foreground">
              Already have an account?{' '}
              <button type="button" className="text-blue-300 hover:text-blue-200 hover:underline" onClick={() => setTab("login")}>
                Login instead
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}