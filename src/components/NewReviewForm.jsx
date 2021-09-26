import React from 'react';
import { useHistory } from 'react-router-native';

import { View, Pressable, Text, StyleSheet } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './SignIn/FormikTextInput';

import theme from '../theme';

import useCreateReview from '../hooks/useCreateReview';

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(1)
    .required('Repository owner username required.'),
  repositoryName: yup
    .string()
    .min(1)
    .required('Repository name required.'),
  rating: yup
    .number('Rating must be a number.')
    .min(0, 'Minimum rating is 0.')
    .max(100, 'Maximum rating is 100.')
    .integer('Rating must be a whole number.')
    .required('Repository rating required.'),
  text: yup
    .string()
});

const NewReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput 
        testID='new-review-repository-owner-username' 
        name='ownerName'
        placeholder='Repository Owner Username'
        style={styles.formField}
      />
      <FormikTextInput
        testID='new-review-repository-name'
        name='repositoryName'
        placeholder='Repository Name'
        style={styles.formField}
      />
      <FormikTextInput
        testID='new-review-repository-rating'
        name='rating'
        placeholder='Rating'
        style={styles.formField}
      />
      <FormikTextInput
        testID='new-review-text'
        name='text'
        placeholder='Review'
        multiline={true}
        style={styles.formField}
      />
      <View style={styles.formButton}>
        <Pressable
          testID='new-review-button'
          onPress={onSubmit}
          style={styles.formButtonContainer}
        >
          <Text style={styles.formButton}>
            Add Review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export const NewReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema} 
    >
      {({ handleSubmit }) => <NewReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const NewReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      await createReview(
        { 
          ownerName,
          repositoryName,
          rating,
          text 
        }
      );
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <NewReviewContainer onSubmit={onSubmit} />;
};

export default NewReview;
