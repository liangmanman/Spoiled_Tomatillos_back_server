import React from 'react';
import { Route, Switch, withRouter, Router } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';

import HomePage from '../HomePage';
import MovieList from '../MovieList';
import SearchResult from '../SearchResult';
import SignUpPage from '../SignupPage';
import Movie from '../Movie';
import {SIGN_IN_URI, SIGN_UP_URI, SEARCH_RESULT_URI, MOVIE_URI} from "./uriConstants";
import SignInPage from "../SignInPage";
import NavBar from "../../components/NavBar";

@inject(stores => {
    let { account } = stores.store;
    return {
        account: account.account,
    }
})
@observer
class RoutesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.renderRouter = this.renderRouter.bind(this);
    }

    renderRouter() {
        let { account } = this.props;
        if (_.isNil(account)) {
            return (
                <Switch>
                    <Route key={SIGN_UP_URI} path={SIGN_UP_URI} component={SignUpPage}/>
                    <Route key={SIGN_IN_URI} path={SIGN_IN_URI} component={SignInPage}/>
                    <Route key="any" path="*" component={SignInPage}/>
                </Switch>
            );
        }

        return (
            <Switch>
                {/*<Route key={MOVIE_LIST_URI} path={MOVIE_LIST_URI} component={MovieList}/>*/}
                <Route key={SEARCH_RESULT_URI} path={SEARCH_RESULT_URI} component={SearchResult}/>
                <Route key={MOVIE_URI} path={`${MOVIE_URI}/:id`} component={Movie}/>
                <Route key="any" path="*" component={HomePage}/>
            </Switch>
        );
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className="container">
                    {this.renderRouter()}
                </div>
            </div>
        )
    }
}



export default withRouter(RoutesContainer);
