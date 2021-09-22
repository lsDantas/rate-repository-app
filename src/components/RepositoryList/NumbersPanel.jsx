import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  generalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemContainer: {
    alignItems: 'center',
  },
  itemNumber: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
  },
  itemLabel: {
    color: theme.colors.textSecondary,
  },
});

const NumbersPanel = ({ id, content }) => {
  return (
    <View style={styles.generalContainer}>
      {
        content.map((entry, index) => <NumbersPanelItem 
          key={`numbers-panel-${id}-${index}`}
          label={entry.label}
          number={entry.number}
        />)
      }
    </View>
  );
};

const NumbersPanelItem = ({ number, label }) => {
  // Prepare Number Figure in k Notation
  const numberFigure = (number > 1000)
    ? `${ (number / 1000).toFixed(1) }k`
    : number;

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemNumber}>
        {numberFigure}
      </Text>
      <Text style={styles.itemLabel}>
        {label}
      </Text>
    </View>
  );
};

export default NumbersPanel;
