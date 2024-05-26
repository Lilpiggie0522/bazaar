import { decrypt } from '@/lib'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const session = request.cookies.get("session")?.value
    if (!session) {
        return NextResponse.json({message: "No cookies found!"}, {status: 401})
    }
    try {
        const cookie = await decrypt(session)
        console.log("awesome cookie found")
        return NextResponse.json(cookie)
    } catch (error) {
        return NextResponse.json({message: "Token expired or Incorrect"}, {status: 401})
    }

}