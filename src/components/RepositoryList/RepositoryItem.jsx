import React from 'react';
import * as Linking from 'expo-linking';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';

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
  },
  linkButtonContainer: {
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  linkButton: {
    color: theme.colors.textContrast,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fontFamily,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const RepositoryItem = ({ item }) => {
  // Loading
  if (!item) {
    return <></>;
  }

  const displayedNumbers = [
    { name: 'stars', label: 'Stars', number: item.stargazersCount },
    { name: 'forks', label: 'Forks', number: item.forksCount },
    { name: 'reviews', label: 'Reviews', number: item.reviewCount },
    { name: 'rating', label: 'Rating', number: item.ratingAverage },
  ];

  const onGitHubOpen = () => {
    Linking.openURL(item.url);
  };

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
      { (item.url)
        ? <Pressable testID='open-github-button' style={styles.linkButtonContainer} onPress={onGitHubOpen}>
          <Text style={styles.linkButton}>
            Open in GitHub
          </Text>
        </Pressable>
        : <></>
      }
    </View>
  );
};

export default RepositoryItem;
