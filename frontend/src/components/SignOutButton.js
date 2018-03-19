import React from 'react';
import { withRouter, Link } from "react-router-dom";
import '../styles/SearchBar.css';
import { observer } from 'mobx-react';
import PropTypes from "prop-types";

@observer
class SignOutButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
    };

    handleSignOut = (e) => {
        e.preventDefault();
        this.props.logOut();

    };

    render() {
        return (
                <Link className='nav-link' to={'#'} onClick={this.handleSignOut}>Logout</Link>
        );
    }
}

SignOutButton.propTypes = {
    logOut: PropTypes.func.isRequired,
};


export default withRouter(SignOutButton);
