import { Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

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
            <Typography textAlign={'center'}>Don't have an account ? <Link to="/register">SignUp</Link></Typography>

        </Stack>

    </>
  )
}

export default Login