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
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
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

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: 'rgba(46, 214, 138, 1)'
//     },
//     secondary: {
//       main: '#018754'
//     }
//   }
// });

function App(props) {

  return (
      // <ThemeProvider theme={theme}>
        <ApolloProvider client={client} {...props}>
          <Router>
            {/* <StoreProvider> */}
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              {/* <Route exact path="/orderHistory" component={OrderHistory} /> */}
              <Route component={NoMatch} />
            </Switch>
            {/* <Footer /> */}
            {/* </StoreProvider> */}
          </Router>
        </ApolloProvider>
      // </ThemeProvider>
  );
}

export default App;
