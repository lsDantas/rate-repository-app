import React from 'react';
import { useHistory } from 'react-router-native';

import { View, Pressable, Text, StyleSheet } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';

import theme from '../../theme';

import useSignIn from '../../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const fieldMarginSize = 4;

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    padding: 10
  },
  formField: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizes.subheading,
    borderWidth: 0.2,
    padding: 5,
    margin: fieldMarginSize,
    borderRadius: 2,
  },
  formButtonContainer: {
    alignItems: 'center',
  },
  formButton: {
    color: theme.colors.textContrast,
    backgroundColor: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fontFamily,
    padding: 5,
    margin: fieldMarginSize,
    borderRadius: 2,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .required('Username is required.'),
  password: yup
    .string()
    .min(1)
    .required('Password is required.')
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput testID='username-field' name='username' placeholder='Username' style={styles.formField} />
      <FormikTextInput testID='password-field' name='password' placeholder='Password' style={styles.formField} secureTextEntry={true} />
      <View style={styles.formButton}>
      <Pressable testID='submit-button' style={styles.formButtonContainer} onPress={onSubmit}>
        <Text style={styles.formButton}>
          Sign in
        </Text>
      </Pressable>
      </View>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
