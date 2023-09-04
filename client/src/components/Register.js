import React from 'react'
import Stack from '@mui/material/Stack'
import { TextField ,  Button} from '@mui/material'
function Register() {
  return (
    <>
               <Stack maxWidth={'md'} sx={{padding:1, gap:1 , height:'100svh', justifyContent:'center' , margin:'auto'}}>
               <TextField
                type='text'
                label="Name"
                placeholder='John Smith'
                />
                
                <TextField
                type='text'
                label="Email"
                placeholder='johnsmith@gmail.com'
                />
                 <TextField
                type='password'
                label="Password"
                placeholder='****'
                />
                <Button variant='contained'>SignUP</Button>
               </Stack>
    </>
  )
}

export default Register