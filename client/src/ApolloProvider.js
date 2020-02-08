import React from "react";
import ApolloClient from 'apollo-client';
import { InMemoryCache} from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

import App from "./App";

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const authContext = setContext(() => {
  const token = localStorage.getItem('jwtToken');

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authContext.concat(httpLink),
  cache: new InMemoryCache(),
});

const Provider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Provider;
