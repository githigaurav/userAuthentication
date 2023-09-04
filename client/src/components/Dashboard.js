import React from 'react'
import Grid from '@mui/material/Grid'
import { Stack, Box, Avatar, Typography, Container, Button, Table, TableContainer, TableBody, TableRow, TableCell, TableHead  } from '@mui/material'
import Divider from '@mui/material/Divider';

function Dashboard() {
  return (
    <>
        <Container maxWidth={'lg'} sx={{textAlign:'right', marginTop:"1rem"}}>
            <Button variant='contained'>LogOut</Button>
            
            </Container>
          <Grid container  maxWidth={'lg'} sx={{backgroundColor:'#fafafa', margin:'auto' ,boxShadow:2 , marginTop:3}}>

              <Grid item xs={12} md={6} lg={6} xl={6} >
                  <Stack maxWidth={'md'} sx={{backgroundColor:'#fafafa', padding:"2rem",  flexDirection:{xd:'column', md:'row'}, justifyContent:{xs:"center"},  alignItems:'center' }}>
                    <Box>
                    <Avatar sx={{padding:"2rem", height:{xs:"7rem", md:"7rem" , lg:'10rem'}, width:{xs:"7rem", md:"7rem" , lg:'10rem'}}}>G</Avatar>
                    </Box> 
                    <Box sx={{padding:'2rem'}}>
                              <Typography varieant={"h3"} fontSize={{xs:"2rem", md:'2rem'}}>Gaurav Kumar</Typography>
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
                                <TableCell>Availability</TableCell>
                                <TableCell>Yes</TableCell>
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
              
    </>
  )
}

export default Dashboard