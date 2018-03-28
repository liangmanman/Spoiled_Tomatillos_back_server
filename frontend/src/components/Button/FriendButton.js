import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import * as MaterialDesign from 'react-icons/lib/md'



@inject((stores) => {
  const { friends } = stores;

  return {
    addFriend: friends.addFriend,
    unFriend: friends.unFriend,
    fetchFriendStatus: friends.fetchFriendStatus,
    fetchOtherStatus: friends.fetchOtherStatus,
  }
})
@observer
class FriendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFriend: false,
      isOtherFriend: false,
    };
    this.unFriend = this.unFriend.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.fetchFriendStatus = this.fetchFriendStatus.bind(this);
    this.renderFriendButton = this.renderFriendButton.bind(this);
  }

  componentWillMount() {
    this.fetchFriendStatus();
    this.fetchOtherStatus();
  }

  async fetchOtherStatus() {
    const { fetchOtherStatus, userId } = this.props;

    let isOtherFriend = await fetchOtherStatus({
      userId,
    });
    this.setState({
      isOtherFriend,
    });
  }

  async fetchFriendStatus() {
    const { fetchFriendStatus, userId } = this.props;

    let isFriend = await fetchFriendStatus({
      userId,
    });
    this.setState({
      isFriend,
    });
  }

  async unFriend() {
    let { unFriend, userId } = this.props;
    await unFriend({
      userId,
    });
    this.fetchFriendStatus();
    this.fetchOtherStatus();
  };

  async addFriend() {
    let { addFriend, userId } = this.props;

    await addFriend({
      userId,
    });
    this.fetchFriendStatus();
    this.fetchOtherStatus();
  }


  renderFriendButton() {
    let { isFriend, isOtherFriend } = this.state;
    if (isFriend && isOtherFriend) {
      return <button onClick={this.unFriend}>
        <MaterialDesign.MdPeople size={28}/> UnFriend
      </button>;
    }
    if (isFriend) {
      return <button onClick={this.unFriend}>
        <MaterialDesign.MdPersonOutline size={28}/> UnFriend
      </button>;
    }
    return <button onClick={this.addFriend}>
      <MaterialDesign.MdPersonAdd size={28}/> Add friend
    </button>;
  }

  render() {
    return this.renderFriendButton();
  }

}

FriendButton.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default FriendButton;