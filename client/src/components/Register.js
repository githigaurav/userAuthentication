import React from 'react'
import Stack from '@mui/material/Stack'
import { TextField ,  Button} from '@mui/material'
function Register() {
  return (
    <>
               <Stack maxWidth={'md'} sx={{padding:1, gap:1 , height:'100svh', justifyContent:'center' , margin:'auto'}}>
               <TextField
               name='name'
                type='text'
                label="Name"
                placeholder='John Smith'
                />
                
                <TextField
                name='email'
                type='text'
                label="Email"
                placeholder='johnsmith@gmail.com'
                />
                 <TextField
                 name='password'
                type='password'
                label="Password"
                placeholder='****'
                />
                  <TextField
                  name='confirm_password'
                type='password'
                label="Confirm_Password"
                placeholder='****'
                />
                <Button variant='contained'>SignUP</Button>
               </Stack>
    </>
  )
}

export default Register