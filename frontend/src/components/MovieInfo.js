import React, { Component, } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MOVIE_DETAIL_URI } from "../containers/routesContainer/uriConstants";

@inject(stores => {
  let { omdb } = stores;
  return {
    movieList: omdb.movieList,
    getMovieById: omdb.getMovieById,
  }
})@observer
class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.getMovie = this.getMovie.bind(this);
    this.state = {
      loading: true,
      result: null,
      error: null,
    };
  }

  componentWillMount() {
    this.getMovie();
  }

  async getMovie(){
    try {
      const { getMovieById, imdbID } = this.props;
      const movieInfo = await getMovieById(imdbID);
      this.setState({
        result: movieInfo,
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: err,
        loading: false,
      });
    }
  }

  render() {
    const { result, loading, error } = this.state;

    if (loading) {
      return (<div></div>);
    }
    if (error) {
      return (<div></div>);
    }

    return (
        <div className="row Card">
          <div className="col-sm-4">
            <img className="img-fluid" alt="Responsive image" src={result.Poster} />
          </div>
          <div className="col-sm-8 card-right card-title">
            <h5>
              <Link to={{ pathname: `${MOVIE_DETAIL_URI}/${result.imdbID}`, 'movie': result }}>
                Title: {result.Title}
              </Link>
            </h5>
            <p>Year: {result.Year}</p>
            <p>{result.Plot}</p>
            <div>{result.Ratings.map((rate, id) => {
              return <div key={id}> {rate.Source}: {rate.Value} </div>
            })}
            </div>
            <ul>
              <li>Genre:	{result.Genre}</li>
              <li>Directed By:	{result.Director}</li>
              <li>Written By:	{result.Writer}</li>
              <li>Released: {result.Released}</li>
              <li>Box Office: {result.BoxOffice}</li>
              <li>Runtime: {result.Runtime}</li>
              <li>Production:	{result.Production}</li>
            </ul>

          </div>
        </div>
    );
  }
}


MovieInfo.propTypes = {
  imdbID: PropTypes.string.isRequired,
};

export default MovieInfo;

