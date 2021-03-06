import * as React from 'react';
import Grid from '@mui/material/Grid';
import Chart from '../Chart';
import SalesOrderForm from '../SalesOrderForm';
import ProductList from '../ProductList';


function Sales() {

  
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
        <SalesOrderForm />
      </div>
      <div class='blurContainer'>
        <Chart />
      </div>
      <ProductList />
    </Grid>
  );
};

export default Sales;