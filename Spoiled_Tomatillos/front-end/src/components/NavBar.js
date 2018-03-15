import * as React from 'react';
import SearchBar from './SearchBar';
import { Link, withRouter } from 'react-router-dom'
import {inject, observer} from "mobx-react/index";

import {
    MOVIE_LIST_URI,
    SIGN_UP_URI,
    SIGN_IN_URI
} from '../containers/routesContainer/uriConstants'
import SignOutButton from './SignOutButton'

import '../styles/NavBar.css';


@inject(stores => {
    let { account } = stores.store;
    return {
        account: account.account,
        logOut: account.logout,
    }
})
@observer
class NavBar extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        const { account } = this.props;
        if (_.isNil(account)) {
            return (
                <div className="topNav">
                    <h3 className="title">Spoiled Tomatillos</h3>
                    <Link to={SIGN_UP_URI}>Register</Link>
                    <Link to={SIGN_IN_URI}>Login</Link>
                </div>
            );
        }

        return (
            <div className="topNav">
                <h3 className="title">Spoiled Tomatillos</h3>
                <Link className="active" to="/home">Home</Link>
                <Link to="/recommendations">Recommendations</Link>
                <Link to={MOVIE_LIST_URI}>Movies</Link>
                <SearchBar className="searchBar"></SearchBar>
                <SignOutButton logOut={this.props.logOut}/>
            </div>
        );
    }
}

export default NavBar;