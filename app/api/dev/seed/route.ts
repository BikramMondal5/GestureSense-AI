import { NextResponse } from 'next/server'
import { UserService } from '@/lib/services/userService'

const userService = new UserService()

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  try {
    const defaultUser = await userService.createUser({
      email: 'default@example.com',
      password: 'default-password',
      name: 'Default User',
      bio: 'This is a default user for development',
      avatar: '/placeholder-user.jpg',
    })

    // Store the user ID in env for development
    process.env.NEXT_PUBLIC_DEFAULT_USER_ID = defaultUser.id

    return NextResponse.json(defaultUser)
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}