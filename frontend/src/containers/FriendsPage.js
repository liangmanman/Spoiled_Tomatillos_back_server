import React from 'react';
import _ from 'lodash';
import {inject, observer} from "mobx-react";
import { Link } from 'react-router-dom';

import {generateUserURI} from "../util";
import {USER_PROFILE_URI} from "./routesContainer/uriConstants";


@inject(stores => {
  let { friends, profiles } = stores;
  return {
    fetchFriends: friends.fetchFriends,
    fetchUserProfile: profiles.fetchUserProfile,
  }
})
@observer
class MyLikesPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderFriendList = this.renderFriendList.bind(this);
    this.getPageUserName = this.getPageUserName.bind(this);
    this.state = {
      pageUserName: 'Unknown',
      friends: [],
    }
  }

  async getPageUserName() {
    const { fetchUserProfile, match } = this.props;
    let { userId } = match.params;

    const userProfile = await fetchUserProfile({
      userId,
    });
    this.setState({
      pageUserName: userProfile.fullName,
    })
  }

  async getPageUserFriends() {
    const { fetchFriends, match } = this.props;
    let { userId } = match.params;

    const friends = await fetchFriends({
      userId,
    });
    this.setState({
      friends: friends,
    });
    console.log('this.states.friends', this.state.friends);

  }

  async componentWillMount() {
    await this.getPageUserName();
    await this.getPageUserFriends();
  }

  renderFriendList() {
    const { friends } = this.state;

    return _.map(friends, (friend) => {
      const { toUser } = friend;
      let date = new Date(friend.createdAt);
      let dateString = '' + date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
      return (
          <div key={toUser.fullName} className={"user-result inside-boxed"}>
            <Link to={generateUserURI(toUser._id, USER_PROFILE_URI)}><h5 className="link">{toUser.fullName}</h5></Link>
            <p>Name: {toUser.fullName}</p>
            <p>Friends Since: {dateString}</p>
          </div>
      );
    });
  }

  render() {
    const { pageUserName } = this.state;
    return (
      <div className="boxed">
        <h2>{pageUserName}'s friends: </h2>
        {this.renderFriendList()}
      </div>
    );
  }
}

export default MyLikesPage;