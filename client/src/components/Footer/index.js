import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer() {
    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center">
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
        <BottomNavigation sx={{ position: 'static', bottom: 0, left: 0, right: 0, bgcolor: 'secondary.main' }} elevation={3}>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </BottomNavigation>
    );
}
