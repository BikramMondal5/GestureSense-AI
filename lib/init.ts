import { UserService } from './services/userService'

const userService = new UserService()

export async function initializeApp() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  try {
    // Check for existing default user
    const existingUser = await userService.getUserByEmail('default@example.com')
    
    if (!existingUser) {
      // Create default user if it doesn't exist
      const defaultUser = await userService.createUser({
        email: 'default@example.com',
        password: 'default-password',
        name: 'Default User',
        bio: 'This is a default user for development',
        avatar: '/placeholder-user.jpg',
      })
      
      // Set the default user ID in env
      process.env.NEXT_PUBLIC_DEFAULT_USER_ID = defaultUser.id
    } else {
      process.env.NEXT_PUBLIC_DEFAULT_USER_ID = existingUser.id
    }
  } catch (error) {
    console.error('Failed to initialize app:', error)
  }
}