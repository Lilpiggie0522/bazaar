"use server";
import { SignJWT, jwtVerify } from "jose"

const key = new TextEncoder().encode("piggie")

export async function decrypt(session: string) {

  const { payload } = await jwtVerify(session, key, {
    algorithms: ["HS256"]
  })
  return payload
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime('2h').sign(key)
}

export async function loginJwt(payload: any) {
  const { username } = payload
  const expires = new Date(Date.now() + 60 * 60 * 1000 * 2)
  const cookie = await encrypt({ username, expires })
  return cookie
}