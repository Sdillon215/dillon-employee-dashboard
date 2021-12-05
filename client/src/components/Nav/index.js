// import React from "react";
// import Auth from "../../utils/auth";
// import { Link } from "react-router-dom";
// import dillon from '../../assets/Dillon-Floral-sm.png';

// function Nav() {

//     function showNavigation() {
//         if (Auth.loggedIn()) {
//             return (
//                 <ul className="flex-row">
//                     <li className="mx-1">
//                         {/* <Link to="/orderHistory">
//                             Order History
//                         </Link> */}
//                     </li>
//                     <li className="mx-1">
//                         {/* this is not using the Link component to logout or user and then refresh the application to the start */}
//                         <a href="/" onClick={() => Auth.logout()}>
//                             Logout
//                         </a>
//                     </li>
//                 </ul>
//             );
//         } else {
//             return (
//                 <ul className="flex-row">
//                     <li className="mx-1">
//                         <Link to="/signup">
//                             Signup
//                         </Link>
//                     </li>
//                     <li className="mx-1">
//                         <Link to="/login">
//                             Login
//                         </Link>
//                     </li>
//                 </ul>
//             );
//         }
//     }

//     return (
//         <header className="flex-row px-1 nav">
//             <h1>
//                 <Link to="/">
//                     <span aria-label="Dillon Floral Logo">
//                     <img alt="Dillon Floral Logo" src={dillon} />
//                     </span>
//                     -Shop-Shop
//                 </Link>
//             </h1>

//             <nav>
//                 {showNavigation()}
//             </nav>
//         </header>
//     );
// }

// export default Nav;

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Nav() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" class="nav">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Dillon Floral Corporation
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};