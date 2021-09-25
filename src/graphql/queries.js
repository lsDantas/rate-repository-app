import { gql } from '@apollo/client';
import { REPOSITORY_OVERVIEW } from './fragments';

export const GET_REPOSITORIES = gql`
  query GetRepositories ($after: String, $orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $first: Int) {
    repositories (
      after: $after,
      orderDirection: $orderDirection,
      orderBy: $orderBy,
      searchKeyword: $searchKeyword,
      first: $first
    ) {
      edges {
        node {
          ...RepositoryOverview
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
	  }
  }
  ${REPOSITORY_OVERVIEW}
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryOverview,
      url,
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${REPOSITORY_OVERVIEW}
`;

export const VERIFY_USER = gql`
  query VerifyUser {
    authorizedUser {
      id
      username
    }
  }
`;
