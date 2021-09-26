import { Platform } from 'react-native';

const theme = {
  colors: {
    primary: '#0366d6',
    secondary: '#24292e',
    textPrimary: '#000000',
    textSecondary: '#656565',
    textContrast: '#f0f0f0',
    background: '#d5d5d5',
    alertRed: '#d73a4a',
  },
  fontFamily: Platform.select({ 
    android: 'Roboto',
    ios: 'Arial',
  }),
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 22,
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  roundedComponents: {
    borderRadius: 5,
    buttonsBorderRadius: 4,
  },
};

export default theme;
