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