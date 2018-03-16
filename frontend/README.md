## react-front

Create React apps with webpack

* [AWS-backend](ec2-18-217-211-130.us-east-2.compute.amazonaws.com:8080) – Backend api endpoint.

##  Setup Environment

```sh
cd react-front
npm install
```

## Run Locally
```sh
npm start
```

## Build for Production
```sh
npm build
npm deploy
```

# Style Guide
To add new features, you should only add or edit the js files in directory *./src/containers*.

##To Add new Page

- Create a js file in `./src/containers`, use MovieList.js as the boilerplate.

```js
import * as React from 'react';
import { axios, } from '../api/_axios';

class MovieList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({isLoading: true,});
        axios.get('api/movies')
            .then((response) => {

                this.setState({movies: response.data, isLoading: false,});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const {movies, isLoading,} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <h2>Movie List</h2>
                {movies.map((movie) =>
                    <div key={movie.apiMovieId}>
                        {movie.apiMovieId}
                    </div>
                )}
            </div>
        );
    }
}

export default MovieList;
```

- add the uri constant to ./src/containers/routesContainer/uriConstants.

  ` export const MOVIE_LIST_URI = '/movie/list';`

- add the react containers to the router file:
```diff
import React from 'react';
import { Route, Switch, withRouter, } from 'react-router-dom';
import HomePage from '../HomePage';
+ import MovieList from '../MovieList';
- import {  } from "./uriConstants";
+ import { MOVIE_LIST_URI } from "./uriConstants";
```

```diff
<div>
    <div className="container">
        <Switch>
+            <Route key={MOVIE_LIST_URI} path={MOVIE_LIST_URI} component={MovieList}/>
            <Route key="any" path="*" component={HomePage}/>
        </Switch>
    </div>
</div>

```
