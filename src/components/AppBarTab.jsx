import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: "#f0f0f0",
    fontSize: 24,
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
