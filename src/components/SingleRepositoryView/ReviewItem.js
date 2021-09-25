import React from 'react';
import { format, parseISO } from 'date-fns';

import { StyleSheet, View, Text } from 'react-native';

import theme from '../../theme';

const paddingReviewCard = 15;
const ratingShapeDim = 50;

const styles = StyleSheet.create({
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
    fontWeight: theme.fontWeights.bold,
    flex: 1,
    flexWrap: 'wrap',
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
    fontWeight: theme.fontWeights.normal,
    flex: 1,
    flexWrap: 'wrap',
  },
});

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

export default ReviewItem;
