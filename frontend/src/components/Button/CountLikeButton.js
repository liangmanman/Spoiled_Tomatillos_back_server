import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@inject((stores) => {
  const { likes } = stores;

  return {
    getUsersLengthLikedMovieId: likes.getUsersLengthLikedMovieId,
  }
})
@observer
class CountLikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.linkToMovieLikedByPage = this.linkToMovieLikedByPage.bind(this);
  }

  linkToMovieLikedByPage = (e) => {
    e.preventDefault();

    this.props.history.push({
      pathname: '/movie/'+this.props.imdbID+ '/likedBy',
    });
};

  async getUsersLengthLikedMovieId() {
    const { getUsersLengthLikedMovieId, imdbID } = this.props;

    const response = await getUsersLengthLikedMovieId({
      imdbID,
    });
    this.setState({
      count: response.length ? response.length : 0,
    })

  }
  componentWillMount() {
    this.getUsersLengthLikedMovieId();
  }

  render() {
    let { count } = this.state;
    return (<button onClick={this.linkToMovieLikedByPage}>{count}</button>);
  }

}

CountLikeButton.propTypes = {
  imdbID: PropTypes.string.isRequired,
};

export default withRouter(CountLikeButton);