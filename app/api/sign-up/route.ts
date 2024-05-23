import { NextRequest, NextResponse } from "next/server";

interface userRegister {
    username: string,
    password: string
}

export async function POST(req: NextRequest) {
    const body: userRegister = await req.json()
    const { username, password } = body;
    console.log(`username is ${username}`)
    console.log(`password is ${password}`)
    return NextResponse.json({ message: "Account registration successful" }, { status: 200 })
}