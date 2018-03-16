import { action, observable } from 'mobx'
import _ from 'lodash';

import { axios } from '../api/_axios';
import { MOVIE_LIST_API, POST_MOVIE_API } from '../api/constants';


class Movies {
  @observable movieList = [];
  @observable errorMessage = null;


  @action setMovieList(movieList) {
    self.movieList = movieList;
  }

  @action async postLikeMovie({movie}) {
    //TODO add the api of post liked movie
    console.log(movie);
    axios.post(POST_MOVIE_API, {
        imdbID: movie.imdbID,
        title: movie.Title,
        posterImgPath: movie.Poster,
        releaseYear: movie.Year,
        briefDescription: movie.Plot,
    });

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