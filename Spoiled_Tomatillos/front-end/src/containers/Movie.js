import * as React from 'react';
import NavBar from "../components/NavBar";
import MovieInfo from '../components/MovieInfo';
import {omdb_axios} from "../api/_axios";
import {OMDB_API_KEY} from "../constants";
import '../styles/Movie.css';
import greyThumbsUp from "../img/greyup-64x64.png";
import greenThumbsUp from "../img/greenup-64x64.png";
import greyThumbsDown from "../img/greydown-64x64.png";
import redThumbsDown from "../img/reddown-64x64.png";

function ThumbsUp(props) {
  let tu_img = props.userRating ? greenThumbsUp : greyThumbsUp;
  return <button><img src={tu_img}/></button>;
}

function ThumbsDown(props) {
  let td_img = (props.userRating != null && !props.userRating) ? redThumbsDown : greyThumbsDown;
  return <button><img src={td_img}/></button>;
}

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: undefined,
      isLoading: true,
      userRating: true
    };
  }


  searchById = (params) => {
    const url2 = OMDB_API_KEY + '&i='+ params.id;
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
    let { location: { movie }, match: { params } } = this.props;
    movie? this.setState({ result : movie, isLoading: false }) : this.searchById(params);
  }

  render() {
    const {result, isLoading,} = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
        <div>
          <NavBar/>
          <div className="movie">
            <MovieInfo movie={result} key={result.imdbID}/>
          </div>
          <div>
            <ThumbsUp userRating={this.state.userRating}/>
            <ThumbsDown userRating={this.state.userRating}/>
          </div>

        </div>
    );
  };

}

export default Movie;
