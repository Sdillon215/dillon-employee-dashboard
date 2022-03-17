import * as React from 'react';
import Grid from '@mui/material/Grid';
import Auth from '../utils/auth';
import Sales from '../components/Sales';
import Buyer from '../components/Buyer';
import {Redirect} from 'react-router-dom';

function Dashboard() {
const token = Auth.loggedIn() ? Auth.getProfile() : null;


if (!token) {
    return <Redirect to='/' />
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
    return <Redirect to='/' />
}
};

export default Dashboard;