import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {Box, Button, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const[menu, setMenu]=useState(null)
  const handleMenu=()=>{
    setMenu((prev)=> !prev)
  }
  
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
              User Authentication
          </Typography>

          <Box sx={{display:{xs:'none', md:'flex'}}}>
            <Button sx={{color:"white"}}>Home</Button>
            <Button sx={{color:"white"}}>Login</Button>            
          </Box>

          <Box sx={{display:{xs:'flex', md:'none'}}}>
              <IconButton onClick={handleMenu}>
                <MenuIcon sx={{color:"white", fontSize:'2.5rem'}}/>
              </IconButton>
          </Box>

{/* menu will appear after click */}
          <Box>
              <Menu  anchorEl={menu}
            keepMounted
            open={Boolean(menu)}
            onClose={handleMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
         
            sx={{
              display:{xs:'block', md:'none'},
              marginTop:5
            }}
            >
                  <MenuItem>
                    <Typography  color="initial">Home</Typography>
                  </MenuItem>
              </Menu>
          </Box>

         
          
        </Toolbar>
        
      </AppBar>
    </>
  )
}

export default Navbar