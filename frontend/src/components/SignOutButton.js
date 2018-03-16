import React from 'react';
import { withRouter } from "react-router-dom";
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
                <a className={'signOutButton'} onClick={this.handleSignOut}>Logout</a>
        );
    }
}

SignOutButton.propTypes = {
    logOut: PropTypes.func.isRequired,
};


export default withRouter(SignOutButton);
