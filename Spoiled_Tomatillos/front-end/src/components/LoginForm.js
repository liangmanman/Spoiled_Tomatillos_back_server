import * as React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
import { LOGIN_URI } from "../containers/routesContainer/uriConstants";

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      isLoading: false,
      failedLogin: false,
      username: null,
      password: null,
    };
  }

  render() {
    const failedLogin = this.state.failedLogin;
    let loginMessage = failedLogin ? 'Invalid Username or Password, please try again.' : '';

    return (
        <div>
          {loginMessage}
          <form onSubmit={this.handleLogin}>
            <input type={'text'} name={'username'} placeholder={'Username/Email'}
                   onChange={(e) => this.setState({username: e.target.value})}/>
            <input type={'password'} name={'password'} placeholder={'Password'}
                   onChange={(e) => this.setState({password: e.target.value})}/>
            <input type={'submit'} value={'Log In'}/>
          </form>
        </div>
    );
  }

  handleLogin(event) {
    const cookies = new Cookies();
    event.preventDefault();

    axios.post(LOGIN_URI, {
      username: this.state.username,
      password: this.state.password
    })
        .then((response) => {
          if (response.data) {
            cookies.set('username', response.data, {path: '/'});
            console.log(cookies.get('username'));
            this.props.history.push('/');
          } else {
            this.setState({failedLogin: true});
          }
        });
  }
}

export default withRouter(LoginForm);