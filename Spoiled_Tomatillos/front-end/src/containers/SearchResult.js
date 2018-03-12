import * as React from 'react';
import { OMDB_API_KEY } from '../constants';
import { omdb_axios } from '../api/_axios';

class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: true,
    };
    this.searchByKeyWord = this.searchByKeyWord.bind(this);
  }

  searchByKeyWord = (searchContent) => {
    console.log(searchContent);
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
              console.log(this.state.results);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    const searchBy = this.props.location.search;
    this.searchByKeyWord(searchBy.substr(7));
    this.setState({isLoading: false});
  }


  render() {
    const {results, isLoading,} = this.state;
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
      <div className="result-list">
        <h1>Search Result</h1>
        {results.map((result) => {
          return <div className="row Card" key={result.imdbID}>
            <div className="col-sm-4">
              <img className="img-fluid" alt="Responsive image" src={result.Poster} />
            </div>
            <div className="col-sm-8 card-right card-title">
              <h5>Title: {result.Title}</h5>
              <p>Year: {result.Year}</p>
            </div>
          </div>
        })}
      </div>
    );
  }
}

export default SearchResult;
