import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer() {
    function Copyright(props) {
        return (
            <Typography component="div" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://dillonfloral.com/">
                    Dillon Floral Corporation
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <BottomNavigation sx={{ position: 'static', bottom: 0, width: '100%', bgcolor: 'secondary.main' }}>
            <Copyright />
        </BottomNavigation>
    );
}
