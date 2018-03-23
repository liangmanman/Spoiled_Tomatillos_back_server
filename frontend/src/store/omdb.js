import { action, observable } from 'mobx'
import _ from 'lodash';

import { omdb_axios } from '../api/_axios';
import { MOVIE_LIST_API, MOVIE_POST_LIKED_MOVIE } from '../api/constants';
import {OMDB_API_KEY} from "../constants";


class OmdbApi {
  @observable movieList = [];

  @action setMovieList(movieList) {
    self.movieList = movieList;
  }

  @action async getMovieBySearch(searchBy) {
    self.setMovieList([]);
    const url = OMDB_API_KEY + '&s='+ searchBy;
    const response = await omdb_axios.get(url);
    let movies = response.data.Search;
    movies = _.uniqBy(movies, function (m) {
      return m.imdbID;
    });
    movies.map((movie) => {
      self.addMovieById(movie.imdbID);
    });
  }

  @action async addMovieById(id) {
    try {
      const url = OMDB_API_KEY + '&i='+ id;
      const res = await omdb_axios.get(url);
      self.addMovie(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  @action async getMovieById(id) {
    try {
      const url = OMDB_API_KEY + '&i='+ id;
      const res = await omdb_axios.get(url);
      const resdata = res.data;
      if (_.isNil(resdata.Error)) {
        return res.data;

      } else {
        throw resdata.Error;
      }
    } catch (err) {
      throw err;
    }
  }

  @action addMovie(movie) {
    self.movieList = [...self.movieList, movie]
  }

}

const self = new OmdbApi();

export default self;