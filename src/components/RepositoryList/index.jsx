import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import { FlatList, View, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';

import useRepositories from '../../hooks/repositories/useRepositories';

import RepositoryItem from './RepositoryItem';

import theme from '../../theme';

const filterPadding = 20;

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
    backgroundColor: theme.colors.background,
  },
  filterContainer: {
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    padding: filterPadding,
  },
  pickerContainer: {
    flex: 1,
    flexShrink: 0,
    paddingLeft: filterPadding,
    paddingRight: filterPadding,
    paddingBottom: filterPadding,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryFilter = ({ 
  selectedOrder, 
  setSelectedOrder, 
  searchQuery, 
  setSearchQuery }) => {

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.filterContainer}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
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
    </View>
  );
};

export const RepositoryListContainer = ({  
  repositories, 
  selectedOrder,
  setSelectedOrder,
  searchQuery,
  setSearchQuery, 
  onEndReach }) => {
  
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
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        style={{ flex: 1 }}
        testID='repository-list-container'
        ListHeaderComponent={<RepositoryFilter selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}/>}
      />
    </SafeAreaView>
  );
};

const RepositoryList = () => {
  // Filtering Options
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 300);

  const numFirstEntries = 5;
  const { repositories, fetchMore } = useRepositories(selectedOrder, searchKeyword, numFirstEntries);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories}
      onEndReach={onEndReach}
      selectedOrder={selectedOrder} 
      setSelectedOrder={setSelectedOrder}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;
