import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject((stores) => {
  const { friends } = stores;

  return {
    addFriend: friends.addFriend,
    postNotFriend: friends.postNotFriend,
  }
})
@observer
class FriendButton extends React.Component {
  constructor(props) {
    super(props);
    this.postNotFriend = this.postNotFriend.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }

  async postNotFriend() {
    let { postNotFriend, userId } = this.props;
    await postNotFriend({
      userId,
    })
  };

  async addFriend() {
    let { addFriend, userId } = this.props;

    await addFriend({
      userId,
    })
  }

  render() {
    return <h1>test Add friend</h1>
    // let { isMovieLikedByUser, imdbID, currentUserLikedMovies } = this.props;
    // if (isMovieLikedByUser({ currentUserLikedMovies, imdbID })) {
    //   return (<button onClick={this.unLikeMovie}>Unlike</button>);
    // } else {
    //   return (<button onClick={this.postLikedMovie}>Like</button>);
    // }
  }

}

FriendButton.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default FriendButton;