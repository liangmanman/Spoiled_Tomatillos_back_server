import * as React from 'react';
import axios from 'axios';
import { SIGNUP_URI } from "../containers/routesContainer/uriConstants";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSignup = this.handleSignup.bind(this);

        this.state = {
            isLoading: false,
            fullName: null,
            username: null,
            email: null,
            password: null
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <form onSubmit={this.handleSignup}>
                <input type={'text'} name={'fullName'} placeholder={'Full Name'}
                       onChange={(e) => this.setState({fullName: e.target.value})}/>
                <br />
                <input type={'text'} name={'username'} placeholder={'Username'}
                       onChange={(e) => this.setState({username: e.target.value})}/>
                <br />
                <input type={'text'} name={'email'} placeholder={'Email'}
                       onChange={(e) => this.setState({email: e.target.value})}/>
                <br />
                <input type={'password'} name={'password'} placeholder={'Password'}
                       onChange={(e) => this.setState({password: e.target.value})}/>
                <br />
                <input type={'password'} name={'confirmPassword'} placeholder={'Confirm Password'}/>
                <br />
                <input type={'submit'} value={'Create Account'}/>
                <br />
            </form>
        );
    }

    handleSignup(event) {
        event.preventDefault();
        axios.post(SIGNUP_URI, {
                fullName: this.state.fullName,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
            .then(function (response) {
                alert(response.data);
            });
    }
}

export default SignupForm;