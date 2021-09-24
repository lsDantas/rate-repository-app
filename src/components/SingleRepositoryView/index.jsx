import React from 'react';
import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';

import RepositoryItem from '../RepositoryList/RepositoryItem';

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  console.log(repository);

  return (
    <>
      <RepositoryItem item={repository}/>
    </>
  );
};

export default SingleRepositoryView;
