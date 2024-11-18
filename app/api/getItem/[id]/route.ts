"use server"
import { db } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: {params: {id: string}}) {
  const id = (await params).id
  const client = await db.connect()
  const item = await client.sql `SELECT * FROM items WHERE id=${id}`
  if (item.rowCount! < 1) {
    return NextResponse.json("No item found!", {status: 400})
  }
  return NextResponse.json(item.rows[0], {status: 200})
}