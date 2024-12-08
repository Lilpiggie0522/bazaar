"use client"
import { Alert, Button, TextField } from "@mui/material"
import Link from "next/link"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLocalStorageState } from "@/context/userContext"

const LoginPage = () => {
  const [, setUserId] = useLocalStorageState("userId", "")
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const hideErrorMsg = () => {
    setTimeout(() => {
      setShowError(false)
    }, 1500)
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
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })

    if (response.ok) {
      const { id } = await response.json()
      console.log(id)
      setLoggedIn(true)
      setUserId(id)
      setTimeout(() => {
        router.push("/market")
        window.location.reload()
      }, 1000)
    }

    if (!response.ok) {
      const data = await response.json()
      const { message } = data
      setErrorMessage(message)
      setShowError(true)
      hideErrorMsg()
    }
  }

  return (
    <div className='min-h-screen'>
      {
        loggedIn &&
        <div className="flex justify-center pt-5">
          <Alert severity="success" className="fixed">Login Successful!</Alert>
        </div>
      }
      <div className='py-20 flex flex-col justify-center items-center'>
        <div className='flex justify-center'>
          <h3 className='text-4xl font-cursive'>Sign in</h3>
        </div>
        <form className='pt-5' onSubmit={handleOnSubmit}>
          <div className='flex flex-col justify-center items-center'>
            <div className='flex items-center mb-10'>
              <TextField id="filled-basic" label="username" variant="filled" required={true} color='success' sx={{ "& .MuiInputBase-input": { height: "10px" } }} onChange={handleUsername} />
            </div>
            <div className='flex items-center'>
              <TextField id="filled-basic2" type='password' label="password" required={true} variant="filled" color='success' sx={{ "& .MuiInputBase-input": { height: "10px" } }} onChange={handlePassword} />
            </div>
            {
              showError &&
              <div className='mt-8'>
                <Alert severity="error" variant='outlined'>{errorMessage}</Alert>
              </div>
            }
            <div className='pt-5 space-x-1'>
              <Button className='text-black font-sans' onClick={handleClickOpen} sx={{ textTransform: "none" }}>Forgot password?</Button>
              <button type='submit' className='text-white py-1 px-5 bg-blue-500 rounded-sm font-semibold'>Login</button>
            </div>

            <div className='flex pt-10 space-x-2'>
              <p>New to Bazaar?</p>
              <Link href={"/sign-up"} className='underline font-semibold'>Create an account</Link>
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