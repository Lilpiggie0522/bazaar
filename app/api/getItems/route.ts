"use server"
import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"
export async function GET() {
  try {
    const client = await db.connect()
    const status = "listed"
    const res = await client.sql `SELECT * FROM items WHERE status=${status}`
    console.log(res.rows)
    return NextResponse.json(res.rows, {headers: { "Cache-Control": "no-store" }})
  } catch (error) {
    console.log(error)
    throw Error("some db operation is wrong!")
  }
}