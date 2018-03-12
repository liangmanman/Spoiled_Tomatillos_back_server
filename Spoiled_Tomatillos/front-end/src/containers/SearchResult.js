import * as React from 'react';
import ReactDOM from 'react-dom';
import { OMDB_API_KEY } from '../constants';
import { omdb_axios } from '../api/_axios';

class SearchResult extends React.Component {

  constructor(props) {
      super(props);
      console.log(this.props);
      this.state = {
          result: ['a', 'b', 'c'],
          results: [],
          isLoading: false,
      };
  }

  componentDidMount() {
    this.setState({isLoading: true,});
    this.setState({ results: this.props.location.movies,});
    this.setState({isLoading: false,});
  }



  render() {
    const {results, isLoading,} = this.state;
    const {movies,} = this.props.location;

    if (isLoading) {
        return <p>Loading...</p>;
    }
    console.log('render called');
    console.log(this.state.result);
    console.log(this.props.location.movies);
    this.props.location.movies.map((movie) => console.log(movie));
    debugger;

    return (
      <div className="result-list">
          <h1>Search Result</h1>
          { this.state.results.map((movie) => <h1 id={movie.imdbId}>{movie.Title}</h1>) }
          { this.state.result.map((movie) => <h1>{movie}</h1>) }
      </div>
    );
  }
}

export default SearchResult;
