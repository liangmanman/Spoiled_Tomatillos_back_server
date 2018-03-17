import { action, observable } from 'mobx'
import _ from 'lodash';

import { axios } from '../api/_axios';
import { MOVIE_LIST_API, MOVIE_POST_LIKED_MOVIE } from '../api/constants';


class Movies {
  @observable movieList = [];
  @observable errorMessage = null;


  @action setMovieList(movieList) {
    self.movieList = movieList;
  }

  @action async postLikeMovie({movie, userId}) {
    //TODO add the api of post liked movie
    console.log(movie);
    console.log(userId);
    axios.post(MOVIE_POST_LIKED_MOVIE, {
      userId,
      movie
    })

  }

  @action async fetchMovieList() {
    try {
      const res = await axios.get(MOVIE_LIST_API);
      self.setMovieList(res.data);
    } catch (err) {
      self.errorMessage = err.message;
      console.log(err);
    }
  }

}

const self = new Movies();

export default self;