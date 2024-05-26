"use client"

import { getSession } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function marketplacePage() {
  const route = useRouter()
  getSession().then((res) => {
    if (!res.ok) {
      route.push("/login")
      return
    }
  })

  return (
    <div>This is marketplace page</div>
  )
}