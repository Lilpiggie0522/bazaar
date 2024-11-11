import { decrypt } from "@/lib"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("session")?.value
  console.log(cookie)
  if (cookie) {
    const username = await decrypt(cookie)
    console.log(username)
    return NextResponse.json(username, {status: 200})
  }
  return NextResponse.json("error", {status: 406})
}