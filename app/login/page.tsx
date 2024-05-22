"use client"

import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const LoginPage = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
    <div className='bg-albion_color min-h-albion'>
        <div className='pt-20'>
            <h1 className='font-bold uppercase text-4xl text-center'>Login</h1>
            <form action="" className='pt-5'>
                <div className='flex justify-center'>
                    <div className='flex flex-col'>
                        <div className='flex items-center mb-10'>
                            <label className='w-20 mr-2'>Username</label>
                            <TextField id="filled-basic" label="username" variant="filled" color='success'sx={{"& .MuiInputBase-input": {height: "10px"}}}/>
                        </div>
                        <div className='flex items-center'>
                            <label className='w-20 mr-2'>Password</label>
                            <TextField id="filled-basic" type='password' label="password" variant="filled" color='success' sx={{"& .MuiInputBase-input": {height: "10px"}}}/>
                        </div>
                        <div className='mt-8 ml-24'>
                            <Button className='font-semibold' variant="contained">Login</Button>
                        </div>
                        <div className='ml-52'>
                            {/* <a href="" onClick={() => {alert("too bad!")}}>Forgot your password</a> */}
                            <Button className='text-black font-sans' onClick={handleClickOpen} sx={{textTransform: "none"}}>Forgot your password?</Button>
                        </div>
                        <div className='ml-52'>
                            <Button className='text-black font-sans' sx={{textTransform: "none"}}>
                                <Link href={"/register"}>Register Account</Link>
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
                  Too bad, I can't help you.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus sx={{fontFamily: "inherit"}}>
                  OK Agree
                </Button>
              </DialogActions>
            </Dialog>
    </div>
  )
}

export default LoginPage