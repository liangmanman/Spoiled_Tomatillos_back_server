import {action, observable} from 'mobx'
import _ from 'lodash';

import {axios} from '../api/_axios';
import sessionStore from "./session";
import { generateUserURI, generateMovieURI } from '../util';
import {
  LIKE_MOVIE_API,
  UNLIKE_MOVIE_API,
  CURRENT_USER_LIKED_MOVIES_API,
  MOVIES_LIKED_BY_USERID_API,
  USERS_LIKE_MOVIEID_API,
  USERS_LENGTH_LIKE_MOVIEID_API,
} from '../api/constants';


class Likes {
  @observable currentUserLikedMovies = [];
  @observable errorMessage = null;
  @observable usersLengthLikedMovies = [];

  @action
  async updateMoviesLikedByUserId() {
    self.currentUserLikedMovies  = await self.getMoviesLikedByUserId({
      userId: sessionStore.userInfo._id,
    });
  }

  @action
  async getMoviesLikedByUserId({ userId }) {
    const res = await axios.get(generateUserURI(userId, MOVIES_LIKED_BY_USERID_API));
    return res.data;
  }

  @action
  async getUsersLikedMovieId({ movieId }) {
    const res = await axios.get(generateMovieURI(movieId, USERS_LIKE_MOVIEID_API));
    return res.data;
  }

  @action
  async fetchUsersLengthLikedMovieId({ imdbID }) {
    const res = await axios.get(generateMovieURI(imdbID, USERS_LENGTH_LIKE_MOVIEID_API));
    const length = res.data.length ? res.data.length : 0;
    self.setUsersLengthLikedMovieId({
      imdbID,
      length: length
    });
  }

  @action setUsersLengthLikedMovieId({imdbID, length}) {
    const index = _.findIndex(self.usersLengthLikedMovies, {imdbID});
    if (index == -1) {
      self.usersLengthLikedMovies = [...self.usersLengthLikedMovies, {imdbID, length}]
    } else {
      self.usersLengthLikedMovies[index] = {imdbID, length};
    }
  }

  @action getUsersLengthLikedMovieId({usersLengthLikedMovies, imdbID}) {
    const lengthObject = _.find(usersLengthLikedMovies, (o) => {
      return o.imdbID === imdbID;
    });
    if (lengthObject) {
      return lengthObject.length;
    }
    return 0;
  }

  @action isMovieLikedByUser({ currentUserLikedMovies, imdbID }) {
    const movieFound = _.find(currentUserLikedMovies, (m) => {
      return m.imdbID === imdbID;
    });

    return !_.isNil(movieFound);
  }

  @action
  async likeMovie({ imdbID }) {
    await axios.post(LIKE_MOVIE_API, {
      imdbID,
    });
    await self.updateMoviesLikedByUserId();
    await self.fetchUsersLengthLikedMovieId({imdbID});
  }

  @action
  async unlikeMovie({ imdbID }) {
    await axios.post(UNLIKE_MOVIE_API, {
      imdbID,
    });
    await self.updateMoviesLikedByUserId();
    await self.fetchUsersLengthLikedMovieId({imdbID});
  }
}

const self = new Likes();

export default self;