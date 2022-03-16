import * as React from 'react';
import Grid from '@mui/material/Grid';
import Login from '../components/Login';
import Auth from '../utils/auth';
import {Redirect} from 'react-router-dom';

function Home() {
const token = Auth.loggedIn() ? Auth.getToken() : null;

if (token) {
  return <Redirect to='/dashboard/' />
} 
  return (
    <Grid
      container
      height='100vh'
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