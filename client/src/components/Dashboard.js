import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Stack, Box, Avatar, Typography, Container, Button, Table, TableContainer, TableBody, TableRow, TableCell, Tabs, Alert  } from '@mui/material'
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Dashboard() {
    const navigate =useNavigate()
    const [tab, setTab]=useState(0)
    const [response, setResponse]=useState(null)
    const [open, setOpen] = useState(false);
    const [login , setLogin]=useState(false)
    const handleTab=(event , newEvent)=>{
        setTab(newEvent)

    }

    const handleClose = () => {
        setOpen(false);
      };
    
      const handleLogout=()=>{
        setLogin((pre)=> !pre)
        setResponse(null)
        Cookies.remove("token",{path:''})
        setTimeout(()=>{
            navigate("/login")
        },1500)
      }
    useEffect(() => {
        axios.get("http://localhost:3001/user/info", { withCredentials: true })
          .then((data) => {
            setResponse(data.data.rest);
          })
          .catch((error) => {
            const errmsg=["jwt expired","jwt must be provided","invalid signature","Login is required"]
                const response =error.response.data.message
                if(errmsg.includes(response)){
                    setOpen(true)
                    setTimeout(()=>{
                        setOpen(false)
                        navigate("/login")
                    },3000)
                }
          });
      }, [navigate]); // Empty dependency array means this effect will run once after the initial render
      
  return (
    <>
      { response !==null ? 
      <main>
      <Container maxWidth={'lg'} sx={{textAlign:'right', marginTop:"1rem"}}>
          <Button variant='contained' onClick={handleLogout}>LogOut</Button>
          
          </Container>
        <Grid container  maxWidth={'lg'} sx={{backgroundColor:'#fafafa', margin:'auto' ,boxShadow:2 , marginTop:3}}>

            <Grid item xs={12} md={6} lg={6} xl={6} >
                <Stack maxWidth={'md'} sx={{backgroundColor:'#fafafa', padding:"2rem",  flexDirection:{xd:'column', md:'row'}, justifyContent:{xs:"center"},  alignItems:'center' }}>
                  <Box>
                  <Avatar sx={{padding:"2rem", height:{xs:"7rem", md:"7rem" , lg:'10rem'}, width:{xs:"7rem", md:"7rem" , lg:'10rem'}}}>G</Avatar>
                  </Box> 
                  <Box sx={{padding:'2rem'}}>
                            <Typography varieant={"h3"} fontSize={{xs:"2rem", md:'2rem'}}>{response.name}</Typography>
                            <Divider/>
                            <Typography sx={{textAlign:{xs:'center', md:'right'}}}>Full Stack Developer</Typography>
                            
                            <Box sx={{paddingTop:"1rem"}}>
                               <Button variant='contained'>Contact</Button>
                               <Button variant='contained' sx={{marginLeft:"1rem"}}>Resume</Button>
                            </Box>                            
                  </Box>
                </Stack> 
            </Grid>
            {/* <Divider orientation="vertical" flexItem /> */}
            <Grid item xs={12} md={6} lg={6} xl={6} sx={{padding:"2rem"}} >
              <TableContainer>
                  <Table >
                      <TableBody>
                      <TableRow>
                              <TableCell>Email</TableCell>
                              <TableCell>{response.email}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell>Age</TableCell>
                              <TableCell>26</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell>Location</TableCell>
                              <TableCell>Yes</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell>Experience</TableCell>
                              <TableCell>10 Years</TableCell>
                          </TableRow>
                      </TableBody>
                  </Table>
              </TableContainer>
            </Grid>
        </Grid> 
       <Grid container maxWidth={'lg'} sx={{margin:'auto'}}>
       <Tabs
             
             sx={{boxShadow:1, width:"100%"}}
             value={tab}
             onChange={handleTab}
             >
             <Tab label="About"/>
             </Tabs>
       </Grid>
       </main> : null  
    }
          <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error">
                "Session is expired , You will be redirected to  login page"
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
    </>
  )
}

export default Dashboard