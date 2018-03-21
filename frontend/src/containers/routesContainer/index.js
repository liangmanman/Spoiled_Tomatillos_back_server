import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';

import HomePage from '../HomePage';
import SearchResult from '../SearchResult';
import SignUpPage from '../SignupPage';
import {SIGN_IN_URI, SIGN_UP_URI, SEARCH_RESULT_URI, MOVIE_URI, USER_URI} from "./uriConstants";
import SignInPage from "../SignInPage";
import NavBar from "../../components/NavBar";
import MovieRoute from './movieRoute';
import ProfileRoute from './profileRoute';

@inject(stores => {
    let { session } = stores;
    return {
      userInfo: session.userInfo,
    }
})
@observer
class RoutesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.renderRouter = this.renderRouter.bind(this);

        //Here ya go
        this.props.history.listen((location, action) => {
        });
    }


    renderRouter() {
        let { userInfo } = this.props;
        if (_.isNil(userInfo)) {
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
                <Route key={USER_URI} path={`${USER_URI}/:id`} component={ProfileRoute}/>
                <Route key={MOVIE_URI} path={MOVIE_URI} component={MovieRoute}/>
                <Route key={SEARCH_RESULT_URI} path={SEARCH_RESULT_URI} component={SearchResult}/>
                {/*<Route key={MOVIE_URI} path={`${MOVIE_URI}/:id`} component={Movie}/>*/}
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
