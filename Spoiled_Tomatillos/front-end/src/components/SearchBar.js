import React from 'react';
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
      this.props.history.push({
        pathname: '/search',
        search: '?query='+searchContent
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
