import * as React from 'react';
import axios from 'axios';
import { SIGNUP_URI } from "../containers/routesContainer/uriConstants";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <form onSubmit={this.handleSignup}>
                <input type={'text'} name={'fullName'} placeholder={'Full Name'} />
                <br />
                <input type={'text'} name={'username'} placeholder={'Username'} />
                <br />
                <input type={'text'} name={'email'} placeholder={'Email'} />
                <br />
                <input type={'text'} name={'password'} placeholder={'Password'}/>
                <br />
                <input type={'text'} name={'confirmPassword'} placeholder={'Confirm Password'}/>
                <br />
                <input type={'submit'} value={'Create Account'} />
                <br />
            </form>
        );
    }

    handleSignup(event) {
        axios.post('/', JSON.stringify({
                fullName: event.fullName,
                username: event.username,
                email: event.email,
                password: event.password
            }))
            .then(function (response) {
                console.log(response);
            });
    }
}

export default SignupForm;