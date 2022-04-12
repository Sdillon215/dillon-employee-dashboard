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
import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif'

    ].join(','),
  },
});

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});




function App() {

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <StoreProvider>
              <Nav />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route component={NoMatch} />
              </Switch>
            </StoreProvider>
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;