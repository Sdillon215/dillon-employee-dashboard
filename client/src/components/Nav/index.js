import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Nav(props) {
    return (
        <Box class="blurNav">
            <AppBar position="static" class="nav">
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Dillon Floral Corporation
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};