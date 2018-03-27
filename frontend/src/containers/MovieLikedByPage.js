import * as React from 'react';
import { inject, observer } from "mobx-react";
import _ from 'lodash';

import '../styles/Movie.css';

@inject(stores => {
  let { likes, omdb } = stores;
  return {
    getUsersLikedMovieId: likes.getUsersLikedMovieId,
    getMovieById: omdb.getMovieById,
  }
})
@observer
class MovieLikedByPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      movie: null,
      isLoading: true,
    };
    this.loadUsersAndMovie = this.loadUsersAndMovie.bind(this);
    this.renderUsers = this.renderUsers.bind(this);

  }
  async loadUsersAndMovie() {
    const { match, getUsersLikedMovieId, getMovieById } = this.props;
    let { movieId } =  match.params;
    const users = await getUsersLikedMovieId({
      movieId,
    });
    const movie = await getMovieById(movieId);
    this.setState({
      users,
      movie,
      isLoading: false,
    });
  }
  componentWillMount() {
    this.loadUsersAndMovie();
  }
  renderUsers () {
    const { users } = this.state;
    return _.map(users, (user) => {
      return <li key={user._id}>{user.fullName}</li>
    })
  }

  render() {
    const { movie, isLoading } = this.state;
    if (isLoading) {
      return (<div></div>);
    }
    return (
        <div>
          <h5>People who also like {movie.Title}:</h5>
          <ul>
            {this.renderUsers()}
          </ul>
        </div>
    );
  };

}

export default MovieLikedByPage;
