import * as React from 'react';
import Grid from '@mui/material/Grid';
import Chart from '../Chart';
import OrderForm from '../OrderForm';


function Buyer() {

  return (
    <Grid container
      height='100vh'
      width='100vw'
      spacing={0}
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center">
      <div class='chart'>
        <Chart />
      </div>
    </Grid>
  );
};

export default Buyer;