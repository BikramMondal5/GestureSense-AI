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
    <div className="w-full max-w-md p-6 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl border border-blue-100 overflow-y-auto max-h-[80vh] purple-scrollbar">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-blue-800">
          {tab === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-xs text-blue-500">
          {tab === "login"
            ? "Login to access GestureSense AI."
            : "Sign up to get started with GestureSense AI."}
        </p>
      </div>
      <div className="flex w-full mb-4 bg-blue-50 rounded-xl overflow-hidden border border-blue-100">
        <button
          className={`flex-1 py-1.5 text-base font-semibold transition-colors duration-300 focus:outline-none ${
            tab === "login"
              ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow"
              : "text-blue-700 hover:bg-blue-100"
          }`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={`flex-1 py-1.5 text-base font-semibold transition-colors duration-300 focus:outline-none ${
            tab === "signup"
              ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow"
              : "text-blue-700 hover:bg-blue-100"
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
              <label className="block text-xs font-medium text-blue-700 mb-1" htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@email.com"
                required
                {...loginForm.register("email")}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm bg-white transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-700 mb-1" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="Password"
                required
                {...loginForm.register("password")}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm bg-white transition shadow-sm"
              />
            </div>
            <div className="text-right text-xs mb-2">
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold text-base shadow hover:from-blue-700 hover:to-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Login
            </button>
            <div className="text-center mt-3 text-xs">
              Not a member?{' '}
              <button type="button" className="text-blue-600 hover:underline" onClick={() => setTab("signup")}>Signup now</button>
            </div>
          </form>
        ) : (
          <form className="space-y-3" onSubmit={signupForm.handleSubmit(handleSignup)}>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-blue-700 mb-1" htmlFor="signup-firstname">First Name</label>
                <input
                  id="signup-firstname"
                  type="text"
                  placeholder="First name"
                  required
                  {...signupForm.register("firstName")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm bg-white transition shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-blue-700 mb-1" htmlFor="signup-lastname">Last Name</label>
                <input
                  id="signup-lastname"
                  type="text"
                  placeholder="Last name"
                  required
                  {...signupForm.register("lastName")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm bg-white transition shadow-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-blue-700 mb-1" htmlFor="signup-username">Username</label>
                <input
                  id="signup-username"
                  type="text"
                  placeholder="Choose username"
                  required
                  {...signupForm.register("username")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm bg-white transition shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-blue-700 mb-1" htmlFor="signup-dob">Date of Birth</label>
                <input
                  id="signup-dob"
                  type="date"
                  required
                  {...signupForm.register("dateOfBirth")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm bg-white transition shadow-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-blue-700 mb-1" htmlFor="signup-email">Email Address</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@email.com"
                required
                {...signupForm.register("email")}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm bg-white transition shadow-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-blue-700 mb-1" htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Password"
                  required
                  {...signupForm.register("password")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm bg-white transition shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-blue-700 mb-1" htmlFor="signup-confirm">Confirm</label>
                <input
                  id="signup-confirm"
                  type="password"
                  placeholder="Confirm password"
                  required
                  {...signupForm.register("confirmPassword")}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm bg-white transition shadow-sm"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold text-base shadow hover:from-blue-700 hover:to-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
}