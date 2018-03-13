import React from 'react';
import { Route, Switch, withRouter, } from 'react-router-dom';
import HomePage from '../HomePage';
import MovieList from '../MovieList';
import SignupPage from '../SignupPage'
import {MOVIE_LIST_URI, SIGNUP_URI} from "./uriConstants";
import {MOVIE_URI} from "./uriConstants";
import Movie from '../Movie';

const RoutesContainer = () => {
    return (
        <div>
            <div className="container">
                <Switch>
                    <Route key={MOVIE_LIST_URI} path={MOVIE_LIST_URI} component={MovieList}/>
                    <Route key={SIGNUP_URI} path={SIGNUP_URI} component={SignupPage}/>
                    <Route key="any" path="*" component={HomePage}/>
                  <Route key={MOVIE_URI} path={`${MOVIE_URI}/:id`} component={Movie}/>
                </Switch>
            </div>
        </div>
    );
};

export default withRouter(RoutesContainer);
