import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/components/utils/apolloClient';

const App = () => {
  const apolloClient = createApolloClient();

  return (
  <NativeRouter>
    <ApolloProvider client={apolloClient}>
      <Main />
    </ApolloProvider>
  </NativeRouter>
  );
};

export default App;
