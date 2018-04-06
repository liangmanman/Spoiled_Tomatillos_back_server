import * as React from 'react';
import { inject, observer } from "mobx-react";

import MovieItem from '../components/MovieItem';
import Reviews from '../components/Reviews';
import '../styles/Movie.css';
import '../styles/Main.css'
import greyThumbsUp from "../img/greyup-64x64.png";
import greenThumbsUp from "../img/greenup-64x64.png";
import greyThumbsDown from "../img/greydown-64x64.png";
import redThumbsDown from "../img/reddown-64x64.png";

function ThumbsUp(props) {
  let tu_img = props.userRating ? greenThumbsUp : greyThumbsUp;
  return <button className="btn-primary"><img src={tu_img}/></button>;
}

function ThumbsDown(props) {
  let td_img = (props.userRating != null && !props.userRating) ? redThumbsDown : greyThumbsDown;
  return <button className="btn-primary"><img src={td_img}/></button>;
}

@observer
class MoviePage extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;
    let imdbID =  match.params.movieId;
    this.state = {
      imdbID,
      userRating: true
    };

  }

  render() {
    const { imdbID } = this.state;
    return (
        <div className="boxed">
          <div className="movie">
            <MovieItem imdbID={imdbID}/>
          </div>
          <Reviews movieId={imdbID}/>
          <div>
            <ThumbsUp userRating={this.state.userRating}/>
            <ThumbsDown userRating={this.state.userRating}/>
          </div>
        </div>
    );
  };

}

export default MoviePage;
