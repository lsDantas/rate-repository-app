import React from 'react';
import { useHistory } from 'react-router-native';

import { View, Pressable, Text, StyleSheet } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from '../FormikTextInput';

import theme from '../../../theme';
import useSignUp from '../../../hooks/authentication/useSignUp';

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

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must have at least one character.')
    .max(30, 'Username may not have more than 30 characters.')
    .required('Username required.'),
  password: yup
    .string()
    .min(5, 'Password must have more than five characters.')
    .max(50, 'Password may not have more than 50 characters.')
    .required('Password required.'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords don\'t match.')
    .required('Password confirmation is required.')
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        testID='sign-up-username'
        name='username'
        placeholder='Username'
        style={styles.formField}
      />
      <FormikTextInput
        testID='sign-up-password'
        name='password'
        placeholder='Password'
        style={styles.formField}
        secureTextEntry={true}
      />
      <FormikTextInput
        testID='sign-up-password-confirmation'
        name='passwordConfirmation'
        placeholder='Password confirmation'
        style={styles.formField}
        secureTextEntry={true}
      />
      <View style={styles.formButton}>
        <Pressable
          testID='sing-up-button'
          onPress={onSubmit}
          style={styles.formButtonContainer}
        >
          <Text style={styles.formButton}>
            Sign up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      history.push('/sign-in');
    } catch(e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

