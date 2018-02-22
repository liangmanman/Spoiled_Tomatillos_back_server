import React from 'react';
import { Route, Switch, withRouter, } from 'react-router-dom';
import HomePage from '../HomePage';
import MovieList from '../MovieList';
import { MOVIE_LIST_URI } from "./uriConstants";

const RoutesContainer = () => {
    return (
        <div>
            <div className="container">
                <Switch>
                    <Route key={MOVIE_LIST_URI} path={MOVIE_LIST_URI} component={MovieList}/>
                    <Route key="any" path="*" component={HomePage}/>
                </Switch>
            </div>
        </div>
    );
};

export default withRouter(RoutesContainer);
