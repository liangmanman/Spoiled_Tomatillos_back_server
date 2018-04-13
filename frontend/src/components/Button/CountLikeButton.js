import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@inject((stores) => {
  const { likes } = stores;

  return {
    getUsersLengthLikedMovieId: likes.getUsersLengthLikedMovieId,
    fetchUsersLengthLikedMovieId: likes.fetchUsersLengthLikedMovieId,
    usersLengthLikedMovies: likes.usersLengthLikedMovies.toJS(),
  }
})
@observer
class CountLikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.linkToMovieLikedByPage = this.linkToMovieLikedByPage.bind(this);
    this.renderCount = this.renderCount.bind(this);
  }

  linkToMovieLikedByPage = (e) => {
    e.preventDefault();

    this.props.history.push({
      pathname: '/movie/'+this.props.imdbID+ '/likedBy',
    });
};

  renderCount() {
    const { getUsersLengthLikedMovieId, imdbID, usersLengthLikedMovies } = this.props;
    return getUsersLengthLikedMovieId({
      usersLengthLikedMovies,
      usersLengthLikedMovies,
      imdbID
    });
  }

  componentWillMount() {

    const { fetchUsersLengthLikedMovieId, imdbID } = this.props;

    fetchUsersLengthLikedMovieId({
      imdbID,
    });
  }

  render() {
    return (<button className="like-count-btn btn btn-primary" onClick={this.linkToMovieLikedByPage}>{this.renderCount()}</button>);
  }

}

CountLikeButton.propTypes = {
  imdbID: PropTypes.string.isRequired,
};

export default withRouter(CountLikeButton);