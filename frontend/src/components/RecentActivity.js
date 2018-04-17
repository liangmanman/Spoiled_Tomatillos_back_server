
import React, { Component } from 'react';
import _ from 'lodash';
import {inject, observer} from "mobx-react";
import {MOVIE_DETAIL_URI} from "../containers/routesContainer/uriConstants";
import { Link } from 'react-router-dom';
import {generateMovieURI} from "../util";
import '../styles/RecentActivity.css'
import PropTypes from "prop-types";

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
  }

  componentWillMount() {
    const {fetchUserReviewList, getUserInfo} = this.props;
    getUserInfo();
    const { selectedUser } = this.props;
    fetchUserReviewList({userId: selectedUser._id});
  }

  getHeaderName() {
    const { userInfo, selectedUser } = this.props;
    return (userInfo._id === selectedUser._id) ? "Your" : selectedUser.fullName + "'s";
  }

  renderRecentReviews() {
    let { reviewList } = this.props;

    return _.map(reviewList.reverse(), (review) => {
      let date = new Date(review.createdAt);
      let dateString = '' + date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
      return (
          <div className="boxed recent-entry">
            <img className="poster-mini" src={review.movie.posterImgPath}/>
            <div>
              <h5>You reviewed&nbsp;
                <Link className="movie-title" to={generateMovieURI(review.movieId, MOVIE_DETAIL_URI)}>
                  {review.movie.title}
                </Link>
                &nbsp;on {dateString}
              </h5>
              <p>{review.content}</p>
            </div>
          </div>);
    });
  }

  render() {
    return (
        <div className="inside-boxed">
          <h4>{this.getHeaderName()} Recent Activity:</h4>
          {this.renderRecentReviews()}
        </div>
    )
  }
}

RecentActivity.propTypes = {
  selectedUser: PropTypes.object.isRequired,
};

export default RecentActivity;