import React, { useEffect, useState } from 'react';
import { Grid, Stack, Box, Avatar, Typography, Container, Button, Table, TableContainer, TableBody, TableRow, TableCell, Tabs, Alert, Divider, Tab, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { updateUser } from './inputValidation/validation';
import {useFormik} from 'formik'



const Dashboard = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(false);
    const [response, setResponse] = useState(null);
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [disabled , setDisable]=useState(true)

    // custome toast for update information
    const [update, setUpdate]=useState(false)
    const [updateRes, setUpdateRes]=useState(null)
    const[toast, setToast]=useState("success")
    const[render, setRender]=useState(false)

    const formik = useFormik({
      initialValues:{
        email:'',
        age:'',
        location:'',
        experience:''
      },
      validationSchema:updateUser,
      onSubmit:function(values, {resetForm}){
          axios.put("http://localhost:3001/user/update", values, {withCredentials:true})
          .then((data)=>{
          const serverResponse = data.data.message 
          console.log(serverResponse)
          setToast("success")   
          setResponse({...response, serverResponse})                 
          setUpdateRes(serverResponse)           
          setUpdate(true)
       
            setTimeout(()=>{
                
                setUpdateRes(null) 
 
                setUpdate(false)
                setDisable(true)
                setRender((pre)=>!pre)
            },1500)
            
          })
          .catch((error)=>{
          
            const serverResponse = error.response.data.message
            console.log(serverResponse)                     
            setUpdateRes(serverResponse) 
            setToast("error")
            setUpdate(true)
              setTimeout(()=>{                
                  setUpdateRes(null)   
                  setUpdate(false)
                //   setDisable(true)                  
              },1500)
              
          })
         
      }
      
    })

    const handleTab = (event, newEvent) => {
        setTab(newEvent);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleLogout = () => {
        setLogin(prev => !prev);
        setResponse(null);
        Cookies.remove("token", { path: '' });
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    useEffect(() => {
        axios.get("http://localhost:3001/user/info", { withCredentials: true })
            .then((data) => {
                setResponse(data.data.rest);
                
            })
            .catch((error) => {
                const errorMessages = ["jwt expired", "jwt must be provided", "invalid signature", "Login is required", "No token provided","Invalid token"];
                const response = error.response.data.message;
                if (errorMessages.includes(response)) {
                    setOpen(true);
                    setTimeout(() => {
                        setOpen(false);
                        navigate("/login");
                    }, 3000);
                }
            });
    }, [navigate, render]);

    return (
        <>
            {response && (
                <main>
                    <Container maxWidth={'lg'} sx={{ textAlign: 'right', marginTop: "1rem" }}>
                        <Button variant='contained' onClick={handleLogout}>LogOut</Button>
                    </Container>
                    <Grid container maxWidth={'lg'} sx={{ backgroundColor: '#fafafa', margin: 'auto', boxShadow: 2, marginTop: 3 }}>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <Stack maxWidth={'md'} sx={{ backgroundColor: '#fafafa', padding: "2rem", flexDirection: { xd: 'column', md: 'row' }, justifyContent: { xs: "center" }, alignItems: 'center' }}>
                                <Box>
                                    <Avatar sx={{ padding: "2rem", height: { xs: "7rem", md: "7rem", lg: '10rem' }, width: { xs: "7rem", md: "7rem", lg: '10rem' } }}>G</Avatar>
                                </Box>
                                <Box sx={{ padding: '2rem' }}>
                                    <Typography variant={"h3"} fontSize={{ xs: "2rem", md: '2rem' }}>{response.name}</Typography>
                                    <Divider />
                                    <Typography sx={{ textAlign: { xs: 'center', md: 'right' } }}>Full Stack Developer</Typography>
                                    <Box sx={{ paddingTop: "1rem" }}>
                                        <Button variant='contained'>Contact</Button>
                                        <Button variant='contained' sx={{ marginLeft: "1rem" }}>Update</Button>
                                    </Box>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={6} sx={{ padding: "2rem" }}>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Email</TableCell>
                                            {response.data[0].email ? <TableCell>{response.data[0].email}</TableCell> : response.email ? <TableCell>{response.email}</TableCell> : null }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Age</TableCell>
                                            {response.data[0].age ? <TableCell>{response.data[0].age}</TableCell> : null}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Location</TableCell>
                                            {response.data[0].location ? <TableCell>{response.data[0].location}</TableCell> : null}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Experience</TableCell>
                                            {response.data[0].experience ? <TableCell>{response.data[0].experience}</TableCell> : null}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid container maxWidth={'lg'} sx={{ margin: 'auto' }}>
                        <Tabs
                            sx={{ boxShadow: 1, width: "100%" , marginY:2}}
                            value={tab}
                            onChange={handleTab}
                        >
                            <Tab label="About" />
                            <Tab label="Ananouncement" />
                        </Tabs>
                    </Grid>
                </main>
            )}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    "Session is expired, You will be redirected to login page"
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={login}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    "Logout Successfully"
                </Alert>
            </Snackbar>

            {tab === 0 ? 
          <Container maxWidth={"lg"} sx={{backgroundColor:'#fafafa', boxShadow:1}}>
          <Stack sx={{padding:3, gap:2}}>
              {/* <TextField
                label="email"
                name='email'
                placeholder='sample@gmail.com'
                disabled={disabled}
                onChange={formik.handleChange}
                onBlurCapture={formik.handleBlur}
              />
           {formik.touched.email && formik.errors.email ? <Alert severity='error' variant='text' sx={{color:'#cc3300'}}>{formik.errors.email}</Alert> : null} */}
              <TextField
                label="Age"
                name='age'
                placeholder='your current Age'
                disabled={disabled}
                onChange={formik.handleChange}
                onBlurCapture={formik.handleBlur}
              />
              {formik.touched.age && formik.errors.age ? <Alert severity='error' variant='text' sx={{color:'#cc3300'}}>{formik.errors.age}</Alert> : null}
              <TextField
                label="Location"
                name='location'
                placeholder='Saharanpur, Uttar Pradesh'
                disabled={disabled}
                onChange={formik.handleChange}
                onBlurCapture={formik.handleBlur}
              />
              {formik.touched.location && formik.errors.locatoin ? <Alert severity='error' variant='text' sx={{color:'#cc3300'}}>{formik.errors.location}</Alert> : null}
              <TextField
                label="Experience"
                name='experience'
                placeholder='ex 10 years'
                disabled={disabled}
                onChange={formik.handleChange}
                onBlurCapture={formik.handleBlur}
              />
              {formik.touched.experience && formik.errors.experience ? <Alert severity='error' variant='text' sx={{color:'#cc3300'}}>{formik.errors.experience}</Alert> : null}
              {disabled ? 
              <Button variant='contained' onClick={()=> setDisable(false)}>Edit</Button>
               :
               <>
               <Button variant='contained' onClick={formik.handleSubmit}>Update</Button>
               <Button variant='contained' onClick={()=>setDisable((pre)=> !pre)}>Cancel</Button>
               </> 
               }
          </Stack>
        </Container>
        : null  
          }
          <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={update}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity={toast}>
                  {updateRes}
                </Alert>
              </Snackbar>
        </>
    );
}

export default Dashboard;
