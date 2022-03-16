import * as React from 'react';
import Grid from '@mui/material/Grid';
import Login from '../components/Login';


function Home() {

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