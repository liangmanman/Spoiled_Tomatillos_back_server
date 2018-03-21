import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

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
    }
  }

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
    return (<button>{count}</button>);
  }

}

CountLikeButton.propTypes = {
  imdbID: PropTypes.string.isRequired,
};

export default CountLikeButton;