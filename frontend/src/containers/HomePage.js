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
      <div className="boxed">
          <h3>Hello {this.state.fullName}!</h3>
          <p className="inside-boxed">Welcome to Spoiled Tomatillos - the online database of movies with a growing community of cinephiles just
          like you! Connect with your friends, see what movies they've reviewed and liked, check out information about
          the newest movies along with critic ratings and more. Start by searching for a movie or user at the search bar
          on the top right of the screen.</p>
      </div>
    );
  }
}

export default HomePage;
