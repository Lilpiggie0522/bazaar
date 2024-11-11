"use client"
import { useParams } from "next/navigation"

export default function ItemPage() {
  const id = useParams().id
  return (
    <div className="min-h-screen flex justify-center">
      <div className="mt-[16.67vh] text-center">
        <p className="mb-4">ksjfakl</p>
        <h1 className="text-2xl font-bold mb-2">Product Details</h1>
        <p>name: {id}</p>
      </div>
    </div>
  )
}