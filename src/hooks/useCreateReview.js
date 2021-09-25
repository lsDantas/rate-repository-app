import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    // Account for Optional Text
    const textDescription = (text) ? text : '';

    const input = {
      review: { 
        ownerName,
        repositoryName,
        rating: Number(rating),
        text: textDescription
      } 
    };

    const response = await mutate({ variables: input });

    return response;
  };

  return [createReview, result];
};

export default useCreateReview;
