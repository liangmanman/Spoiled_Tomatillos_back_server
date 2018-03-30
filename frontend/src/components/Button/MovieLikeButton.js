import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject((stores) => {
    const { likes } = stores;
    
    return {
        likeMovie: likes.likeMovie,
        unlikeMovie: likes.unlikeMovie,
        isMovieLikedByUser: likes.isMovieLikedByUser,
        currentUserLikedMovies: likes.currentUserLikedMovies,
    }
})
@observer
class MovieLikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.postLikedMovie = this.postLikedMovie.bind(this);
        this.unLikeMovie = this.unLikeMovie.bind(this);
    }

    async postLikedMovie() {
        let { likeMovie, imdbID } = this.props;
        await likeMovie({
            imdbID: imdbID,
        })
    };

    async unLikeMovie() {
        let { unlikeMovie, imdbID } = this.props;

        await unlikeMovie({
            imdbID: imdbID,
        })
    }
    
    render() {
        let { isMovieLikedByUser, imdbID, currentUserLikedMovies } = this.props;
        if (isMovieLikedByUser({ currentUserLikedMovies, imdbID })) {
            return (<button className="btn-primary" onClick={this.unLikeMovie}>Unlike</button>);
        } else {
            return (<button className="btn-primary" onClick={this.postLikedMovie}>Like</button>);
        }
    }
    
}

MovieLikeButton.propTypes = {
    imdbID: PropTypes.string.isRequired,
};

export default MovieLikeButton;