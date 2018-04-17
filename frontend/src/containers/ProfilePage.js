import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link} from "react-router-dom";

import { USER_LIKES_URI, USER_FRIENDS_URI } from './routesContainer/uriConstants';
import { generateUserURI }  from '../util';
import FriendButton from '../components/Button/FriendButton';
import RecentActivity from "../components/RecentActivity";
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

  componentWillReceiveProps(nextProps) {
    const { userId } = nextProps.match.params;
    this.setState({
      profileUserId: userId});
    this.fetchUserProfile();
  }

  renderFriendButton() {
    let { _id } = this.props.userInfo;
    let { profileUserId } = this.state;
    if ( _id !== profileUserId) {
      return <FriendButton userId={ profileUserId } className="friend-button"/>;
    }
    return <div></div>;
  }

  render() {
    let { fullName, _id } = this.props.userInfo;
    let { profileUserName, profileUserId } = this.state;
    console.log("test");
    return (
      <div className="boxed">
        <h3>This is the Profile Page of User:  {profileUserName} {this.renderFriendButton()}</h3>
        <div className="inside-boxed">
          <Link to={generateUserURI(profileUserId, USER_LIKES_URI)}>
            <h4>See this user's likes</h4>
          </Link>
          <Link to={generateUserURI(profileUserId, USER_FRIENDS_URI)}>
            <h4>See this user's friends</h4>
          </Link>
        </div>
        <RecentActivity selectedUser={{_id: profileUserId, fullName: profileUserName}}/>
        <h4>You are logged in as {fullName}</h4>
      </div>
    );
  }
}

export default ProfilePage;
