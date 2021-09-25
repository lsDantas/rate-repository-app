import { gql } from '@apollo/client';
import { REPOSITORY_OVERVIEW } from './fragments';

export const GET_REPOSITORIES = gql`
  query GetRepositories ($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
    repositories (
      orderDirection: $orderDirection,
      orderBy: $orderBy
    ) {
      edges {
        node {
          ...RepositoryOverview
        }
      }
	  }
  }
  ${REPOSITORY_OVERVIEW}
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryOverview,
      url,
      reviews {
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
