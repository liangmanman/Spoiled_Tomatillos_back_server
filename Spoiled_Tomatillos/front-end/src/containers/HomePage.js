import * as React from 'react';
import { Link } from 'react-router-dom'
<<<<<<< HEAD
import {MOVIE_LIST_URI, SIGNUP_URI} from "./routesContainer/uriConstants";
=======
import { MOVIE_LIST_URI } from "./routesContainer/uriConstants";
import SearchBar from '../components/SearchBar';
>>>>>>> master

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
  }

<<<<<<< HEAD
    render() {
        return (
            <div>
                <h2>Spoiled Tomatillos</h2>
                <Link to={MOVIE_LIST_URI}>Movie List</Link>
                <br/>
                <Link to={SIGNUP_URI}>Sign Up</Link>
                <form onSubmit={this.handleLogin}>
                    <label>
                        Username or Email Address:
                        <br/>
                        <input type={"text"} name={"name"} />
                        <br/>
                    </label>
                    <label>
                        Password:
                        <br/>
                        <input type={"text"} name={"password"} />
                        <br/>
                    </label>
                    <input type={"submit"} value={"Log In"} />
                </form>
            </div>
        );
    }

    handleLogin(event) {
        alert('user tried to log in!');
    }
=======
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <Link to={MOVIE_LIST_URI}>Movie List</Link>
        <SearchBar />
      </div>
    );
  }
>>>>>>> master
}

export default HomePage;
