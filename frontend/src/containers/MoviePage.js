import * as React from 'react';
import { inject, observer } from "mobx-react";

import MovieItem from '../components/MovieItem';
import Reviews from '../components/Reviews';
import '../styles/Movie.css';
import '../styles/Main.css';

@inject(stores => {
  let { account } = stores;
  return {
    userInfo: account.userInfo,
  }
})
@observer
class MoviePage extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;
    let imdbID =  match.params.movieId;
    this.state = {
      imdbID,
      userRating: true
    };

  }

  render() {
    const { imdbID } = this.state;
    return (
        <div className="boxed">
          <div className="movie">
            <MovieItem imdbID={imdbID}/>
          </div>
          <Reviews movieId={imdbID}/>
        </div>
    );
  };

}

export default MoviePage;
