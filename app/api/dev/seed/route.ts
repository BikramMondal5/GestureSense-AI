import { NextResponse } from 'next/server'
import { UserService } from '@/lib/services/userService'

const userService = new UserService()

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  try {
    // First check if user already exists
    const existingUser = await userService.getUserByEmail('default@example.com')
    if (existingUser) {
      // Return the existing user instead of treating it as an error
      return NextResponse.json(existingUser)
    }

    // Create new user if one doesn't exist
    const defaultUser = await userService.createUser({
      email: 'default@example.com',
      password: 'default-password',
      name: 'Default User',
      role: 'user',
      bio: 'This is a default user for development',
      avatar: '/placeholder-user.jpg',
    })

    return NextResponse.json(defaultUser)
  } catch (error: any) {
    console.error('Seed error:', error)
    // Include the full error details in development
    const errorMessage =
      process.env.NODE_ENV === 'development'
        ? `${error.message}\n${error.stack}`
        : 'Failed to seed database'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}