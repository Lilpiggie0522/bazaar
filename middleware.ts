import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { decrypt } from "./lib"

const allowedRequest = NextResponse.next()
const declinedRequest = NextResponse.json("Not authorised to access!", { status: 401})

const PROTECTED_ROUTES = [
  {
    path: "/market",
    redirect: "/login"
  }
]

const PROTECTED_APIs = [
  {
    path: "/api/addItem"
  },
  {
    path: "/api/getItem"
  },
  {
    path: "/api/addItems"
  }
]

const LOGGED_IN_ROUTES = [
  {
    path: "/login",
    redirect: "/market"
  }
]

export async function middleware(request: NextRequest) {
  const path: string = request.nextUrl.pathname
    
  // Check if the user has a valid token
  const tokenValid = await tokenCheck(request)

  for (const api of PROTECTED_APIs) {
    if (path.match(api.path) && !tokenValid) {
      return declinedRequest
    }
  }

  for (const route of PROTECTED_ROUTES) {
    if (path.match(route.path) && !tokenValid) {
      return NextResponse.redirect(new URL(route.redirect, request.url))
    }
  }

  for (const route of LOGGED_IN_ROUTES) {
    if (path.match(route.path) && tokenValid) {
      return NextResponse.redirect(new URL(route.redirect, request.url))
    }
  }

  return allowedRequest
}

// Function to check if the session token is valid
async function tokenCheck(req: NextRequest): Promise<boolean> {
  const session = req.cookies.get("session")?.value
  if (!session) {
    return false  // No session cookie found
  }

  try {
    await decrypt(session)  // Attempt to decrypt and validate the session
    return true
  } catch (error) {
    console.log("Invalid token:", error)
    return false  // Token is either invalid or decryption failed
  }
}

// Middleware config to match specific paths
export const config = {
  matcher: ["/market", "/login", "/api"],  // Apply this middleware to the /market and /login paths
}