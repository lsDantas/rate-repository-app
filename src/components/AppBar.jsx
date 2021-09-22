import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

import theme from '../theme';

// Padding Constants
const horizontalPadding = 15;
const topPadding = 10;
const bottomPadding = 20;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + topPadding,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    paddingBottom: bottomPadding,
    backgroundColor: theme.colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
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
