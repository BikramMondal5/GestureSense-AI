import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/lib/services/userService'

const userService = new UserService()

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await request.json()
    
    // Validate security fields
    const allowedSecurityFields = [
      'twoFactorEnabled',
      'lastPasswordChange',
      'sessions'
    ]

    // Filter out any fields that aren't in our allowed list
    const security = Object.fromEntries(
      Object.entries(body).filter(([key]) => allowedSecurityFields.includes(key))
    )

    if (Object.keys(security).length === 0) {
      return NextResponse.json(
        { error: 'No valid security fields to update' },
        { status: 400 }
      )
    }

    // Type and format validation
    if ('twoFactorEnabled' in security && typeof security.twoFactorEnabled !== 'boolean') {
      return NextResponse.json(
        { error: 'twoFactorEnabled must be a boolean' },
        { status: 400 }
      )
    }

    if ('lastPasswordChange' in security) {
      try {
        new Date(security.lastPasswordChange).toISOString()
      } catch (e) {
        return NextResponse.json(
          { error: 'lastPasswordChange must be a valid date' },
          { status: 400 }
        )
      }
    }

    if ('sessions' in security) {
      if (!Array.isArray(security.sessions)) {
        return NextResponse.json(
          { error: 'Sessions must be an array' },
          { status: 400 }
        )
      }

      const validSessions = security.sessions.every(session => 
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

    const updatedUser = await userService.updateUser(params.userId, {
      security
    })
    
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Update security settings error:', error)
    return NextResponse.json(
      { error: 'Failed to update security settings' },
      { status: 500 }
    )
  }
}