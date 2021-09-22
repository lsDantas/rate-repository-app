import React from 'react';

import { View, Button, StyleSheet } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';

import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const fieldMarginSize = 4;

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
    marginTop: fieldMarginSize,
    marginLeft: fieldMarginSize,
    marginRight: fieldMarginSize,
    borderRadius: 2,
  },
  formButton: {
    padding: 5,
    borderRadius: 2,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .required("Username is required."),
  password: yup
    .string()
    .required("Password is required.")
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
    console.log("Submitted the form.");
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      validationSchema={validationSchema}
    >
      <SignInForm onSubmit={onSubmit} />
    </Formik>
  );
};

export default SignIn;
