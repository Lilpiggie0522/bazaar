"use server";
import { NextRequest, NextResponse } from "next/server"
import { SignJWT, jwtVerify } from "jose"


const key = new TextEncoder().encode("piggie")

// export async function getSession() {
//     const session = cookies().get("session")?.value
//     if (!session) {
//         return null
//     }
//     return decrypt(session)
// }

export async function updateSession(request: NextRequest) {
    const cookies = request.cookies.get("session")?.value
    if (!cookies) {
        return
    }
    let parsed;
    try {
      parsed = await decrypt(cookies)
    } catch (error) {
      return NextResponse.json({message: "expired token"}, {status: 406})
    }
    const newExp = new Date(Date.now() + 60 * 60 * 2 * 1000)
    parsed.expires = newExp
    const res = NextResponse.next()
    const newCookie = await encrypt(parsed)
    console.log(`new cookie from update session is ${newCookie}`)
    res.cookies.set("session", newCookie, {expires: newExp})
    return res
  }
  
  export async function decrypt(session: string) {
    
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"]
    })
    return payload
  }
  
  export async function encrypt(payload: any) {
    return await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setIssuedAt().setExpirationTime('2h').sign(key)
  }
  
  export async function loginJwt(payload: any) {
    const {username} = payload
    const expires = new Date(Date.now() + 60 * 60 * 1000 * 2)
    const cookie = await encrypt({username, expires})
    // cookies().set("session", cookie, {expires, httpOnly: true})
    return cookie
  }

  export async function logoutJwt(req: NextRequest) {
    const res = NextResponse.json({message: "Logout successful!"}, {status: 200})
    res.cookies.set("session", "", {expires: Date.now(), httpOnly: true})
    return res
  }