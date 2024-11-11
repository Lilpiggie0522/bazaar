"use client"
import localFont from "next/font/local"
import { cn } from "@/lib/utils"
import { Medal } from "lucide-react"
import { Poppins } from "next/font/google"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React from "react"

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
})

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const MarketingPage = () => {
  const router = useRouter()
  function handleEnterMarket(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    console.log("clicked!")
    router.push("/market")
  }

  return (
    <div style={{backgroundImage: "url('/albion.jpeg')", backgroundSize: "cover", height: "100vh"}}>
      <div className={cn("flex items-center justify-center flex-col pt-10", headingFont.className)}>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />No 1 Black Zone Market
        </div>
        <h1 className='text-3xl md:text-6xl text-center text-slate-50 mb-4'>Come to this Freeport!</h1>
        <div className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit items-center">
            Max out your profits now.
        </div>
        <div className={cn("text-sm md:text-xl text-white mt-4 max-w-xs md:max-w-2xl text-center mx-auto", textFont.className)}>
            Buy, sell and exchange your mechandise here tax-free. The only tax-free neutral freeport deep in the blackzone in all of Albion. Your one stop
            shop for ZVZ regear, market flipping and crafting material restock.
        </div>
        <Button className='mt-5' size={"lg"} onClick={handleEnterMarket}>
            Enter Freeport
        </Button>
      </div>
    </div>
  )
}

export default MarketingPage