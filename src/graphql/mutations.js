import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($credentials: AuthorizeInput!) {
    authorize(
      credentials: $credentials
    ) {
      accessToken
    }
  }
`;
