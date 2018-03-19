import * as React from 'react';
import MovieInfo from '../components/MovieInfo';
import {omdb_axios} from "../api/_axios";
import {OMDB_API_KEY} from "../constants";
import '../styles/Movie.css';
import {axios,} from '../api/_axios';
// import NavBar from "../components/NavBar";
import greyThumbsUp from "../img/greyup-64x64.png";
import greenThumbsUp from "../img/greenup-64x64.png";
import greyThumbsDown from "../img/greydown-64x64.png";
import redThumbsDown from "../img/reddown-64x64.png";
import { inject, observer } from "mobx-react";

function ThumbsUp(props) {
  let tu_img = props.userRating ? greenThumbsUp : greyThumbsUp;
  return <button><img src={tu_img}/></button>;
}

function ThumbsDown(props) {
  let td_img = (props.userRating != null && !props.userRating) ? redThumbsDown : greyThumbsDown;
  return <button><img src={td_img}/></button>;
}


@inject(stores => {
  let { account, movies, likes } = stores;
  return {
    userInfo: account.userInfo,
    postLikeMovie: movies.postLikeMovie,
      likeMovie: likes.likeMovie,
      unlikeMovie: likes.unlikeMovie,
      isMovieLikedByUser: likes.isMovieLikedByUser,
      currentUserLikedMovies: likes.currentUserLikedMovies,
      updateCurrentUserLikedMovies: likes.updateCurrentUserLikedMovies,
  }
})
@observer
class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: undefined,
      isLoading: true,
      userRating: true
    };
    this.postLikedMovie = this.postLikedMovie.bind(this);
    this.unLikeMovie = this.unLikeMovie.bind(this);
    this.renderLikeButton = this.renderLikeButton.bind(this);
  }

  componentWillMount() {
    this.props.updateCurrentUserLikedMovies();
  }

  async postLikedMovie() {
    let { postLikeMovie, likeMovie } = this.props;
    let { result } = this.state;
    await postLikeMovie({
      movie: result,
    });
    await likeMovie({
        imdbID: result.imdbID,
    })
  };

  async unLikeMovie() {
      let { unlikeMovie } = this.props;
      let { imdbID } = this.state.result;

      await unlikeMovie({
          imdbID: imdbID,
      })
  }

  renderLikeButton() {
    let { isMovieLikedByUser, currentUserLikedMovies } = this.props;
      let { imdbID } = this.state.result;

      if (isMovieLikedByUser({ currentUserLikedMovies, imdbID })) {
          return (<button onClick={this.unLikeMovie}>Unlike</button>);
      } else {
          return (<button onClick={this.postLikedMovie}>Like</button>);
      }
  }

  searchById(params) {
    const url2 = OMDB_API_KEY + '&i=' + params.id;
    omdb_axios.get(url2)
        .then((response) => {
          this.setState({
            result: response.data,
            isLoading: false
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  };
  

  componentDidMount() {
    let {location: {movie}, match: {params}} = this.props;
    movie ? this.setState({result: movie, isLoading: false}) : this.searchById(params);
  }

  render() {
    const {result, isLoading,} = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
        <div>
          <div className="movie">
            <MovieInfo imdbID={result.imdbID} key={result.imdbID}/>
              {this.renderLikeButton()}
          </div>
          <div>
            <ThumbsUp userRating={this.state.userRating}/>
            <ThumbsDown userRating={this.state.userRating}/>
          </div>

        </div>
    );
  };

}

export default MoviePage;
