import * as React from 'react';
import { Link } from 'react-router-dom';
import { MOVIE_LIST_URI } from "./routesContainer/uriConstants";
import SearchBar from '../components/SearchBar';
import LoginForm from '../components/LoginForm';
import styles from '../style/HomePage.css'

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
      <div className={styles.topBar}>
        <h2>Spoiled Tomatillos</h2>
          <LoginForm />
          <Link to={MOVIE_LIST_URI}>Movie List</Link>
          <SearchBar />
      </div>
    );
  }
}

export default HomePage;
