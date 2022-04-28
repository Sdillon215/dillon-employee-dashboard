import * as React from 'react';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid';
import Login from '../components/Login';
import Auth from '../utils/auth';
import { Navigate } from 'react-router-dom';

function Home() {
const token = Auth.loggedIn() ? Auth.getToken() : null;

if (token) {
  return <Navigate to='/dashboard' />
} else {
  Swal.fire('To demo use Email: sales@email.com or buyer@email.com and Password: password');
}
  return (
    <Grid
      container
      height='80vh'
      width='100vw'
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Login />
    </Grid>
  );
};

export default Home;