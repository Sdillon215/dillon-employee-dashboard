import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createTheme, ThemeProvider } from '@mui/material/styles';





import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';
import Signup from './pages/Signup';
import Nav from './components/Nav';
// import Footer from './components/Footer';
// import { StoreProvider } from "./utils/GlobalState";
// import OrderHistory from './pages/OrderHistory';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App(props) {

  return (
        <ApolloProvider client={client} {...props}>
          <Router>
            {/* <StoreProvider> */}
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/dashboard" component={Dashboard} />
              {/* <Route exact path="/signup" component={Signup} /> */}
              {/* <Route exact path="/orderHistory" component={OrderHistory} /> */}
              <Route component={NoMatch} />
            </Switch>
            {/* <Footer /> */}
            {/* </StoreProvider> */}
          </Router>
        </ApolloProvider>
  );
}

export default App;
