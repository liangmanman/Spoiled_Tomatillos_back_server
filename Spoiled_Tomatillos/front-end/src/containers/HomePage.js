import * as React from 'react';
import { Link } from 'react-router-dom'
import { MOVIE_LIST_URI } from "./routesContainer/uriConstants";
import NavBar from '../components/NavBar';

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
        <NavBar/>
      </div>
    );
  }
}

export default HomePage;
