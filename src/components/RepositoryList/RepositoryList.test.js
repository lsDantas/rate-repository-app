import React from 'react';
import { render } from '@testing-library/react-native';

import { RepositoryListContainer } from './index';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      // Identify Text Elements
      const fullNames = getAllByTestId('repository-full-name');
      const descriptions = getAllByTestId('repository-description');
      const languages = getAllByTestId('repository-language');
      const numbersPanels = getAllByTestId('numbers-panel-number');

      // Check for Repository Data
      repositories.edges.forEach((entry, index) => {
        const { 
          fullName, 
          description, 
          language, 
          stargazersCount, 
          forksCount,
          reviewCount,
          ratingAverage 
        } = entry.node;

        // Entry Text
        expect(fullNames[index]).toHaveTextContent(fullName);
        expect(descriptions[index]).toHaveTextContent(description);
        expect(languages[index]).toHaveTextContent(language);

        // Entry Numbers
        const inKNotation = (number) => { 
          return (number > 1000)
            ? `${(number / 1000).toFixed(1)}k`
            : `${number}`;
        };

        const basePos = index * 4;
        expect(numbersPanels[basePos]).toHaveTextContent(inKNotation(stargazersCount));
        expect(numbersPanels[basePos + 1]).toHaveTextContent(inKNotation(forksCount));
        expect(numbersPanels[basePos + 2]).toHaveTextContent(inKNotation(reviewCount));
        expect(numbersPanels[basePos + 3]).toHaveTextContent(inKNotation(ratingAverage));
      });
      
    });
  });
});