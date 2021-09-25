import React from 'react';
import { Route, Switch, Redirect } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SingleRepositoryView from './SingleRepositoryView';
import SignIn from './SignIn';
import NewReview from './NewReviewForm';

const Main = () => {
  return (
    <>
      <AppBar />
      <Switch>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        <Route path='/sign-in' exact>
          <SignIn />
        </Route>
        <Route path='/new-review' exact>
          <NewReview />
        </Route>
        <Route path='/repositories/:id' exact>
          <SingleRepositoryView />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Main;
