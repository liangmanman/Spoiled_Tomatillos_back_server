import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link} from "react-router-dom";

import { USER_LIKES_URI } from './routesContainer/uriConstants';
import { generateUserURI }  from '../util';
import FriendButton from '../components/Button/FriendButton';
import '../styles/ProfilePage.css';


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
      <div className="boxed">
        <h3>This is the Profile Page of User:  {profileUserName}</h3>
        <h4>You are logged in as {fullName}</h4>
        <Link to={generateUserURI(profileUserId, USER_LIKES_URI)}>
          <h4>See this user's likes</h4>
        </Link>
        {this.renderFriendButton()}
      </div>
    );
  }
}

export default ProfilePage;
