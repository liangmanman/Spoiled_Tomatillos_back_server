import React, { Component, } from 'react';
import {MOVIE_URI} from "../containers/routesContainer/uriConstants";
import { Link } from 'react-router-dom';

class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: this.props.movie
    };
  }

  render() {
    const {result} = this.state;
    return (
        <div className="row Card">
          <div className="col-sm-4">
            <img className="img-fluid" alt="Responsive image" src={result.Poster} />
          </div>
          <div className="col-sm-8 card-right card-title">
            <h5>
              <Link to={{ pathname: `${MOVIE_URI}/${result.imdbID}`, 'movie': result }}>
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

export default MovieInfo;

