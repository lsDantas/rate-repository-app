import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../graphql/queries';

const useRepositories = (selectedOrder, searchKeyword, numFirstEntries) => {
  // Determine Ordering
  const orderBy = (selectedOrder === 'latest') ? "CREATED_AT" : "RATING_AVERAGE";
  const orderDirection = (selectedOrder === 'highest') ? "DESC" : "ASC";

  const variables = {
    orderBy,
    orderDirection,
    searchKeyword,
    first: numFirstEntries,
  };

  // Query Server
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    }
  );

  // Establish Fetch Procedure
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      }
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
