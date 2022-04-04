import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';
import { useQuery } from '@apollo/client';
import { QUERY_DEP_ORDERS } from '../../utils/queries';
import { UPDATE_DEP_ORDERS } from '../../utils/actions';
import Chart from '../Chart';
import OrderForm from '../OrderForm';


function Buyer() {
	const [state, dispatch] = useStoreContext();
	const { loading, data: depData } = useQuery(QUERY_DEP_ORDERS);

	useEffect(() => {
		if (depData) {
		  dispatch({
			type: UPDATE_DEP_ORDERS,
			depOrders: depData.departments
		  });
	
		  depData.departments.forEach((depOrders) => {
			idbPromise('depOrders', 'put', depOrders);
		  });
		  // add else if to check if `loading` is undefined in `useQuery()` Hook
		} else if (!loading) {
		  // since we're offline, get all of the data from the `products` store
		  idbPromise('depOrders', 'get').then((depOrders) => {
			// use retrieved data to set global state for offline browsing
			dispatch({
			  type: UPDATE_DEP_ORDERS,
			  depOrders: depOrders
			});
		  });
		}
	}, [depData, dispatch]);
  
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