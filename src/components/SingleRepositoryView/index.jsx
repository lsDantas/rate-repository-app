import React from 'react';
import { useParams } from 'react-router-native';
import { format, parseISO } from 'date-fns';
import { FlatList, StyleSheet, View, Text } from 'react-native';

import useRepository from '../../hooks/useRepository';

import RepositoryItem from '../RepositoryList/RepositoryItem';

import theme from '../../theme';

const paddingReviewCard = 15;
const ratingShapeDim = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  contentContainer: {
    paddingBottom: 250,
  },
  reviewCard: {
    padding: paddingReviewCard,
    flexDirection: 'row',
  }, 
  reviewInfo: {
    flexDirection: 'column',
    flexShrink: 1,
    paddingLeft: 10,
  },
  separator: {
    height: 10,
    backgroundColor: '#c5c5c5',
  },
  ratingContainer: {    
    borderWidth: 2,
    borderColor: theme.colors.primary,
    height: ratingShapeDim,
    width: ratingShapeDim,
    borderRadius: (ratingShapeDim / 2),
    flex: 1,
    flexGrow: 0,
    flexShrink: 0,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: theme.colors.primary,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  nameText: {
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: theme.fontWeights.bold,
  },
  dateText: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fontFamily,
    flex: 1,
    flexWrap: 'wrap',
  },
  descriptionText: {
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: theme.fontWeights.normal,
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

const ReviewItem = ({ review }) => {
  const formattedDate = format(
    parseISO(review.createdAt), 
    'MM.dd.yyyy'
  );

  return (
    <View style={styles.reviewCard}>
      <View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>
            {review.rating}
          </Text>
        </View> 
      </View>
      <View style={styles.reviewInfo}>
        <Text style={styles.nameText}>{review.user.username}</Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.descriptionText}>{review.text}</Text>
      </View>
    </View>
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
