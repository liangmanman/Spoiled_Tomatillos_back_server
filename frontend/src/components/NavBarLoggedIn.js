import * as React from 'react';
import SearchBar from './SearchBar';
import { Link, withRouter } from 'react-router-dom'
import { observer} from "mobx-react/index";
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
    MOVIE_LIST_URI,
    SIGN_UP_URI,
    SIGN_IN_URI,
    USER_PROFILE_URI
} from '../containers/routesContainer/uriConstants';

import { generateUserURI } from '../util';
import SignOutButton from './SignOutButton';

import '../styles/NavBar.css';

@observer
class NavBarLoggedIn extends React.Component {

    constructor(props) {
        super(props);
        const { _id } = this.props.userInfo;
        const links = [
            {
                'to': '/home',
                'title': 'Home',
                'active': false,
            },
            {
                'to': generateUserURI(_id, USER_PROFILE_URI),
                'title': 'Profile',
                'active': false,
            },
            {
                'to': MOVIE_LIST_URI,
                'title': 'Movies',
                'active': true,
            }
        ];
        this.state = {
            links
        };

        this.renderLinks = this.renderLinks.bind(this);
        this.onLinkClickHigherOrder = this.onLinkClickHigherOrder.bind(this);
    };

    onLinkClickHigherOrder(link) {
        // pass active to the correct link
        return () => {
            const newLinks = _.map(
                this.state.links,
                (l) => {
                    if (l.to === link.to) {
                        l.active = true;
                        return l;
                    } else {
                        l.active = false;
                        return l;
                    }
                }
            );
            this.setState({
                links: newLinks,
            });
        };
    }

    renderLinks() {
        const { links } = this.state;
        return _.map(links, (l) => {
            return (
                <Link
                    key={l.to}
                    className={l.active ? 'active' : ''}
                    onClick={this.onLinkClickHigherOrder(l)}
                    to={l.to}>
                    {l.title}
                </Link>
            )
        })
    }
    render() {
        return (
            <div className="topNav">
                <h3 className="title">Spoiled Tomatillos</h3>
                {this.renderLinks()}
                {/*<Link className="active" to="/home">Home</Link>*/}
                {/*<Link to={USER_PROFILE_URI}>Profile</Link>*/}
                {/*/!*<Link to="/recommendations">Recommendations</Link>*!/*/}
                {/*<Link to={MOVIE_LIST_URI}>Movies</Link>*/}
                <SignOutButton logOut={this.props.logOut}/>

                <SearchBar className="searchBar"/>
            </div>
        );
    }
}

NavBarLoggedIn.propTypes = {
    userInfo: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
};

export default NavBarLoggedIn;