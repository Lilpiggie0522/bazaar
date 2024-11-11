"use server"
import { JWTPayload, SignJWT, jwtVerify } from "jose"

const key = new TextEncoder().encode("piggie")

export async function decrypt(session: string) {

  const { payload } = await jwtVerify(session, key, {
    algorithms: ["HS256"]
  })
  return payload
}

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("2h").sign(key)
}

export async function loginJwt(payload: JWTPayload) {
  const { userId } = payload
  const expires = new Date(Date.now() + 60 * 60 * 1000 * 2)
  const cookie = await encrypt({ userId, expires })
  return cookie
}