import { useMutation, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';

import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const input = { 
      credentials: { 
        username,
        password
      }
    };

    const { data } = await mutate({ variables: input });
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();

    return await mutate({ variables: input });
  };

  return [signIn, result];
};

export default useSignIn;
