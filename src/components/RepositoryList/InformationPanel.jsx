import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  primaryText: {
    color: theme.colors.textPrimary,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: theme.fontWeights.bold,
  },
  secondaryText: {
    color: theme.colors.textSecondary,
    flex: 1,
    flexWrap: 'wrap',
  },
  generalContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    paddingLeft: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  tagText: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundedComponents.borderRadius,
    padding: 4,
    color: theme.colors.textContrast,
  },
});

const InformationPanel = ({ fullName, description, language }) => {

  return (
    <View style={styles.generalContainer}>
      <View style={styles.itemContainer}>
        <Text style={styles.primaryText}>
          {fullName}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.secondaryText}>
          {description}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.tagText}>
          {language}
        </Text>
      </View>
    </View>
  );
};

export default InformationPanel;
