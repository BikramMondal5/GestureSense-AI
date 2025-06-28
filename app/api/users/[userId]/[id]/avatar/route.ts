import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/lib/services/userService'

const userService = new UserService()

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await request.json()
    const { avatar } = body

    if (!avatar) {
      return NextResponse.json(
        { error: 'Avatar URL is required' },
        { status: 400 }
      )
    }

    // Basic URL validation
    try {
      new URL(avatar)
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid avatar URL' },
        { status: 400 }
      )
    }

    const updatedUser = await userService.updateUser(params.userId, { avatar })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Update avatar error:', error)
    return NextResponse.json(
      { error: 'Failed to update avatar' },
      { status: 500 }
    )
  }
}