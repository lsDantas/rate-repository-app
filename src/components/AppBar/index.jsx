import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

import theme from '../../theme';
import useVerifyUser from '../../hooks/useVerifyUser';
import useSignOut from '../../hooks/useSignOut';

// Padding Constants
const horizontalPadding = 10;
const topPadding = 20;
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
  const loggedUser = useVerifyUser();
  const signOut = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.appScroll}>
          <Link to='/'>
            <AppBarTab text='Repositories' />
          </Link>
          <Link to='/new-review'>
            <AppBarTab text='Create a Review' />
          </Link>
          {
            (loggedUser.data && loggedUser.data.authorizedUser)
              ? <>
                <Link to='/my-reviews'>
                  <AppBarTab text='My Reviews' />
                </Link>
                <Pressable onPress={signOut}>
                  <AppBarTab text='Sign out' />
                </Pressable>
                </>
              : <>
                  <Link to='/sign-in'>
                    <AppBarTab text='Sign in' />
                  </Link>
                  <Link to='/sign-up'>
                    <AppBarTab text='Sign-up' />
                  </Link>
                </>
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
