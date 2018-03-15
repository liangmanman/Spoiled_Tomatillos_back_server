import * as React from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom'
import {MOVIE_LIST_URI, SIGNUP_URI} from '../containers/routesContainer/uriConstants'
import styles from '../styles/NavBar.css';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="topNav">
                <h3 className="title">Spoiled Tomatillos</h3>
                <Link className="active" to="/">Home</Link>
                <Link to={SIGNUP_URI}>Profile</Link>
                <Link to="#recommendations">Recommendations</Link>
                <Link to={MOVIE_LIST_URI}>Movies</Link>
                <SearchBar className="searchBar"></SearchBar>
            </div>
        );
    }
}

export default NavBar;