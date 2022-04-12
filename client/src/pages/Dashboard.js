import React, { useEffect } from 'react';
import Auth from '../utils/auth';
import Sales from '../components/Sales';
import Buyer from '../components/Buyer';
import { Navigate } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';
import { useQuery } from '@apollo/client';
import { QUERY_DEPARTMENTS } from '../utils/queries';
import { UPDATE_DEPARTMENTS, UPDATE_PRODUCTS } from '../utils/actions';

function Dashboard() {
  const [state, dispatch] = useStoreContext();
  const { currentDepartment } = state;
  const { loading, data: depData } = useQuery(QUERY_DEPARTMENTS);
  const token = Auth.loggedIn() ? Auth.getProfile() : null;

  useEffect(() => {
    if (depData) {
      dispatch({
        type: UPDATE_DEPARTMENTS,
        departments: depData.departments
      });
      depData.departments.forEach((departments) => {
        idbPromise('departments', 'put', departments);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `departments` store
      idbPromise('departments', 'get').then((departments) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_DEPARTMENTS,
          departments: departments
        });
      });
    }
    if (currentDepartment) {
      const curDep = depData.departments.find((department) => department._id === currentDepartment._id);
      dispatch({
        type: UPDATE_PRODUCTS,
        products: curDep.products
      });

    }
  }, [depData, dispatch, loading, currentDepartment]);


  if (!token) {
    return <Navigate to='/' />
  }
  if (token.data.dept === 'Sales') {
    return (
      <Sales />
    );
  } if (token.data.dept === 'Buyer') {
    return (
      <Buyer />
    );
  } else {
    return <Navigate to='/' />
  }
};

export default Dashboard;