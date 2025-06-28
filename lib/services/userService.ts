import { prisma } from "@/lib/db"
import { hash, compare } from 'bcrypt'
import { type Prisma, type User, type UserPreferences, type UserSecurity } from '@prisma/client'

export type CreateUserData = {
  email: string
  password: string
  name?: string
  role?: string
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
    lastPasswordChange?: string
  }
}

export class UserService {
  async createUser(data: CreateUserData) {
    const hashedPassword = await hash(data.password, 10)
    
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        preferences: {
          create: {
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
            lastPasswordChange: new Date(),
            sessions: {
              create: []
            }
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
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        preferences: true,
        security: true
      }
    })

    if (!user) return null
    return this.sanitizeUser(user)
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        preferences: true,
        security: true
      }
    })

    if (!user) return null
    return this.sanitizeUser(user)
  }

  async updateUser(id: string, data: UpdateUserData) {
    const { preferences, security, ...updateData } = data

    if (updateData.password) {
      updateData.password = await hash(updateData.password, 10)
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...updateData,
        ...(preferences && {
          preferences: {
            upsert: {
              create: {
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
                twoFactorEnabled: security.twoFactorEnabled ?? false,
                lastPasswordChange: new Date(security.lastPasswordChange || Date.now()),
                sessions: {
                  create: []
                }
              },
              update: {
                twoFactorEnabled: security.twoFactorEnabled,
                lastPasswordChange: security.lastPasswordChange ? new Date(security.lastPasswordChange) : undefined
              }
            }
          }
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
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) return null

    const isValid = await compare(password, user.password)
    if (!isValid) return null

    return this.sanitizeUser(user)
  }

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: { id }
    })
  }

  async updateUserPreferences(userId: string, preferences: Prisma.UserPreferencesUpdateInput) {
    try {
      const updatedUser = await prisma.user.update({
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

  async updateUserSecurity(userId: string, security: Prisma.UserSecurityUpdateInput) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          security: {
            update: security
          }
        },
        include: {
          security: true
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
      const user = await prisma.user.create({
        data: {
          name: 'Development User',
          email: 'dev@example.com',
          password: await hash('default-password', 10),
          avatar: '/placeholder-user.jpg',
          bio: 'This is a development user account',
          location: 'Development',
          website: 'https://example.com',
          company: 'Dev Company',
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
              lastPasswordChange: new Date(),
              sessions: {
                create: [{
                  device: 'Development Desktop',
                  browser: 'Chrome',
                  isActive: true,
                  date: new Date()
                }]
              }
            }
          }
        },
        include: {
          preferences: true,
          security: true
        }
      })
      return this.sanitizeUser(user)
    } catch (error) {
      console.error('Error in createDefaultDevUser:', error)
      throw new Error('Failed to create development user')
    }
  }

  private sanitizeUser(user: User & { 
    preferences?: UserPreferences | null, 
    security?: UserSecurity | null 
  }) {
    const { password, ...sanitizedUser } = user
    return sanitizedUser
  }
}