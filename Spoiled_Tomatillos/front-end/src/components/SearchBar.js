import React from 'react';
import { withRouter } from "react-router-dom";
import '../styles/SearchBar.css';

class SearchBar extends React.Component {

  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const searchContent = e.target.elements.searchContent.value.trim();

    if (searchContent) {
      // this.props.history.push('/search?query=' + searchContent);
      // window.location.reload();
      this.props.history.push({
        pathname: '/search',
        search: '?query='+searchContent
      });
    }
  };

  render() {
    return (
      <div>
        <form className="searchBar" onSubmit={ this.handleSubmit }>
          <input className="searchText" type="search" name="searchContent"></input>
          <button className="btn btn-primary searchButton ">search</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SearchBar);
