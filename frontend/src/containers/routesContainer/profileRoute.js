import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import MyLikesPage from '../UserLikesPage';
import ProfilePage from '../ProfilePage';
import FriendsPage from  '../FriendsPage';
import { USER_URI, USER_PROFILE_URI, USER_LIKES_URI, USER_FRIENDS_URI } from "./uriConstants";

@observer
class ProfileRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route key={USER_PROFILE_URI}
               path={USER_PROFILE_URI}
               component={ProfilePage}/>
        <Route key={USER_LIKES_URI}
               path={USER_LIKES_URI}
               component={MyLikesPage}/>
        <Route key={USER_FRIENDS_URI}
               path={USER_FRIENDS_URI}
               component={FriendsPage}/>
        <Route key="any" path="*" component={ProfilePage}/>
      </Switch>
    );
  }
}



export default withRouter(ProfileRoute);
