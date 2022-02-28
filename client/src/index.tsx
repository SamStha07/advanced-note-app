import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Global } from '@emotion/react';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { globalStyles } from './components/GlobalStyle';
import { EXPRESS_URL, GRAPHQL_URL } from './constants';
import { getToken, isAuthenticated, saveToken } from './helpers/auth';
import reportWebVitals from './reportWebVitals';

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const refreshLink = new TokenRefreshLink({
  accessTokenField: 'token',
  isTokenValidOrUndefined: () => !isAuthenticated(),

  fetchAccessToken: () => {
    return fetch(`${EXPRESS_URL}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    });
  },
  handleFetch: (accessToken) => {
    return saveToken(accessToken);
  },
  handleError: (err) => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      return toast.error(message);
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([refreshLink, authLink, errorLink, httpLink]),
  credentials: 'include',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Global styles={globalStyles} />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
