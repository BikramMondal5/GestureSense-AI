import { db } from "@/lib/db"
import { hash, compare } from 'bcrypt'

export type CreateUserData = {
  email: string
  password: string
  name?: string
  avatar?: string
  bio?: string
  location?: string
  company?: string
  website?: string
  twitterHandle?: string
  githubHandle?: string
  linkedinHandle?: string
}

export type UpdateUserData = Partial<CreateUserData> & {
  preferences?: {
    handGestureDetection?: boolean
    facialEmotionRecognition?: boolean
    speechRecognition?: boolean
    notifications?: boolean
    darkMode?: boolean
    highContrast?: boolean
    reducedMotion?: boolean
    language?: string
  }
  security?: {
    twoFactorEnabled?: boolean
    sessions?: Array<{
      device: string
      browser: string
      date: string
      isActive: boolean
    }>
  }
}

export class UserService {
  async createUser(data: CreateUserData) {
    const hashedPassword = await hash(data.password, 10)
    
    const user = await db.user.create({
      data: {
        ...data,
        password: hashedPassword,
        preferences: {
          create: {
            theme: 'system',
            notifications: true,
            handGestureDetection: true,
            facialEmotionRecognition: true,
            speechRecognition: true,
            darkMode: false,
            highContrast: false,
            reducedMotion: false,
            language: 'English'
          }
        },
        security: {
          create: {
            twoFactorEnabled: false,
            lastPasswordChange: new Date().toISOString(),
            sessions: []
          }
        }
      },
      include: {
        preferences: true,
        security: true
      }
    })
    
    return this.sanitizeUser(user)
  }

  async getUserById(id: string) {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        preferences: true,
        security: {
          include: {
            sessions: true
          }
        }
      }
    })

    if (!user) return null
    return this.sanitizeUser(user)
  }

  async getUserByEmail(email: string) {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        preferences: true,
        security: true
      }
    })

    if (!user) return null
    return user
  }

  async updateUser(id: string, data: UpdateUserData) {
    const { preferences, security, ...updateData } = data

    if (updateData.password) {
      updateData.password = await hash(updateData.password, 10)
    }

    const user = await db.user.update({
      where: { id },
      data: {
        ...updateData,
        ...(preferences && {
          preferences: {
            upsert: {
              create: {
                ...preferences,
                theme: preferences.theme || 'system',
                notifications: preferences.notifications ?? true,
                handGestureDetection: preferences.handGestureDetection ?? true,
                facialEmotionRecognition: preferences.facialEmotionRecognition ?? true,
                speechRecognition: preferences.speechRecognition ?? true,
                darkMode: preferences.darkMode ?? false,
                highContrast: preferences.highContrast ?? false,
                reducedMotion: preferences.reducedMotion ?? false,
                language: preferences.language || 'English'
              },
              update: preferences
            }
          }
        }),
        ...(security && {
          security: {
            upsert: {
              create: {
                ...security,
                twoFactorEnabled: security.twoFactorEnabled ??
        })
      },
      include: {
        preferences: true,
        security: true
      }
    })

    return this.sanitizeUser(user)
  }

  async validatePassword(email: string, password: string) {
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user) return null

    const isValid = await compare(password, user.password)
    if (!isValid) return null

    return this.sanitizeUser(user)
  }

  async deleteUser(id: string) {
    await db.user.delete({
      where: { id }
    })
  }

  async updateUserPreferences(userId: string, preferences: Prisma.PreferencesUpdateInput) {
    try {
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: {
          preferences: {
            update: preferences
          }
        },
        include: {
          preferences: true
        }
      })
      return updatedUser.preferences
    } catch (error) {
      console.error('Error in updateUserPreferences:', error)
      throw new Error('Failed to update user preferences')
    }
  }

  async updateUserSecurity(userId: string, security: Prisma.SecurityUpdateInput) {
    try {
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: {
          security: {
            update: security
          }
        },
        include: {
          security: {
            include: {
              sessions: true
            }
          }
        }
      })
      return updatedUser.security
    } catch (error) {
      console.error('Error in updateUserSecurity:', error)
      throw new Error('Failed to update user security settings')
    }
  }

  async createDefaultDevUser() {
    try {
      const user = await db.user.create({
        data: {
          name: 'Development User',
          email: 'dev@example.com',
          avatar: '/placeholder-user.jpg',
          role: 'Developer',
          bio: 'This is a development user account',
          location: 'Development',
          website: 'https://example.com',
          company: 'Dev Company',
          joinDate: new Date().toISOString(),
          twitterHandle: '@devuser',
          githubHandle: 'devuser',
          linkedinHandle: 'devuser',
          preferences: {
            create: {
              handGestureDetection: true,
              facialEmotionRecognition: true,
              speechRecognition: true,
              notifications: true,
              darkMode: true,
              highContrast: false,
              reducedMotion: false,
              language: 'English'
            }
          },
          security: {
            create: {
              twoFactorEnabled: false,
              lastPasswordChange: new Date().toISOString(),
              sessions: {
                create: [
                  {
                    device: 'Development Desktop',
                    browser: 'Chrome',
                    date: new Date().toISOString(),
                    isActive: true
                  }
                ]
              }
            }
          }
        },
        include: {
          preferences: true,
          security: {
            include: {
              sessions: true
            }
          }
        }
      })
      return user
    } catch (error) {
      console.error('Error in createDefaultDevUser:', error)
      throw new Error('Failed to create development user')
    }
  }

  private sanitizeUser(user: any) {
    const { password, ...sanitizedUser } = user
    return sanitizedUser
  }
}