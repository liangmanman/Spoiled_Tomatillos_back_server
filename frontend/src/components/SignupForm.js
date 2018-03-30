import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ErrorMessage from './ErrorMessage';
import styles from '../styles/SignupForm.css';
import stylesMain from '../styles/Main.css'

@observer
class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFullNameChange = this.handleFullNameChange.bind(this);

    }

    handleEmailChange(e) {
        e.preventDefault();
        this.props.setEmail(e.target.value);
    }

    handlePasswordChange(e) {
        e.preventDefault();
        this.props.setPassword(e.target.value);
    }

    handleFullNameChange(e) {
        e.preventDefault();
        this.props.setFullName(e.target.value);
    }

    render() {
        const { errorMessage, email, password, fullName } = this.props;
        return (
            <div class="boxed">
                <h2>Create an Account</h2>
                <form>
                    <ErrorMessage errorMessage={errorMessage} />
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email"
                               value={email}
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
                               value={password}
                               onChange={this.handlePasswordChange}
                               className="form-control"
                               id="exampleInputPassword1"
                               placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFullName1">Full Name</label>
                        <input type="text"
                               value={fullName}
                               onChange={this.handleFullNameChange}
                               className="form-control"
                               id="exampleFullName1"
                               placeholder="Full Name"/>
                    </div>
                    <button type="submit"
                            className="btn btn-primary btn-lg btn-block"
                            onClick={this.handleSignUp}>Register</button>
                </form>
            </div>
        );
    }

    handleSignUp(e) {
        e.preventDefault();
        this.props.onRegister();
    }
}

SignUpForm.propTypes = {
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setFullName: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
};

export default SignUpForm;