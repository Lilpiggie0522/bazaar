"use server"
import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { compare } from "bcrypt-ts"
import { loginJwt } from "@/lib"

interface loginRequestBody {
    username: string,
    password: string
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  // console.log(body)
  if (!userDetailsCheck(body)) {
    return NextResponse.json({ message: "Username and Password cannot be empty" }, { status: 406 })
  }
  // note that this is unsafe, sending credentials over http post request is not a good approach,
  // however, implementing https server is not an option at this point.
  const userId: string | boolean = await dbCredentialCheck(body)
  if (!userId) {
    return NextResponse.json({ message: "Incorrect password." }, { status: 401 })
  }
  const cookie = await loginJwt({userId})
  const res = NextResponse.json({ success: "Login successful", id: userId }, { status: 200 })
  const expires = new Date(Date.now() + 60 * 60 * 1000 * 2)
  res.cookies.set("session", cookie, { expires: expires, httpOnly: true })
  // cookies().set('session', cookie, {
  //     httpOnly: true,
  //     expires: expires,
  //     path: '/',
  // })
  return res
}

async function dbCredentialCheck(body: loginRequestBody): Promise<boolean | string> {
  const { username, password } = body
  try {
    const queryResult = await sql`SELECT password from players WHERE username=${username}`
    if (!queryResult.rowCount || queryResult.rows.length < 1) {
      // no query results, user does not exist, return false right away
      return false
    }
    const storedHash = queryResult.rows[0].password
    // compare hashed passwords we fetched from db with the plaintext password sent from front end,
    // again, not a good idea to send credentials over http request, should use https instead
    if (!await compare(password, storedHash)) {
      return false
    }
    const userIdResult = await sql `SELECT id from players WHERE username=${username}`
    const userId = userIdResult.rows.find(item => item.id)?.id
    return userId
  } catch {
    return false
  }
}

function userDetailsCheck(body: loginRequestBody): boolean {
  const { username, password } = body
  if (username && password) {
    return true
  }
  return false
}

