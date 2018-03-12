import * as React from 'react';
import styles from '../styles/SearchBar.css';
import {withRouter} from "react-router-dom";


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
      this.props.history.push('/search?query=' + searchContent);
      window.location.reload();
    }
  };

  render() {
    return (
        <div>
          <form className="searchBar" onSubmit={this.handleSubmit}>
            <input className="searchText" type="search" name="searchContent"></input>
            <button className="btn btn-primary searchButton ">search</button>
          </form>
        </div>
    );
  }
}

export default withRouter(SearchBar);
