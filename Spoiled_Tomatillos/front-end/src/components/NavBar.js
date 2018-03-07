import * as React from 'react';
import SearchBar from './SearchBar';
import styles from '../styles/NavBar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div class="topNav">
                <h3 class="title">Spoiled Tomatillos</h3>
                <a class="active" href="#home">Home</a>
                <a href="#profile">Profile</a>
                <a href="#recommendations">Recommendations</a>
                <a href="#reviews">Reviews</a>
                <SearchBar class="searchBar"></SearchBar>
            </div>
        );
    }
}
export default NavBar;