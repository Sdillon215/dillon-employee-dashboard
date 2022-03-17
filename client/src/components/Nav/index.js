import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Auth from '../../utils/auth';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
export default function Nav(props) {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
     function renderButton() {
        if (token) {
            return (
          <Button onClick={Auth.logout} class='navBtn blurBtn' color="inherit">Logout</Button>
          )
        } else {
            return false;
        }
    };
    return (
        // <Box class="blurNav">
        //     <AppBar position="static" class="nav">
        //         <Toolbar>
        //             <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
        //                 Dillon Floral Corporation
        //             </Typography>
        //         </Toolbar>
        //             {renderButton()}
        //     </AppBar>
        // </Box>
<Box  sx={{ flexGrow: 1 }}>
      <AppBar  class='blurNav' position="fixed">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > */}
            {/* <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '30px' }}>
            Dillon Floral Corporation
          </Typography>
        {renderButton()}
        </Toolbar>
      </AppBar>
    </Box>
    );
};