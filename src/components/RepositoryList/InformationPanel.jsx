import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  primaryText: {
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: theme.fontWeights.bold,
  },
  secondaryText: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fontFamily,
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
    fontFamily: theme.fontFamily,
    borderRadius: theme.roundedComponents.borderRadius,
    padding: 4,
    color: theme.colors.textContrast,
  },
});

const InformationPanel = ({ fullName, description, language }) => {

  return (
    <View style={styles.generalContainer}>
      <View style={styles.itemContainer}>
        <Text testID='repository-full-name' style={styles.primaryText}>
          {fullName}
        </Text>
      </View>
      <View testID='repository-description' style={styles.itemContainer}>
        <Text style={styles.secondaryText}>
          {description}
        </Text>
      </View>
      <View testID='repository-language' style={styles.itemContainer}>
        <Text style={styles.tagText}>
          {language}
        </Text>
      </View>
    </View>
  );
};

export default InformationPanel;
