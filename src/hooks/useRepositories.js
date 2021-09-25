import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (ordering) => {
  // Determine Ordering
  const orderBy = (ordering === 'latest') ? "CREATED_AT" : "RATING_AVERAGE";
  const orderDirection = (ordering === 'highest') ? "DESC" : "ASC";

  const input = { 
    orderBy,
    orderDirection
  };

  // Query Server
  const { data, error, loading } = useQuery(
    GET_REPOSITORIES,
    { 
      fetchPolicy: 'cache-and-network', 
      variables: input,
    }
  );

  return { 
    repositories: data ? data.repositories : undefined, 
    error, 
    loading 
  };
};

export default useRepositories;
