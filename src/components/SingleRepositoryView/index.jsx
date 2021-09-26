import React from 'react';
import { useParams } from 'react-router-native';

import { FlatList, StyleSheet, View } from 'react-native';

import RepositoryItem from '../RepositoryList/RepositoryItem';
import ReviewItem from './ReviewItem';

import useRepository from '../../hooks/repositories/useRepository';

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
  const numFirstEntries = 3;
  const { repository, fetchMore } = useRepository(id, numFirstEntries);

  // Loading
  if (!repository) {
    return <></>;
  }

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={repository.reviews.edges}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepositoryView;
