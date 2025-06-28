import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/lib/services/userService'

const userService = new UserService()

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await request.json()
    
    // Validate preference fields
    const allowedPreferences = [
      'theme',
      'notifications',
      'handGestureDetection',
      'facialEmotionRecognition',
      'speechRecognition',
      'darkMode',
      'highContrast',
      'reducedMotion',
      'language'
    ]

    // Filter out any fields that aren't in our allowed list
    const preferences = Object.fromEntries(
      Object.entries(body).filter(([key]) => allowedPreferences.includes(key))
    )

    if (Object.keys(preferences).length === 0) {
      return NextResponse.json(
        { error: 'No valid preference fields to update' },
        { status: 400 }
      )
    }

    // Type validation
    const validTypes = Object.entries(preferences).every(([key, value]) => {
      if (key === 'language' || key === 'theme') {
        return typeof value === 'string'
      }
      return typeof value === 'boolean'
    })

    if (!validTypes) {
      return NextResponse.json(
        { error: 'Invalid preference value types' },
        { status: 400 }
      )
    }

    const updatedUser = await userService.updateUser(params.userId, {
      preferences
    })
    
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Update preferences error:', error)
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}