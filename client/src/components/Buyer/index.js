import * as React from 'react';
import Grid from '@mui/material/Grid';
import Chart from '../Chart';


function Buyer() {

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
    <Chart />
    </Grid>
  );
};

export default Buyer;