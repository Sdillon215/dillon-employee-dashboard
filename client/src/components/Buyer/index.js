import React from 'react';
import Grid from '@mui/material/Grid';
import Chart from '../Chart';
import OrderForm from '../OrderForm';
import ProductList from '../ProductList';


function Buyer() {
  
  return (
    <Grid container
      height='100%'
      width='100vw'
      spacing={0}
      display="flex"
      flexWrap={'nowrap'}
      direction="column"
      alignItems="center"
      justifyContent="center">
      <div class='blurContainer'>
        <OrderForm />
      </div>
      <div class='blurContainer'>
        <Chart />
      </div>
      <ProductList />
    </Grid>
  );
};

export default Buyer;