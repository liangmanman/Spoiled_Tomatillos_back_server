import * as React from 'react';
import { s_t_Instance } from './api/_axios';

class MovieList extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      movies: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    s_t_Instance.get('api/movies')
    .then((response) => {

      this.setState({movies: response.data, isLoading: false});
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  render() {
    const {movies, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>Movie List</h2>
        {movies.map((movie: any) =>
          <div key={movie.apiMovieId}>
            {movie.apiMovieId}
          </div>
        )}
      </div>
    );
  }
}

export default MovieList;
