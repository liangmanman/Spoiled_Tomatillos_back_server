import * as React from 'react';
import { omdb_axios } from '../api/_axios';
import { OMDB_API_KEY } from '../constants';
import _ from 'lodash';
import styles from '../styles/SearchBar.css';


class SearchBar extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        results: [],
      };
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const searchContent = e.target.elements.searchContent.value.trim();
    if (searchContent) {
      const url = OMDB_API_KEY+ searchContent;
      omdb_axios.get(url)
        .then((response) => {
          let movies = response.data.Search;
          movies = _.uniqBy(movies, function (m) {
            return m.imdbID;
          });
          this.setState({results: movies});
          console.log(this.state.results);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="search" className="searchBar searchText"></input>
          <button className="btn btn-primary">search</button>
        </form>
        <div className="result-list">
          {this.state.results.map((result) => {
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
      </div>
    );
  }
}

export default SearchBar;
