import { useQuery } from '@apollo/client';
import { VERIFY_USER } from '../graphql/queries';

const useVerifyUser = () => {
  const { data, error, loading } = useQuery(
    VERIFY_USER
  );

  return {
    data,
    error,
    loading
  };
};

export default useVerifyUser;
