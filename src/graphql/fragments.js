import { gql } from '@apollo/client';

export const REPOSITORY_OVERVIEW = gql`
  fragment RepositoryOverview on Repository {
      id,
      fullName,
      description,
      language,
      forksCount,
      stargazersCount,
      ratingAverage,
      reviewCount,
      ownerAvatarUrl,
  }
`;
