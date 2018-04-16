
import React, { Component } from 'react';
import _ from 'lodash';
import {inject, observer} from "mobx-react";
import {MOVIE_DETAIL_URI} from "../containers/routesContainer/uriConstants";
import { Link } from 'react-router-dom';
import {generateMovieURI} from "../util";
import '../styles/RecentActivity.css'

@inject(stores => {
  let { reviews, session } = stores;
  return {
    fetchUserReviewList: reviews.fetchUserReviewList,
    reviewList: reviews.reviewList,
    getUserInfo: session.getUserInfo,
    userInfo: session.userInfo
  }
})
@observer
class RecentActivity extends React.Component {
  constructor(props) {
    super(props);
    this.getRecentReviews = this.getRecentReviews.bind(this);
    this.state = {
      loading: true,
      error: null,
    };
  }

  componentWillMount() {
   this.getRecentReviews();
  }

  getRecentReviews() {
    const {fetchUserReviewList, getUserInfo} = this.props;
    getUserInfo();
    const { userInfo } = this.props;
    fetchUserReviewList({userId: userInfo._id});
  }

  renderRecentReviews() {
    let { reviewList } = this.props;

    return _.map(reviewList.reverse(), (review) => {
      let date = new Date(review.createdAt);
      let dateString = '' + date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
      return (
          <div className="boxed">
            <h4 style={{fontWeight: 500}}>Review</h4>
            <Link to={generateMovieURI(review.movieId, MOVIE_DETAIL_URI)}>
              <h5 className="movie-title">{review.movie.title}</h5>
            </Link>
            <p>{dateString}</p>
            <p>{review.content}</p>
          </div>);
    });
  }

  render() {
    return (
        <div className="inside-boxed">
          <h4>Your Recent Activity:</h4>
          {this.renderRecentReviews()}
        </div>
    )
  }
}

export default RecentActivity;