"use client";
import { Alert, Button, TextField } from '@mui/material'
import Link from 'next/link';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const hideErrorMsg = () => {
    setTimeout(() => {
      setShowError(false)
    }, 1500);
  }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.value)
    setUsername(e.target.value)
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.value)
    setPassword(e.target.value)
  }
  
  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const response = await fetch("/api/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      router.push('/market')
      window.location.reload()
    }

    if (!response.ok) {
      const data = await response.json()
      const { message } = data
      setErrorMessage(message)
      setShowError(true)
      hideErrorMsg();
    }
  }

  return (
    <div className='bg-albion_color min-h-albion'>
      <div className='pt-20'>
        <h1 className='font-bold uppercase text-4xl text-center'>Login</h1>
        <form className='pt-5' onSubmit={handleOnSubmit}>
          <div className='flex justify-center'>
            <div className='flex flex-col'>
              <div className='flex items-center mb-10'>
                <label className='w-20 mr-2'>Username</label>
                <TextField id="filled-basic" label="username" variant="filled" color='success' sx={{ "& .MuiInputBase-input": { height: "10px" } }} onChange={handleUsername} />
              </div>
              <div className='flex items-center'>
                <label className='w-20 mr-2'>Password</label>
                <TextField id="filled-basic2" type='password' label="password" variant="filled" color='success' sx={{ "& .MuiInputBase-input": { height: "10px" } }} onChange={handlePassword} />
              </div>
              {
                showError &&
                <div className='mt-8'>
                  <Alert severity="error" variant='outlined'>{errorMessage}</Alert>
                </div>
              }
              <div className='mt-8 ml-24'>
                <Button className='font-semibold' variant="contained" type='submit'>Login</Button>
              </div>
              <div className='ml-52'>
                <Button className='text-black font-sans' onClick={handleClickOpen} sx={{ textTransform: "none" }}>Forgot password?</Button>
              </div>
              <div className='ml-52'>
                <Button className='text-black font-sans' sx={{ textTransform: "none" }}>
                  <Link href={"/sign-up"}>Create an account</Link>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Forgot your password? Really?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Too bad, I can&apos;t help you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus sx={{ fontFamily: "inherit" }}>
            OK Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default LoginPage