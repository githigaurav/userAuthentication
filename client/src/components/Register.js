import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import { TextField ,   Button, Alert, Typography} from '@mui/material'
import {useFormik} from 'formik'
import {regValidation} from './inputValidation/validation'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import {Link} from 'react-router-dom'
function Register() {
  const [render , setRender]=useState("Reg")
  const [response, setResponse]=useState(null)
  const [open, setOpen] = useState(false);

  
  const handleClose = () => {
    setOpen(false);
  };


  const formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      password:''
    },
    validationSchema:regValidation,
    onSubmit:function(values,{resetForm}){
      setRender("Load")
      const config={
        method:"POST",
        headers:{"Content-Type":"application/json"},
        withCredentials:true,
      }
      axios.post("http://localhost:3001/user/register", values , config)
      .then((response)=>{
        const data=response.data.message;
        setTimeout(()=>{
          setOpen(true)
        setResponse(data)
        setTimeout(()=>{          
          setOpen(false)
          setResponse("")
         

        },3000)
        },1500)
        resetForm()
        resetForm()
      })
      .catch((error)=>{       
        const response = error.response.data.message
       if(response === "User already exists"){
         setTimeout(() => {
           setRender("Reg")
           setOpen(true)
           setResponse(response)

           setTimeout(() => {
             setOpen(false)
             setResponse("")

           }, 3000)
         }, 1500)
         resetForm()
       }

      })
    }
  })
  // console.log(formik.errors)
  return (
    <>
               {render === "Reg" ? 
              <Stack maxWidth={'md'} sx={{padding:1, gap:1 , height:'100svh', justifyContent:'center' , margin:'auto'}}>
              <TextField
              name='name'
               type='text'
               label="Name"
               placeholder='John Smith'
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               />
               {formik.touched.name && formik.errors.name ? <Alert severity='error' variant='text' sx={{color:'#cc3300'}}>{formik.errors.name}</Alert> : null}
               <TextField
               name='email'
               type='text'
               label="Email"
               placeholder='johnsmith@gmail.com'
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               />
                {formik.touched.email && formik.errors.email ? <Alert severity='error' variant='text' sx={{color:'#cc3300'}}>{formik.errors.email}</Alert> : null}
                <TextField
                name='password'
               type='password'
               label="Password"
               placeholder='****'
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               />
                {formik.touched.password && formik.errors.password ? <Alert severity='error' variant='text' sx={{color:'#cc3300'}}>{formik.errors.password}</Alert> : null}
                 <TextField
                 name='confirm_password'
               type='password'
               label="Confirm_Password"
               placeholder='****'
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               />
                {formik.touched.confirm_password && formik.errors.confirm_password ? <Alert severity='error' variant='text' sx={{color:'#cc3300'}}>{formik.errors.confirm_password}</Alert> : null}
               <Button variant='contained' onClick={formik.handleSubmit}>SignUP</Button>
               <Typography textAlign={"center"}>Already have an account ? <Link to="/login">Login</Link></Typography>
              
               
              </Stack>
              : render === "Load" ? <Stack  maxWidth={'md'} sx={{padding:1, gap:1 , height:'100svh', justifyContent:'center', alignItems:'center' ,  margin:'auto'}}>

              <CircularProgress />
    
              </Stack> : null
              }
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error">
                  {response}
                </Alert>
              </Snackbar>
    </>
  )
}

export default Register