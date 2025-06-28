import { NextRequest } from "next/server"
import { UserService } from "@/lib/services/userService"

const userService = new UserService()

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const preferences = await userService.getUserPreferences(params.userId)
    if (!preferences) {
      return new Response(JSON.stringify({ error: "Preferences not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }
    return new Response(JSON.stringify(preferences), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Error fetching preferences:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch preferences" }),
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
    const preferences = await userService.updateUserPreferences(params.userId, data)
    return new Response(JSON.stringify(preferences), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Error updating preferences:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Failed to update preferences" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}