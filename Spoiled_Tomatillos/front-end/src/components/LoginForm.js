import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SIGN_UP_URI } from "../containers/routesContainer/uriConstants";
import { LOGIN_URI } from "../containers/routesContainer/uriConstants";


class LoginForm extends React.Component {
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
                <form onSubmit={this.handleLogin}>
                    <input type={'text'} name={'name'} placeholder={'Username/Email'} />
                    <br />
                    <input type={'text'} name={'password'} placeholder={'Password'}/>
                    <br />
                    <input type={'submit'} value={'Log In'} />
                    <br />
                    <Link to={SIGN_UP_URI}>Create an account</Link>
                </form>
        );
    }

    handleLogin(event) {
        alert('user tried to log in!');
        axios.post({LOGIN_URI}, {
            username: event.name,
            password: event.password
        })
            .then(function (response) {
                if (response.authenticated) {
                    alert('User' + response.username + ' logged in successfully')
                }
            });
    }
}

export default LoginForm;