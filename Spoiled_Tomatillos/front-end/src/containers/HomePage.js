import * as React from 'react';
import { Link } from 'react-router-dom'
import { MOVIE_LIST_URI } from "./routesContainer/uriConstants";
import SearchBar from '../components/SearchBar';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <Link to={MOVIE_LIST_URI}>Movie List</Link>
        <SearchBar />
      </div>
    );
  }
}

export default HomePage;
