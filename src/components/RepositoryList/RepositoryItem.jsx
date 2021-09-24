import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import theme from '../../theme';

import InformationPanel from './InformationPanel';
import NumbersPanel from './NumbersPanel';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 10,
  },
  card: {
    flexDirection: 'row',
  },
  ownerThumbnail: {
    width: 50,
    height: 50,
    borderRadius: theme.roundedComponents.borderRadius,
  }
});

const RepositoryItem = ({ item }) => {
  const displayedNumbers = [
    { name: 'stars', label: 'Stars', number: item.stargazersCount },
    { name: 'forks', label: 'Forks', number: item.forksCount },
    { name: 'reviews', label: 'Reviews', number: item.reviewCount },
    { name: 'rating', label: 'Rating', number: item.ratingAverage },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.ownerThumbnail} source={{ uri: item.ownerAvatarUrl }} />
        <InformationPanel 
          fullName={item.fullName} 
          description={item.description}
          language={item.language}
        />
      </View>
      <NumbersPanel id={item.id} content={displayedNumbers} />
    </View>
  );
};

export default RepositoryItem;
