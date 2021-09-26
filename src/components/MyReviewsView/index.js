import React from 'react';
import { useHistory } from 'react-router-native';
import { format, parseISO } from 'date-fns';

import { FlatList, Pressable, StyleSheet, View, Text, Alert} from 'react-native';

import useVerifyUser from '../../hooks/authentication/useVerifyUser';
import useDeleteReview from '../../hooks/reviews/useDeleteReview';

import theme from '../../theme';

const buttonPadding = 10;
const fieldMarginSize = 10;
const paddingReviewCard = 15;
const ratingShapeDim = 50;

const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
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
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewButtonContainer: {
    backgroundColor: theme.colors.primary,
    padding: buttonPadding,
    margin: fieldMarginSize,
    flexGrow: 1,
    borderRadius: theme.roundedComponents.buttonsBorderRadius,
    alignItems: 'center'
  },
  deleteButtonContainer: {
    backgroundColor: theme.colors.alertRed,
    padding: buttonPadding,
    margin: fieldMarginSize,
    flexGrow: 1,
    borderRadius: theme.roundedComponents.buttonsBorderRadius,
    alignItems: 'center'
  },
  button: {
    color: theme.colors.textContrast,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fontFamily,
    padding: 5,
  },
  separator: {
    height: 10,
    backgroundColor: '#c5c5c5',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const PersonalReviewEntry = ({review}) => {
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
        <Text style={styles.nameText}>{review.repository.fullName}</Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.descriptionText}>{review.text}</Text>
      </View>
    </View>
  );
};

const MyReviewView = ({ review, history, deleteReview, refetch }) => {
  const repositoryRedirect = () => {
    history.push(`/repositories/${review.repository.id}`);
  };

  const onDelete = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteReview(review.id).then(
              () => refetch()
            );
          }
        },
      ]
    );
  };

  return (
    <View style={styles.generalContainer}>
      <PersonalReviewEntry review={review} />
      <View style={styles.buttonsContainer}>
        <Pressable onPress={repositoryRedirect}>
            <View style={styles.viewButtonContainer}>
              <Text style={styles.button}>
                View Repository
              </Text>
            </View>
        </Pressable>
        <Pressable onPress={onDelete}>
          <View style={styles.deleteButtonContainer}>
            <Text style={styles.button}>
              Delete Review
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviewsView = () => {
  const [deleteReview] = useDeleteReview();
  const history = useHistory();

  const includeReviews = true;
  const numFirstEntries = 5;
  const { data, fetchMore, refetch } = useVerifyUser(includeReviews, numFirstEntries);

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
      renderItem={({ item }) => 
        <MyReviewView 
          review={item.node}
          history={history}
          deleteReview={deleteReview}
          refetch={refetch}
        />
    }
      keyExtractor={(item) => item.node.id}
    />
  );
};

export default MyReviewsView;