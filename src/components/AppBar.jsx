import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
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
    justifyContent: 'space-around',
  },
  appScroll: {
    flexDirection: 'row',
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.appScroll}>
          <Pressable onPress={() => { }}>
            <Link to="/">
              <AppBarTab text='Repositories' />
            </Link>
          </Pressable>
          <Pressable onPress={() => { }}>
            <Link to="/sign-in">
              <AppBarTab text='Sign in' />
            </Link>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
