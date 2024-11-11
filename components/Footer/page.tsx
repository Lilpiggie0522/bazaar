"use client"
import { Button } from "../ui/button"

const FooterPage = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <div className="md:block flex items-center justify-between w-full">
        <Button size="sm" variant="ghost" onClick={() => alert("Not Implemented")}>
            Privacy Policy
        </Button>
        <Button size="sm" variant="ghost" onClick={() => alert("Not Implemented")}>
            Terms of Service
        </Button>
      </div>
    </div>
  )
}

export default FooterPage