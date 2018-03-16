import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import MovieList from '../MovieList';
import MoviePage from '../MoviePage';
import { MOVIE_LIST_URI, MOVIE_DETAIL_URI } from "./uriConstants";

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
                 path={`${MOVIE_DETAIL_URI}/:id`}
                 component={MoviePage}/>
          <Route key="any" path="*" component={MovieList}/>
        </Switch>
    );
  }
}



export default withRouter(MovieRoute);
