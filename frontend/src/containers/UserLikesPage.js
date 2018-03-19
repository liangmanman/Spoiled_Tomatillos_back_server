import React from 'react';
import _ from 'lodash';
import {inject, observer} from "mobx-react";

import MovieItem from '../components/MovieItem';


@inject(stores => {
    let { account, movies, likes, profiles } = stores;
    return {
        userInfo: account.userInfo,
        postLikeMovie: movies.postLikeMovie,
        likeMovie: likes.likeMovie,
        unlikeMovie: likes.unlikeMovie,
        isMovieLikedByUser: likes.isMovieLikedByUser,
        currentUserLikedMovies: likes.currentUserLikedMovies,
        updateCurrentUserLikedMovies: likes.updateCurrentUserLikedMovies,
        getUserLikedMovies: likes.getUserLikedMovies,
        fetchUserProfile: profiles.fetchUserProfile,
    }
})
@observer
class MyLikesPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderMoveInfoList = this.renderMoveInfoList.bind(this);
        this.getPageUserName = this.getPageUserName.bind(this);
        this.state = {
            pageUserName: 'Unknown',
            userLikedMovieList: [],
        }
    }

    async getPageUserName() {
        const { fetchUserProfile, match } = this.props;
        let { userId } = match.params;

        const userProfile = await fetchUserProfile({
            userId,
        });
        this.setState({
            pageUserName: userProfile.fullName,
        })
    }

    async getPageUserMoveList() {
        const { getUserLikedMovies, match } = this.props;
        let { userId } = match.params;

        const userLikedMovieList = await getUserLikedMovies({
            userId,
        });
        this.setState({
            userLikedMovieList,
        })

    }
    componentWillMount() {
        this.props.updateCurrentUserLikedMovies();
        this.getPageUserName();
        this.getPageUserMoveList();
    }

    renderMoveInfoList() {
        const { userLikedMovieList } = this.state;

        return _.map(userLikedMovieList, (movie) => {
            return (
                <div key={movie.title}>
                    {/*<Link to={}>*/}
                        <h1>{movie.title} </h1>
                        <MovieItem imdbID={movie.imdbID}/>
                    {/*</Link>*/}
                </div>
            );
        });


    }

    render() {
        const { pageUserName } = this.state;
        return (
            <div>
                <h2>Movies Liked by {pageUserName}</h2>
                {this.renderMoveInfoList()}
            </div>
        );
    }
}

export default MyLikesPage;
