import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  console.log(req.url)
  const res: NextResponse = NextResponse.json({message: "Logout Successful"}, {status: 200})
  res.cookies.set("session", "", {expires: Date.now(), httpOnly: true})
  return res
}