import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import dillon from '../assets/images/Dillon-Floral-sm.png';
import Container from '@mui/material/Container';



function Home() {

  return (
    <Container maxWidth='md'>
    <Grid container
      height='400px'
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <img src={dillon} alt='dillon-logo' />
      <Button href="/Login" variant="contained" class="blurBtn">
        {"Buyer Login"}
      </Button>
      <Button href="/salesLogin" variant="contained" class="blurBtn">
        {"Sales Login"}
      </Button>

    </Grid>
      </Container>
  );
};

export default Home;