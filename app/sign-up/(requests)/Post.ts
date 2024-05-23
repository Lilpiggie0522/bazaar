import { NextResponse } from "next/server"

export interface registrationBody {
    username: string
    password: string
    confirm_password: string
  }
  
  export async function sendRequest(body: registrationBody){
    const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return response.json()
  }