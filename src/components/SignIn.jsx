import React from 'react';

import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';

import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'space-around',
    backgroundColor: "#ffffff",
    padding: 10
  },
  formField: {
    fontSize: theme.fontSizes.subheading,
    borderWidth: 0.2,
    padding: 5,
    margin: 5,
    borderRadius: 2,
  },
  formButton: {
    padding: 5,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput name="username" placeholder="Username" style={styles.formField} />
      <FormikTextInput name="password" placeholder="Password" style={styles.formField} secureTextEntry={true} />
      <View style={styles.formButton}>
        <Button title="Sign in" onPress={onSubmit} style={styles.formButton} ></Button>
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} >
      <SignInForm onSubmit={onSubmit} />
    </Formik>
  );
};

export default SignIn;
