import { NextRequest } from "next/server"
import { UserService } from "@/lib/services/userService"

const userService = new UserService()

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await userService.getUserById(params.userId)
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Error fetching user:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const data = await request.json()
    const user = await userService.updateUser(params.userId, data)
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Error updating user:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Failed to update user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await userService.deleteUser(params.userId)
    return new Response(null, { status: 204 })
  } catch (error: any) {
    console.error("Error deleting user:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Failed to delete user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}