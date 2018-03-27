import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import SignUpForm from "../components/SignupForm";

@inject(stores => {
    let { register } = stores;
    return {
        email: register.email,
        password: register.password,
        fullName: register.fullName,
        errorMessage: register.errorMessage,
        setEmail: register.setEmail,
        setPassword: register.setPassword,
        setFullName: register.setFullName,
        onRegister: register.onRegister,
    }
})
@observer
@withRouter
class SignupPage extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div>
          {/*<NavBar/>*/}
          <SignUpForm {...this.props} />
          {/*<Link to={'/'}>Go Back</Link>*/}
        </div>
    );
  }
}

export default SignupPage;
