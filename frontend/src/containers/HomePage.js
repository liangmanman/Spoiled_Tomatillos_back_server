import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {withRouter} from "react-router-dom";

@inject(stores => {
    let { session } = stores;
    return {
        userInfo: session.userInfo,
    }
})
@observer
@withRouter
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
        fullName: this.props.userInfo.fullName,
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
