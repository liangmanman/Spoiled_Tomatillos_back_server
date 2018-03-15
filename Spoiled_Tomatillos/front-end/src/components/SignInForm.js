import * as React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class SignInForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
    }

    componentDidMount() {
    }

    handleUsernameChange(e) {
        e.preventDefault();
        this.props.setUsername(e.target.value);
    }

    handlePasswordChange(e) {
        e.preventDefault();
        this.props.setPassword(e.target.value);
    }

    renderErrorMessage() {
        if (_.isNil(this.props.errorMessage)) {
            return;
        }

        return (
            <div className="alert alert-danger" role="alert">
                {this.props.errorMessage}
            </div>
        );
    }

    render() {
        return (
            <div>
                <form>
                    {this.renderErrorMessage()}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="username"
                               value={this.props.username}
                               onChange={this.handleUsernameChange}
                               className="form-control"
                               id="exampleInputUsername1"
                               aria-describedby="usernameHelp"
                               placeholder="Enter username"/>
                        <small id="usernameHelp"
                               className="form-text text-muted">
                            We'll never share your username with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                               value={this.props.password}
                               onChange={this.handlePasswordChange}
                               className="form-control"
                               id="exampleInputPassword1"
                               placeholder="Password"/>
                    </div>
                    <button type="submit"
                            className="btn btn-primary btn-lg btn-block"
                            onClick={this.handleLogin}>Login</button>
                </form>
            </div>
        );
    }

    handleLogin(e) {
        e.preventDefault();
        this.props.login();
    }
}

SignInForm.propTypes = {
    login: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
};


export default SignInForm;