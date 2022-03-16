import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import dillon from '../assets/Dillon-Floral-sm.png';
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
      marginTop="auto"
      marginBottom="auto"
    >
      <img src={dillon} alt='dillon-logo' />
      <Button href="/Login" variant="contained" sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '25%',
        height: '25%',
        bgcolor: '#018754',
        p: 1,
        m: 1
      }}>
        {"Buyer Login"}
      </Button>
      <Button href="/salesLogin" variant="contained" sx={{
        display: 'flex',
        justifyContent: 'center',
        bgcolor: '#018754',
        width: '25%',
        height: '25%',
        p: 1,
        m: 1
      }}>
        {"Sales Login"}
      </Button>

    </Grid>
      </Container>
  );
};

export default Home;