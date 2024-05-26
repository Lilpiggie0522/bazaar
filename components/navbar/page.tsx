"use client"
import React from 'react'
import { AppBar, Toolbar, Typography, Stack} from '@mui/material'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

const NavbarPage = () => {
  const handleOnClick = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json()
    const {message} = data
    console.log(message)
  }

  return (
    <AppBar position='sticky' color='transparent'>
        <Toolbar>
            <Image src={"/logo.png"} alt='bazaar' height={30} width={30} className='px-1'/>
            <Typography variant='h6' component={"div"} sx={{flexGrow: 1}} color={'black'}>
                Fennick Bazaar
            </Typography>
            
            <Stack direction={"row"} spacing={1}>
              <Button color='inherit' asChild>
                <Link href={"/"}>Home</Link>
              </Button>
              <Button color='inherit' asChild>
                <Link href={"/login"}>Login</Link>
              </Button>
              <Button color='inherit'>
                <Link href={"/sign-up"}>Sign-Up</Link>
              </Button>
              <Button color='inherit'>
                <Link href={"/about"}>About</Link>
              </Button>
              <Button color='inherit' onClick={handleOnClick}>
                Logout
              </Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default NavbarPage