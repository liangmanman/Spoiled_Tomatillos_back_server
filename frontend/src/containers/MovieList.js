import * as React from 'react';
import _ from 'lodash';
import MovieInfo from '../components/MovieInfo';
import {inject, observer} from "mobx-react";


@inject(stores => {
  let { movies } = stores;
  return {
    fetchMovieList: movies.fetchMovieList,
    movieList: movies.movieList.toJS(),
  }
})
@observer
class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.renderMoveInfoList = this.renderMoveInfoList.bind(this);
  }

  componentWillMount() {
    this.props.fetchMovieList();
  }

  renderMoveInfoList() {
    const { movieList } = this.props;

      return _.map(movieList, (movie) => {
        return <MovieInfo key={movie.imdbID} imdbID={movie.imdbID}/>;
      });


  }


  render() {

    return (
        <div>
          <h2>Movie List</h2>
          {this.renderMoveInfoList()}
        </div>
    );
  }
}

export default MovieList;
