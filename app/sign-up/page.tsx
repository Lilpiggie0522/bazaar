"use client"
import { useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { useRouter } from "next/navigation"
import { Alert } from "@mui/material"

export interface registrationBody {
  username: string
  password: string
  confirm_password: string
}

export interface requestBody {
  username: string,
  password: string
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Lilpiggie0522
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default function SignUp() {
  const router = useRouter()
  const [okMessage, setOkmessage] = useState("")
  const [showOkMessage, setShowOkMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  function checkValidUserDetails(user: registrationBody) {
    const { username, password, confirm_password } = user
    if (!username || !password || !confirm_password) {
      // return NextResponse.json({ error: "username or password cannot be empty" }, { status: 406 })
      setErrorMessage("username and password cannot be empty")
      return showErrorOps()
    }
    const userRegex = /[^A-Za-z0-9]/
    if (userRegex.test(username)) {
      setErrorMessage("username can only contain alphabets and numbers")
      return showErrorOps()
    }

    if (password !== confirm_password) {
      // return NextResponse.json({ message: "passwords entered are not the same!" }, { status: 406 })
      setErrorMessage("passwords entered are not the same!")
      return showErrorOps()
    }

    if (password.length < 8) {
      // return NextResponse.json({ message: "passwords must be at least 8 character long" }, { status: 406 })
      setErrorMessage("passwords must be at least 8 character long")
      return showErrorOps()
    }

    const upper = /[A-Z]/
    const symbol = /[!@#$%^&*]/
    const lower = /[a-z]+/

    if (!upper.test(password) || !symbol.test(password) || !lower.test(password)) {
      // return NextResponse.json({ message: "passwords must contain at least 1 upper case letter, more than 1 lower case letter and one of the following symbol: !@#$%^&*" }, { status: 406 })
      setErrorMessage("passwords must contain at least 1 upper case letter, more than 1 lower case letter and one of the following symbol: !@#$%^&*")
      return showErrorOps()
    }
    return true
  }

  function showErrorOps() {
    setShowErrorMessage(true)
    return false
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    async function sendRequest(body: requestBody) {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      return response
    }

    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const username: string = data.get("username")?.toString() as string
    const password: string = data.get("password")?.toString() as string
    const confirm_password: string = data.get("confirm_password")?.toString() as string
    const stat = checkValidUserDetails({
      username: username,
      password: password,
      confirm_password: confirm_password
    })

    if (!stat) {
      return
    }

    const details = {
      username: username,
      password: password
    }

    const response = (await sendRequest(details))
    const { message } = await response.json()
    if (!response.ok) {
      setErrorMessage(message)
      setShowErrorMessage(true)
      return
    }
    setOkmessage(message)
    setShowOkMessage(true)
    setShowErrorMessage(false)
    setTimeout(() => {
      router.push("/login")
    }, 3000)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Alert severity="warning">Enter a mix of upper and lower case letters, numbers, and one of the following characters: !@#$%^&*</Alert>
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Enter password again"
            type="password"
            id="confirm_password"
            autoComplete="current-password"
          />
          {showOkMessage && <Alert severity="success">{`${okMessage}, redirecting you to login page in 3 seconds`}</Alert>}
          {showErrorMessage && <Alert severity="error">{`${errorMessage}`}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}