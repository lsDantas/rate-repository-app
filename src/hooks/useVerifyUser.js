import { useQuery } from '@apollo/client';
import { VERIFY_USER } from '../graphql/queries';

const useVerifyUser = (includeReviews = false, numFirstEntries = 5) => {
  // Prepare Variables
  const variables = (includeReviews)
    ? { includeReviews, first: numFirstEntries }
    : {};

  // Query Server
  const { data, loading, fetchMore, ...result } = useQuery(
    VERIFY_USER,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    }
  );

  // Determine Fetch Procedure
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.authorizedUser.reviews.pageInfo.hasNextPage;

    if(!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      }
    });
  };

  return {
    data,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useVerifyUser;
