import * as React from 'react';

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

  fetch('api/movies')
    .then(response => response.json())
    .then(data => this.setState({movies: data, isLoading: false}));
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
