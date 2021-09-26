import React from 'react';
import { Route, Switch, Redirect } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SingleRepositoryView from './SingleRepositoryView';
import NewReview from './forms/NewReviewForm';
import MyReviewsView from './MyReviewsView';
import SignIn from './forms/SignIn';
import SignUp from './forms/SignUp';

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
        <Route path='/sign-up' exact>
          <SignUp />
        </Route>
        <Route path='/new-review' exact>
          <NewReview />
        </Route>
        <Route path='/my-reviews' exact>
          <MyReviewsView />
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
