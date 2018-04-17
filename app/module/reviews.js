'use strict';
const _ = require('lodash');

const mongoose = require('mongoose');
const { reviewSchemaString } = require('../models/review');

const Review = mongoose.model(reviewSchemaString);

async function updateReviewOrCreateIfNotExist({movieId, userId, content}) {
    return await Review.updateReviewOrCreateIfNotExist({
        movieId,
        userId,
        content,
    });
}

async function deleteReviewByUserIdAndMovieId({ userId, movieId}) {
    return await Review.deleteReviewByMovieIdAndUserId({
        userId,
        movieId,
    });
}

async function findReviewQuery({ userId, movieId }) {
    let reviewList = [];
    if(_.isNil(userId) && _.isNil(movieId)) {
        reviewList = await Review.findAllReviews();
    } else if (_.isNil(userId) && !_.isNil(movieId)) {
        // userId is null, movieId is not null
        reviewList = await Review.findReviewByMovieId({
            movieId,
        });
    } else if (!_.isNil(userId) && _.isNil(movieId)) {
        // userId is not null, movieId is not null
        reviewList = await Review.findReviewByUserId({
            userId,
        });
    } else {
        reviewList = await Review.findReviewByUserIdAndMovieId({
            userId,
            movieId,
        });
    }

    return reviewList;
}

async function findReviewByUserIdQuery({ userId }) {
    let reviewList = [];
    if(!_.isNil(userId)) {
        reviewList = await Review.findReviewByUserId({
            userId,});
    }

    return reviewList;
}

module.exports = {
    updateReviewOrCreateIfNotExist,
    deleteReviewByUserIdAndMovieId,
    findReviewQuery,
    findReviewByUserIdQuery,
};
