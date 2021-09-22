import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

// Padding Constants
const lateralPadding = 15;
const bottomPadding = 20;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: lateralPadding,
    paddingRight: lateralPadding,
    paddingBottom: bottomPadding,
    backgroundColor: "#24292e",
    justifyContent: "center",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>{}
      <AppBarTab text='Repositories' />
    </View>
  );
};

export default AppBar;
