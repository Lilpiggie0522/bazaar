import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { hashPassword } from "@/lib/utils"

interface userRegister {
    username: string,
    password: string
}

export async function POST(req: NextRequest) {
  const body: userRegister = await req.json()
  const { username, password } = body
  console.log(`username is ${username}`)
  console.log(`password is ${password}`)
  // logics for taking care of doggy as requests made from somewhere else than our front-end, maybe postman or something, could be malicious
  if (!checkEmpty(username, password)) {
    return NextResponse.json({message: "Username and password cannot be empty!"}, {status: 406})
  }

  if (checkUsername(username)) {
    return NextResponse.json({message: "username can only contain alphabets and numbers!"}, {status: 406})
  }

  if (await dbUserQuery(username)) {
    return NextResponse.json({message: "Username has been registered, please try a new username"}, {status: 406})
  }
    
  dbUserInsertion(username, await hashPassword(password))
  return NextResponse.json({ message: "Account registration successful" }, { status: 200 })
}

function checkEmpty(username: string, password: string) {
  return username && password
}

function checkUsername(username: string) {
  const userRegex = /[^A-Za-z0-9]/
  return userRegex.test(username)
}

async function dbUserQuery(username: string) {
  const result = await sql `select * from players where username=${username}`
  const rowNum = result.rowCount
  const rows = result.rows
  console.log(rows)
  if (rowNum === 0 && rows.length === 0) {
    return false
  }
  return true
}

async function dbUserInsertion(username: string, password: string) {
  await sql `INSERT INTO players (username, password) VALUES (${username}, ${password})`
}