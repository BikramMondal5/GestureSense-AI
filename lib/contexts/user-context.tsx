"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getUserProfile } from '../utils'

interface UserContextType {
  user: any | null
  isLoading: boolean
  error: string | null
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshUser = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // In development, create a default user if none exists
      let userId = process.env.NEXT_PUBLIC_DEFAULT_USER_ID
      
      if (!userId && process.env.NODE_ENV === 'development') {
        // Trigger default user creation through the dev API
        const response = await fetch('/api/dev/seed', { method: 'POST' })
        if (!response.ok) {
          throw new Error('Failed to create development user')
        }
        const data = await response.json()
        userId = data.id
      }

      if (!userId) {
        throw new Error('No user ID available')
      }

      const userData = await getUserProfile(userId)
      setUser(userData)
    } catch (err: any) {
      console.error('Failed to fetch user:', err)
      setError(err?.message || 'Failed to load user data')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, isLoading, error, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}