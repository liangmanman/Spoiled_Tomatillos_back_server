import * as React from 'react';
import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";
import SignupForm from "../components/SignupForm";


class SignupPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  render() {
    return (
        <div>
          <NavBar/>
          <LoginForm/>
          <SignupForm/>
        </div>
    );
  }

}

export default SignupPage;
