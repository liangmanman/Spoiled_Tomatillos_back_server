'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const _ = require('lodash');
const Joi = require('joi');


const { incrementVersionNumberForSchema } = require('./utils');

const { userSchemaString } = require('./user');
const { movieSchemaString } = require('./movie');

const Schema = mongoose.Schema;

const reviewSchemaString = 'review';


/**
 * Review Schema
 */

const ReviewSchema = new Schema({
    movieId: {
        type: mongoose.Schema.ObjectId,
        ref: movieSchemaString ,
        index: true,
        required: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: userSchemaString,
        index: true,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

// create unique compound index, each user can only comment on the same movie once.
ReviewSchema.index({ movieId: 1, userId: 1 }, { unique: true});


const JoiReviewSchema = Joi.object().keys({
    userId: Joi.string(),
    movieId: Joi.string(),
    content: Joi.string(),
});

/**
 * Validations
 */

ReviewSchema.path('content').validate(function (content) {
    // check unique movie list
    return content.length > 0;
}, 'content cannot be blank');

/**
 * Statics
 */

ReviewSchema.statics = {
    filterNullReview(reviewList) {
        return _.filter(reviewList, (review) =>{
            return !_.isNil(review.userId) && !_.isNil(review.movieId);
        })
    },
    populateMoveAndUser: async function(queryResponse) {
        const reviewList =  await queryResponse.populate({
            path: 'userId',
            select: '-hashed_password -salt',
        }).populate({
            path: 'movieId',
        });
        return this.filterNullReview(reviewList);
    },
    findReviewByUserId: async function({ userId }) {
        const queryResponse = this.find({
            userId,
        });
        return await this.populateMoveAndUser(queryResponse);
    },
    findReviewByMovieId: async function({ movieId }) {
        const queryResponse = this.find({
            movieId,
        });
        return await this.populateMoveAndUser(queryResponse);
    },
    updateReviewOrCreateIfNotExist: async function({ movieId, userId, content}) {
        return await this.findOneAndUpdate({
            movieId,
            userId,
        }, {
            movieId,
            userId,
            content,
        }, {
            new: true,
            upsert: true,
        })
    },
    deleteReview: async function({ movieId, userId }) {
        return await this.remove({
            movieId,
            userId,
        });
    },
};


/**
 * pre
 */

ReviewSchema.pre('save', incrementVersionNumberForSchema);

// LikeSchema.pre('findOneAndUpdate', incrementVersionNumberForQuery);

// LikeSchema.pre('update', incrementVersionNumberForQuery);

mongoose.model(reviewSchemaString, ReviewSchema);

module.exports = {
    JoiReviewSchema,
    reviewSchemaString,
};