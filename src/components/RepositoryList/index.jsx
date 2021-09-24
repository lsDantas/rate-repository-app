import React from 'react';
import { useHistory } from 'react-router-native';
import { FlatList, View, SafeAreaView, StyleSheet, Pressable } from 'react-native';

import useRepositories from '../../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

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

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => {
    const repositoryRedirect = () => {
      history.push(`/repositories/${item.id}`);
    };

    return (
      <Pressable onPress={repositoryRedirect}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        style={{ flex: 1 }}
        testID='repository-list-container'
      />
    </SafeAreaView>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
