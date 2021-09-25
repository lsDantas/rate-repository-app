import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-native';
import { FlatList, View, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
  pickerContainer: {
    flex: 1,
    flexShrink: 0,
    height: 60,
    padding: 20,
    backgroundColor: '#c5c5c5'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryOrderSelector = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <View style={styles.pickerContainer} >
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue) =>
          setSelectedOrder(itemValue)
        }
      >
        <Picker.Item label='Latest Repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highest' />
        <Picker.Item label='Lowest rated repositories' value='lowest' />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, selectedOrder, setSelectedOrder}) => {
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
        ListHeaderComponent={<RepositoryOrderSelector selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />}
      />
    </SafeAreaView>
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const { repositories } = useRepositories(selectedOrder);
  
  return <RepositoryListContainer repositories={repositories} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />;
};

export default RepositoryList;
