import * as React from 'react';
import _ from 'lodash';
import MovieItem from '../components/MovieItem';
import {inject, observer} from "mobx-react";
import stylesMain from '../styles/Main.css'


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
        return <MovieItem imdbID={movie.imdbID} key={movie.imdbID}/>
      });


  }

  render() {

    return (
        <div className="boxed">
          <h3 className="page-header">Movies Liked By You</h3>
          {this.renderMoveInfoList()}
        </div>
    );
  }
}

export default MovieList;
