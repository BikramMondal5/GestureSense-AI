"use client";

import React, { useState } from "react";

export default function AuthModal() {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <div className="w-full max-w-md p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl border border-blue-100">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-1">
          {tab === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-sm text-blue-500">
          {tab === "login"
            ? "Login to access GestureSense AI."
            : "Sign up to get started with GestureSense AI."}
        </p>
      </div>
      <div className="flex w-full mb-8 bg-blue-50 rounded-xl overflow-hidden border border-blue-100">
        <button
          className={`flex-1 py-2 text-lg font-semibold transition-colors duration-300 focus:outline-none ${
            tab === "login"
              ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow"
              : "text-blue-700 hover:bg-blue-100"
          }`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 text-lg font-semibold transition-colors duration-300 focus:outline-none ${
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
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@email.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-base bg-white transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-base bg-white transition shadow-sm"
              />
            </div>
            <div className="text-right text-sm mb-2">
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold text-lg shadow hover:from-blue-700 hover:to-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Login
            </button>
            <div className="text-center mt-4 text-sm">
              Not a member?{' '}
              <button type="button" className="text-blue-600 hover:underline" onClick={() => setTab("signup")}>Signup now</button>
            </div>
          </form>
        ) : (
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="signup-email">Email Address</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@email.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-base bg-white transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-base bg-white transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="signup-confirm">Confirm Password</label>
              <input
                id="signup-confirm"
                type="password"
                placeholder="Confirm password"
                required
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-base bg-white transition shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold text-lg shadow hover:from-blue-700 hover:to-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 