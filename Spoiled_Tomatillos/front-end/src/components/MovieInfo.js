import React, { Component, } from 'react';

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
            <h5>{result.Title}</h5>
            <p>Year: {result.Year}</p>
            <p>{result.Plot}</p>
            <div>{result.Ratings.map((rate, id) => {
              return <div key={id}> {rate.Source}: {rate.Value} </div>
            })}
            </div>

          </div>
        </div>
    );
  }
}

export default MovieInfo;

