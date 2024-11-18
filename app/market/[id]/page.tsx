"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
export interface Item {
  id: number
  name: string;
  type: string;
  level: number,
  enchantment: number;
  quantity: string
  seller: string
  sale_start: string
  sale_end: string
  price: number
  description: string
  status: string
  image_url: string
}

export default function ItemPage() {
  const [item, setItem] = useState<Item | null>(null)
  const contact = "Contact Seller"
  const prompt = "Seller's name copied"
  const [buttonName, setButtonName] = useState(contact)

  const params = useParams()
  const id = params.id
  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(`/api/getItem/${id}`, {
          method: "GET",
        })
        if (!response.ok) {
          console.log("something wrong")
        } else {
          const itemResponse = await response.json()
          const endDate = itemResponse.sale_end.match(/[0-9]{4}-[0-9]+-[0-9]+/)
          if (!endDate) {
            itemResponse.sale_end = "Not specified"
          } else {
            itemResponse.sale_end = endDate
          }
          setItem(itemResponse)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchItem()
  }, [id])

  const handleCopySeller = () => {
    if (item) {
      navigator.clipboard.writeText(item.seller)
      setButtonName(prompt)
      setTimeout(() => {
        setButtonName(contact)
      }, 1500)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-5">
        <Link href="/market">
          <button
            type="submit"
            className="text-white py-1 px-5 bg-slate-500 rounded-sm font-semibold"
          >
            Back
          </button>
        </Link>
      </div>
      {item ? (
        <div className="">
          <div className="flex flex-row gap-[200px] pl-52 items-center">
            <div>
              <Image alt="piggie" src={item.image_url || ""} width={400} height={200} className="rounded-xl"/>
            </div>
            <div className="flex flex-col font-cursive items-center space-y-2">
              <p className="text-2xl font-bold font-cursive">Product Info</p>
              <p className="text-2xl">{item.name}</p>
              <p className="text-2xl">Type: {item.type}</p>
              <p className="text-2xl">Level: {item.level}</p>
              <p className="text-2xl">Enchantment: {item.enchantment}</p>
              <p className="text-2xl">Quantity: {item.quantity}</p>

              <p className="text-2xl">Price: {item.price} Silver</p>
              <p className="text-2xl">Seller: {item.seller}</p>
              <p className="text-2xl">Sale ends: {item.sale_end[0]}</p>
              <p className="text-2xl">Description: {item.description}</p>
            </div>
          </div>
          <div className="flex justify-center pt-10">
            <Button onClick={handleCopySeller}>{buttonName}</Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">Item not found!</div>
      )}
    </div>
    
  )
}
