import React from 'react';

import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from '../SingleRepositoryView/ReviewItem';

import useVerifyUser from '../../hooks/useVerifyUser';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#c5c5c5',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewsView = () => {
  const includeReviews = true;
  const numFirstEntries = 5;
  const { data, fetchMore } = useVerifyUser(includeReviews, numFirstEntries);

  if (!data?.authorizedUser?.reviews) {
    return <></>;
  }

  const onEndReach = () => {
    fetchMore;
  };

  return (
    <FlatList 
      data={data.authorizedUser.reviews.edges}
      onEndReached={onEndReach}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
    />
  );
};

export default MyReviewsView;