import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import theme from '../theme';

const horizontalPadding = 10;

const styles = StyleSheet.create({
  container: {
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding
  },
  text: {
    color: theme.colors.textContrast,
    fontSize: theme.fontSizes.heading,
    fontWeight: '700',
  }
});

const AppBarTab = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default AppBarTab;
