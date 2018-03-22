import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import MovieList from '../MovieList';
import MoviePage from '../MoviePage';
import MovieLikedByPage from '../MovieLikedByPage';
import { MOVIE_LIST_URI, MOVIE_DETAIL_URI, MOVIE_LIKED_BY_URI } from "./uriConstants";

@observer
class MovieRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Switch>
          <Route key={MOVIE_LIST_URI} path={MOVIE_LIST_URI} component={MovieList}/>
          <Route key={MOVIE_DETAIL_URI}
                 path={MOVIE_DETAIL_URI}
                 component={MoviePage}/>
          <Route key={MOVIE_LIKED_BY_URI}
                 path={MOVIE_LIKED_BY_URI}
                 component={MovieLikedByPage}/>
          <Route key="any" path="*" component={MovieList}/>
        </Switch>
    );
  }
}



export default withRouter(MovieRoute);
