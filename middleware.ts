import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { decrypt } from "./lib"

export async function middleware(request: NextRequest) {
  const path: string = request.nextUrl.pathname
    
  // Check if the user has a valid token
  const tokenValid = await tokenCheck(request)

  // If accessing '/market' without a valid token, redirect to '/login'
  if (path === "/market" && !tokenValid) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If accessing '/login' with a valid token, redirect to '/market'
  if (path === "/login" && tokenValid) {
    return NextResponse.redirect(new URL("/market", request.url))
  }

  // Proceed as normal if no redirection is needed
  return NextResponse.next()
}

// Function to check if the session token is valid
async function tokenCheck(req: NextRequest): Promise<boolean> {
  const session = req.cookies.get("session")?.value
  if (!session) {
    return false  // No session cookie found
  }

  try {
    const cookie = await decrypt(session)  // Attempt to decrypt and validate the session
    console.log("Valid token found:", cookie)
    return true
  } catch (error) {
    console.log("Invalid token:", error)
    return false  // Token is either invalid or decryption failed
  }
}

// Middleware config to match specific paths
export const config = {
  matcher: ["/market", "/login"],  // Apply this middleware to the /market and /login paths
}