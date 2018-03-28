import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link} from "react-router-dom";

import { USER_LIKES_URI } from './routesContainer/uriConstants';
import { generateUserURI }  from '../util';
import FriendButton from '../components/Button/FriendButton';


@inject(stores => {
  let { profiles, session } = stores;
  return {
    userInfo: session.userInfo,
    fetchUserProfile: profiles.fetchUserProfile,
  }
})
@observer
@withRouter
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUserProfile = this.fetchUserProfile.bind(this);
    this.renderFriendButton = this.renderFriendButton.bind(this);
    const { userId } = this.props.match.params;
    this.state = {
      profileUserName: '',
      profileUserId: userId,
    }
  }

  async fetchUserProfile() {
    let { fetchUserProfile } = this.props;
    const { profileUserId } = this.state;
    let data = await fetchUserProfile({ userId: profileUserId });
    this.setState({
      profileUserName: data.fullName,
    })
  }

  componentWillMount() {
    this.fetchUserProfile();
  }

  componentWillReceiveProps(nextProps) {
    const { userId } = nextProps.match.params;
    this.state = {
      profileUserId: userId,
    };
    this.fetchUserProfile();
  }

  renderFriendButton() {
    let { _id } = this.props.userInfo;
    let { profileUserId } = this.state;
    if ( _id !== profileUserId) {
      return <FriendButton userId={ profileUserId }/>;
    }
    return <div></div>;
  }

  render() {
    let { fullName, _id } = this.props.userInfo;
    let { profileUserName, profileUserId } = this.state;
    return (
      <div>
        <h2> You are logged in as {fullName}</h2>
        <h2>This is the Profile Page of User:  {profileUserName}</h2>
        {this.renderFriendButton()}
        <Link to={generateUserURI(profileUserId, USER_LIKES_URI)}>Likes</Link>
      </div>
    );
  }
}

export default ProfilePage;
