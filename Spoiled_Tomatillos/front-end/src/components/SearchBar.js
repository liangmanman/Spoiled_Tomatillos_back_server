import React, { Component, PropTypes } from 'react';
import { omdb_axios } from '../api/_axios';
import ReactDOM from 'react-dom';
import { OMDB_API_KEY } from '../constants';
import _ from 'lodash';
import { withRouter } from "react-router-dom";

class SearchBar extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        results: [],
      };
      this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const searchContent = e.target.elements.searchContent.value.trim();
    if (searchContent) {
      const url = OMDB_API_KEY + '&s='+ searchContent;
      omdb_axios.get(url)
        .then((response) => {
          let movies = response.data.Search;
          movies = _.uniqBy(movies, function (m) {
            return m.imdbID;
          });
          let movieList = [];
          movies.map((movie) => {
            const url2 = OMDB_API_KEY + '&i='+ movie.imdbID;
            omdb_axios.get(url2)
              .then((response) => {
                movieList.push(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
          this.props.history.push({
            pathname: '/search',
            search: '?query='+searchContent,
            movies: movieList
          });
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
          <input type="search" name="searchContent"></input>
          <button className="btn btn-primary">search</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SearchBar);
