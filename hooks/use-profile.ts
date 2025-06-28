import { useState, useCallback } from 'react'
import { useToast } from './use-toast'
import { useUser } from './use-user'
import { User, Preferences, Security } from '@prisma/client'

type ProfileUpdateData = Partial<User>
type PreferencesUpdateData = Partial<Preferences>
type SecurityUpdateData = Partial<Security>

export function useProfile() {
  const { user, refreshUser } = useUser()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProfile = useCallback(async (data: ProfileUpdateData) => {
    if (!user) return
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      await refreshUser()
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully'
      })
    } catch (err) {
      console.error('Error updating profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to update profile')
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, refreshUser, toast])

  const updatePreferences = useCallback(async (data: PreferencesUpdateData) => {
    if (!user) return
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/users/${user.id}/preferences`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to update preferences')
      }

      await refreshUser()
      toast({
        title: 'Preferences updated',
        description: 'Your preferences have been updated successfully'
      })
    } catch (err) {
      console.error('Error updating preferences:', err)
      setError(err instanceof Error ? err.message : 'Failed to update preferences')
      toast({
        title: 'Error',
        description: 'Failed to update preferences. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, refreshUser, toast])

  const updateSecurity = useCallback(async (data: SecurityUpdateData) => {
    if (!user) return
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/users/${user.id}/security`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to update security settings')
      }

      await refreshUser()
      toast({
        title: 'Security settings updated',
        description: 'Your security settings have been updated successfully'
      })
    } catch (err) {
      console.error('Error updating security settings:', err)
      setError(err instanceof Error ? err.message : 'Failed to update security settings')
      toast({
        title: 'Error',
        description: 'Failed to update security settings. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, refreshUser, toast])

  const removeSession = useCallback(async (sessionId: string) => {
    if (!user) return
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/users/${user.id}/security`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })

      if (!response.ok) {
        throw new Error('Failed to remove session')
      }

      await refreshUser()
      toast({
        title: 'Session removed',
        description: 'The session has been removed successfully'
      })
    } catch (err) {
      console.error('Error removing session:', err)
      setError(err instanceof Error ? err.message : 'Failed to remove session')
      toast({
        title: 'Error',
        description: 'Failed to remove session. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, refreshUser, toast])

  return {
    user,
    isLoading,
    error,
    updateProfile,
    updatePreferences,
    updateSecurity,
    removeSession
  }
}