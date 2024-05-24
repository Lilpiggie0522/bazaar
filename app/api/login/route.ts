import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { compare } from 'bcrypt-ts'

interface loginRequestBody {
    username: string,
    password: string
}

export async function POST(req: Request) {
    const body = await req.json()
    // console.log(body)
    if (!userDetailsCheck(body)) {
        return NextResponse.json({message: "Username and Password cannot be empty"}, {status: 406})
    }
    // note that this is unsafe, sending credentials over http post request is not a good approach,
    // however, implementing https server is not an option at this point.

    if (!await dbCredentialCheck(body)) {
        return NextResponse.json({message: "Incorrect password."}, {status: 401})
    }
    return NextResponse.json({message: "Login successful"}, {status: 200})
}

async function dbCredentialCheck(body: loginRequestBody) {
    const {username, password} = body
    const queryResult = await sql `select password from players where username=${username}`
    // get the password of given username from postgres
    if (queryResult.rowCount < 1 || queryResult.rows.length < 1) {
        // no query results, user does not exist, return false right away
        return false
    }
    // 
    const storedHash = queryResult.rows[0].password
    // compare hashed passwords we fetched from db with the plaintext password sent from front end,
    // again, not a good idea to send credentials over http request, should use https instead
    if (!await compare(password, storedHash)) {
        return false
    }
    return true
}

function userDetailsCheck(body: loginRequestBody) {
    const {username, password} = body
    return username && password
}

