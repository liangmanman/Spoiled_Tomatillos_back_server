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
  async getUsersLengthLikedMovieId({ imdbID }) {
    const res = await axios.get(generateMovieURI(imdbID, USERS_LENGTH_LIKE_MOVIEID_API));
    return res.data;
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
  }

  @action
  async unlikeMovie({ imdbID }) {
    await axios.post(UNLIKE_MOVIE_API, {
      imdbID,
    });
    await self.updateMoviesLikedByUserId();
  }
}

const self = new Likes();

export default self;