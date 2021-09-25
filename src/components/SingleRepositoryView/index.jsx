import React from 'react';
import { useParams } from 'react-router-native';

import { FlatList, StyleSheet, View } from 'react-native';

import useRepository from '../../hooks/useRepository';

import RepositoryItem from '../RepositoryList/RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  contentContainer: {
    paddingBottom: 250,
  },
  separator: {
    height: 10,
    backgroundColor: '#c5c5c5',
  },
});

const RepositoryInfo = ({ repository }) => {
  return ( 
    <>
      <RepositoryItem item={repository} />
      <View style={styles.separator} />
    </>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  // Loading
  if (!repository) {
    return <></>;
  }

  return (
    <FlatList
      data={repository.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepositoryView;
