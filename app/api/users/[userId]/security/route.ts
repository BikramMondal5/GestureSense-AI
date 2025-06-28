import { NextRequest } from "next/server"
import { UserService } from "@/lib/services/userService"

const userService = new UserService()

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await userService.getUserById(params.userId)
    if (!user?.security) {
      return new Response(JSON.stringify({ error: "Security settings not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }
    return new Response(JSON.stringify(user.security), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Error fetching security settings:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch security settings" }),
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
    const security = await userService.updateUserSecurity(params.userId, data)
    return new Response(JSON.stringify(security), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Error updating security settings:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Failed to update security settings" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}

// Handle active sessions
export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { device, browser } = await request.json()
    const session = await userService.createSession(params.userId, device, browser)
    return new Response(JSON.stringify(session), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Error creating session:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Failed to create session" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}