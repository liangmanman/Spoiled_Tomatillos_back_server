import * as React from 'react';
import NavBar from "../components/NavBar";
import MovieInfo from '../components/MovieInfo';
import {omdb_axios} from "../api/_axios";
import {OMDB_API_KEY} from "../constants";
import '../styles/Movie.css';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: undefined,
      isLoading: true,
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

        </div>
    );
  }
}

export default Movie;
