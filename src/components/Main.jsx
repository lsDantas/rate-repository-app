import React from 'react';

import { View, StyleSheet } from 'react-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList/RepositoryList';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c9c9c9'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;
