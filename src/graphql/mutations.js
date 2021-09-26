import { gql } from '@apollo/client';
import { REPOSITORY_OVERVIEW } from './fragments';

export const SIGN_IN = gql`
  mutation signIn($credentials: AuthorizeInput!) {
    authorize(
      credentials: $credentials
    ) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(
      review: $review
    ) {
      id,
      user {
        id,
        username
      },
      repository {
        ...RepositoryOverview,
        url
      },
      userId,
      repositoryId,
      rating,
      createdAt,
      text
    }
  }
  ${REPOSITORY_OVERVIEW}
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(
      id: $id
    )
  }
`;

export const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(
      user: $user
    ) {
      id,
      username,
      createdAt,
      reviewCount
    }
  }
`;
