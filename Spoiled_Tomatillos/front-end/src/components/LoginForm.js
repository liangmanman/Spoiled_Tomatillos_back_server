import * as React from 'react';
import axios from 'axios';
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
                    <input type={'text'} name={'username'} placeholder={'Username/Email'} />
                    <input type={'text'} name={'password'} placeholder={'Password'}/>
                    <input type={'submit'} value={'Log In'} />
                </form>
        );
    }

    handleLogin(event) {
        axios.post({LOGIN_URI}, {
            username: event.username,
            password: event.password
        })
            .then(function (response) {
                if (response) {
                    console.log(response)
                }
            });
    }
}

export default LoginForm;