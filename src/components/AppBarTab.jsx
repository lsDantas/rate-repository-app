import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textContrast,
    fontSize: theme.fontSizes.heading,
    fontWeight: '700',
  }
});

const AppBarTab = ({ text }) => {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default AppBarTab;
