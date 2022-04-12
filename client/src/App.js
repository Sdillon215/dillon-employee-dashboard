import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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


function App() {

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <StoreProvider>
              <Nav />
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/dashboard" element={<Dashboard/>} />
                <Route element={<NoMatch/>} />
              </Routes>
            </StoreProvider>
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;