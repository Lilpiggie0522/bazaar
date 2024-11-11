import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"
export async function GET() {
  try {
    const res = await sql `SELECT * FROM items`
    console.log(res.rows)
    return NextResponse.json(res.rows)
  } catch (error) {
    console.log(error)
    throw Error("some db operation is wrong!")
  }
}