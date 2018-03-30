import * as React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styles from '../styles/SignInForm.css';
import stylesMain from '../styles/Main.css'

@observer
class SignInForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
    }

    componentDidMount() {
    }

    handleEmailChange(e) {
        e.preventDefault();
        this.props.setEmail(e.target.value);
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
            <div className="boxed">
                <h2>Sign in</h2>
                <form>
                    {this.renderErrorMessage()}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email"
                               value={this.props.email}
                               onChange={this.handleEmailChange}
                               className="form-control"
                               id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               placeholder="Email"/>
                        <small id="emailHelp"
                               className="form-text text-muted">
                            We'll never share your email with anyone else.
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
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
};


export default SignInForm;