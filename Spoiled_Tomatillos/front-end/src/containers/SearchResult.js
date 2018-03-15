import * as React from 'react';
import { OMDB_API_KEY } from '../constants';
import { omdb_axios } from '../api/_axios';
import _ from 'lodash';
import NavBar from '../components/NavBar';
import MovieInfo from '../components/MovieInfo';
import qs from "query-string";

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
    const searchContent = qs.parse(nextProps.location.search).query;
    this.searchByKeyWord(searchContent);
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
    const searchContent = qs.parse(this.props.location.search).query;
    this.searchByKeyWord(searchContent);
  }


  render() {
    const {results, isLoading,} = this.state;
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
          <NavBar/>
          <div className="result-list">
            <h1>Search Result</h1>
            {results.map((result) => {
              return <MovieInfo movie={result} key={result.imdbID}/>
            })}
          </div>
        </div>
    );
  }
}

export default SearchResult;
