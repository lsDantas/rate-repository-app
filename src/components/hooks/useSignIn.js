import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const input = { 
      credentials: { 
        username,
        password
      }
    };

    return await mutate({ variables: input });
  };

  return [signIn, result];
};

export default useSignIn;
