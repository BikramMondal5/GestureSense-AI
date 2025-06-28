import { prisma } from '../db'
import { hash, compare } from 'bcrypt'

export type CreateUserData = {
  email: string
  password: string
  name?: string
}

export type UpdateUserData = {
  email?: string
  name?: string
  password?: string
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
            theme: 'system',
            notifications: true
          }
        }
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        preferences: true
      }
    })
    
    return user
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        preferences: true
      }
    })
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        preferences: true
      }
    })
  }

  async updateUser(id: string, data: UpdateUserData) {
    const updateData = { ...data }
    if (data.password) {
      updateData.password = await hash(data.password, 10)
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
        preferences: true
      }
    })
  }

  async validatePassword(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) return null

    const isValid = await compare(password, user.password)
    if (!isValid) return null

    return {
      id: user.id,
      email: user.email,
      name: user.name
    }
  }

  async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id }
    })
  }
}