import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, numFirstEntries) => {
  // Prepare Variables
  const variables = {
    id,
    first: numFirstEntries,
  };

  // Query Server
  const { data, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORY,
    { 
      variables,
      fetchPolicy: 'cache-and-network', 
    }
  );
  
  // Establish Fetch Procedure
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if(!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      }
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;
