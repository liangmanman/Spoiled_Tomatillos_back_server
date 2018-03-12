import * as React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { LOGIN_URI } from "../containers/routesContainer/uriConstants";

class LoginForm extends React.Component {


    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            isLoading: false,
            username: null,
            password: null
        };
    }

    componentDidMount() {
    }

    render() {
        return (
                <form onSubmit={this.handleLogin}>
                    <input type={'text'} name={'username'} placeholder={'Username/Email'}
                           onChange={(e) => this.setState({username: e.target.value})}/>
                    <input type={'password'} name={'password'} placeholder={'Password'}
                           onChange={(e) => this.setState({password: e.target.value})}/>
                    <input type={'submit'} value={'Log In'} />
                </form>
        );
    }

    handleLogin(event) {
        const cookies = new Cookies();

        event.preventDefault();
        console.log(event);
        axios.get(LOGIN_URI + '?username=' + this.state.username + '&password=' + this.state.password)
            .then(function (response) {
                if(response.data) {
                    cookies.set('username', response.data, { path: '/' });
                    console.log(cookies.get('username'));
                }
            });
    }
}

export default LoginForm;