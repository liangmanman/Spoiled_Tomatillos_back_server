import React from 'react';
import {Route, Switch, withRouter,} from 'react-router-dom';
import HomePage from '../HomePage';
import MovieList from '../MovieList';
import SearchResult from '../SearchResult';
import SignupPage from '../SignupPage';
import Movie from '../Movie';
import {MOVIE_LIST_URI, SIGNUP_URI, SEARCH_RESULT_URI, MOVIE_URI} from "./uriConstants";

const RoutesContainer = () => {
  return (
      <div>
        <div className="container">
          <Switch>
            <Route key={MOVIE_LIST_URI} path={MOVIE_LIST_URI} component={MovieList}/>
            <Route key={SIGNUP_URI} path={SIGNUP_URI} component={SignupPage}/>
            <Route key={SEARCH_RESULT_URI} path={SEARCH_RESULT_URI} component={SearchResult}/>
            <Route key={MOVIE_URI} path={`${MOVIE_URI}/:id`} component={Movie}/>
            <Route key="any" path="*" component={HomePage}/>
          </Switch>
        </div>
      </div>
  );
};

export default withRouter(RoutesContainer);
