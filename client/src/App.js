import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';
import Signup from './pages/Signup';
import Nav from './components/Nav';
// import { StoreProvider } from "./utils/GlobalState";

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
              <Route component={NoMatch} />
            </Switch>
            {/* </StoreProvider> */}
          </Router>
        </ApolloProvider>
  );
}

export default App;