import * as React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import MovieItem from '../components/MovieItem';
import {inject, observer} from "mobx-react";
import {generateUserURI} from "../util";
import {USER_PROFILE_URI} from "./routesContainer/uriConstants";
import '../styles/Main.css';
import '../styles/SearchResult.css';


@inject(stores => {
  let { users, omdb, } = stores;
  return {
    getUserBySearch: users.getUserBySearch,
    userList: users.userList,
    getMovieBySearch: omdb.getMovieBySearch,
    movieList: omdb.movieList.toJS(),
  }
})
@observer
class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    this.searchByKeyWord = this.searchByKeyWord.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const search = this.props.location.search;
    const searchBy = nextProps.location.search;
    if (searchBy && (searchBy != search)) {
      this.searchByKeyWord(searchBy.substr(7));
    }
  }

  async searchByKeyWord(searchBy) {
    const { getMovieBySearch, getUserBySearch } = this.props;
    await getMovieBySearch(searchBy);
    await getUserBySearch(searchBy);
  }

  componentWillMount() {
    const searchBy = this.props.location.search;
    if (searchBy) {
      this.searchByKeyWord(searchBy.substr(7));
    }
  }

  renderUsers() {
    const { userList } = this.props;

    if (userList[0]) {
        return (
            <div className="boxed result-list">
                <h2>Users</h2>
                {_.map(userList, (user) => {
                    return (
                        <div className={"userResult inside-boxed"}>
                          <Link to={generateUserURI(user.userId, USER_PROFILE_URI)}><h5>{user.fullName}</h5></Link>
                          <p>Name: {user.fullName}</p>
                        </div>
                    );})
                }
            </div>
        );
    }
  }

  renderMovies() {
    const { movieList } = this.props;

    if (movieList[0]) {
      return (
          <div className="boxed result-list">
            <h2>Movies</h2>
            {_.map(movieList, (movie) => {
              return <MovieItem imdbID={movie.imdbID} key={movie.imdbID}/>
            })}
          </div>
      );
    }

  }


  render() {
    return (
        <div>
          <h1 className="boxed" style={{width:"30%"}}>Search Results</h1>
          {this.renderUsers()}
          {this.renderMovies()}
        </div>
    );
  }
}

export default SearchResult;
