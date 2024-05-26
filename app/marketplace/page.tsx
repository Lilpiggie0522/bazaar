"use client"

import { getSession } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function MarketplacePage() {
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