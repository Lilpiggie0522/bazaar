"use client"
import React from "react"
import { AppBar, Toolbar, Typography, Stack } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

const NavbarPage = () => {
  const router = useRouter()
  const handleLogOut = async () => {
    const response = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    if (response.ok) {
      router.push("/login")
      window.location.reload()
    }
  }

  return (
    <AppBar position='sticky' color='default'>
      <Toolbar>
        <Image src={"/logo.png"} alt='bazaar' height={30} width={30} className='px-1' />
        <Typography variant='h6' component={"div"} sx={{ flexGrow: 1 }} color={"black"}>
          <Link href={"/"}>
            Fenwick Bazaar
          </Link>
        </Typography>

        <Stack direction={"row"} spacing={1}>
          <Button color='inherit' asChild>
            <Link href={"/"}>Home</Link>
          </Button>
          <Button color='inherit' asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button color='inherit' asChild>
            <Link href={"/about"}>About</Link>
          </Button>
          <Button color='inherit' onClick={handleLogOut}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default NavbarPage