'use strict';
const _ = require('lodash');

const mongoose = require('mongoose');
const { reviewSchemaString } = require('../models/review');

const Review = mongoose.model(reviewSchemaString);


async function findAllReviews() {
    const queryResponse =  Review.find();
    return await Review.populateMoveAndUser(queryResponse);
}

async function updateReviewOrCreateIfNotExist({movieId, userId, content}) {
    return await Review.updateReviewOrCreateIfNotExist({
        movieId,
        userId,
        content,
    });
}


module.exports = {
    updateReviewOrCreateIfNotExist,
    findAllReviews,
};
