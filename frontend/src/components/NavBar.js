import * as React from 'react';
import SearchBar from './SearchBar';
import { Link, withRouter } from 'react-router-dom'
import {inject, observer} from "mobx-react/index";
import _ from 'lodash';

import {
    MOVIE_LIST_URI,
    SIGN_UP_URI,
    SIGN_IN_URI,
    USER_PROFILE_URI
} from '../containers/routesContainer/uriConstants';

import { generateUserURI } from '../util';
import SignOutButton from './SignOutButton';
import NavBarLoggedIn from './NavBarLoggedIn';

import '../styles/NavBar.css';


@inject(stores => {
    let { session } = stores;
    return {
      userInfo: session.userInfo,
        logOut: session.logout,
    }
})
@observer
class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.redirectToHome = this.redirectToHome.bind(this);
    };


    redirectToHome() {
        window.location = "/";
    };

    render() {
        const { userInfo, logOut } = this.props;
        if (_.isNil(userInfo)) {
            return (
                <div className="topNav">
                    <h3 className="title" onClick={this.redirectToHome}>Spoiled Tomatillos</h3>
                    <Link to={SIGN_UP_URI}>Register</Link>
                    <Link to={SIGN_IN_URI}>Login</Link>
                </div>
            );
        }

        return <NavBarLoggedIn userInfo={userInfo} logOut={logOut}/>
    }
}

export default NavBar;