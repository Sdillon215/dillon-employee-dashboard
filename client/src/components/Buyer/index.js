import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import Chart from '../Chart';
import OrderForm from '../OrderForm';


function Buyer() {
  const [state, dispatch] = useStoreContext();
  const { loading, data: prodData } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (prodData) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: prodData.products
      });

      prodData.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      });
    }
  }, [prodData, loading, dispatch]);
  
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
      <div class='blurContainer btm'>
        <Chart />
      </div>
    </Grid>
  );
};

export default Buyer;