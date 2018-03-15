import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {withRouter} from "react-router-dom";

@inject(stores => {
    let { account } = stores.store;
    return {
        username: account.username,
        password: account.password,
        account: account.account,
        errorMessage: account.errorMessage,
        setUsername: account.setUsername,
        setPassword: account.setPassword,
        login: account.login,
    }
})
@observer
@withRouter
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
        fullName: this.props.account.fullName,
    };
  }


  render() {
    return (
      <div>
          <h3>Hello {this.state.fullName}!</h3>
      </div>
    );
  }
}

export default HomePage;
