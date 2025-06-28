import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/lib/services/userService'

const userService = new UserService()

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await userService.getUserById(params.userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await request.json()

    // Validate allowed fields
    const allowedFields = [
      'name',
      'avatar',
      'bio',
      'company',
      'location',
      'website',
      'twitterHandle',
      'githubHandle',
      'linkedinHandle',
      'preferences',
      'security'
    ]

    // Filter out any fields that aren't in our allowed list
    const updateData = Object.fromEntries(
      Object.entries(body).filter(([key]) => allowedFields.includes(key))
    )

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    // Validate preferences if they exist
    if (updateData.preferences) {
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

      updateData.preferences = Object.fromEntries(
        Object.entries(updateData.preferences).filter(([key]) => allowedPreferences.includes(key))
      )
    }

    // Validate security if it exists
    if (updateData.security) {
      const allowedSecurityFields = [
        'twoFactorEnabled',
        'lastPasswordChange',
        'sessions'
      ]

      updateData.security = Object.fromEntries(
        Object.entries(updateData.security).filter(([key]) => allowedSecurityFields.includes(key))
      )

      // Validate sessions format if it exists
      if (updateData.security.sessions) {
        if (!Array.isArray(updateData.security.sessions)) {
          return NextResponse.json(
            { error: 'Sessions must be an array' },
            { status: 400 }
          )
        }

        // Validate each session object
        const validSessions = updateData.security.sessions.every(session => 
          typeof session === 'object' &&
          typeof session.device === 'string' &&
          typeof session.browser === 'string' &&
          typeof session.date === 'string' &&
          typeof session.isActive === 'boolean'
        )

        if (!validSessions) {
          return NextResponse.json(
            { error: 'Invalid session format' },
            { status: 400 }
          )
        }
      }
    }

    const updatedUser = await userService.updateUser(params.userId, updateData)
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await userService.deleteUser(params.userId)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}