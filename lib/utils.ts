import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export interface Security {
  twoFactorEnabled: boolean
  lastPasswordChange: string
  sessions: Array<{
    device: string
    browser: string
    date: string
    isActive: boolean
  }>
}

export interface Preferences {
  handGestureDetection: boolean
  facialEmotionRecognition: boolean
  speechRecognition: boolean
  notifications: boolean
  darkMode: boolean
  highContrast: boolean
  reducedMotion: boolean
  language: string
}

export interface UserData {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  bio: string
  location: string
  website: string
  company: string
  joinDate: string
  twitterHandle: string
  githubHandle: string
  linkedinHandle: string
  sessions: number
  accuracy: number
  mode: string
  preferences: Preferences
  security: Security
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API utilities
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.error || `API Error: ${response.status}`)
    error.name = 'ApiError'
    throw error
  }

  return data
}

export function getUserProfile(userId: string) {
  if (!userId) {
    throw new Error('User ID is required')
  }
  return fetchApi<UserData>(`/users/${userId}`)
}

export function updateUserProfile(userId: string, data: Partial<UserData>) {
  return fetchApi<UserData>(`/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function updateUserPreferences(userId: string, preferences: Partial<Preferences>) {
  return fetchApi<UserData>(`/users/${userId}/preferences`, {
    method: 'PATCH',
    body: JSON.stringify(preferences),
  })
}

export function updateUserSecurity(userId: string, security: Partial<Security>) {
  return fetchApi<UserData>(`/users/${userId}/security`, {
    method: 'PATCH',
    body: JSON.stringify(security),
  })
}

export function updateUserAvatar(userId: string, avatarUrl: string) {
  return fetchApi<UserData>(`/users/${userId}/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({ avatar: avatarUrl }),
  })
}

export function deleteUserProfile(userId: string) {
  return fetchApi(`/users/${userId}`, {
    method: 'DELETE',
  })
}
