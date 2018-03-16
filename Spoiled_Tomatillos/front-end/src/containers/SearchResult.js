import * as React from 'react';
import { OMDB_API_KEY } from '../constants';
import { omdb_axios } from '../api/_axios';
import _ from 'lodash';
import MovieInfo from '../components/MovieInfo';

class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: true,
    };
    this.searchByKeyWord = this.searchByKeyWord.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const searchBy = nextProps.location.search;
    this.searchByKeyWord(searchBy.substr(7));
  }

  searchByKeyWord = (searchContent) => {
    this.setState({
      results: [],
      isLoading: true
    });
    const url = OMDB_API_KEY + '&s='+ searchContent;
    omdb_axios.get(url)
      .then((response) => {
        let movies = response.data.Search;
        movies = _.uniqBy(movies, function (m) {
          return m.imdbID;
        });
        movies.map((movie) => {
          const url2 = OMDB_API_KEY + '&i='+ movie.imdbID;
          omdb_axios.get(url2)
            .then((response) => {
              this.setState({
                results: [...this.state.results, response.data]
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ isLoading: false });
  };

  componentDidMount() {
    const searchBy = this.props.location.search;
    this.searchByKeyWord(searchBy.substr(7));
  }


  render() {
    const {results, isLoading,} = this.state;
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
          <div className="result-list">
            <h1>Search Result</h1>
            {results.map((result) => {
              return <MovieInfo imdbID={result.imdbID} key={result.imdbID}/>
            })}
          </div>
        </div>
    );
  }
}

export default SearchResult;
