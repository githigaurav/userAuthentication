import { Button, Stack, TextField } from '@mui/material'
import React from 'react'

function Login() {
  return (
    <>
    <Stack maxWidth={'md'} sx={{padding:1, gap:1 , height:'100svh', justifyContent:'center' , margin:'auto'}}>
            <TextField
            name='email'
            label="Email"
            placeholder='john@gmail.com'
            />
             <TextField
            name='password'
            label="password"
            placeholder='*******'
            />
            <Button
            variant='contained'
            >Login</Button>
        </Stack>

    </>
  )
}

export default Login