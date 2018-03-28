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

const likeSchemaString = 'like';


/**
 * Like Schema
 */

const LikeSchema = new Schema({
  likedMovies: [ { type: mongoose.Schema.ObjectId, ref: movieSchemaString } ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: userSchemaString,
    index: true,
    unique: true,
  },
}, {
  timestamps: true,
});

const JoiLikeSchema = Joi.object().keys({
  imdbID: Joi.string(),
});

/**
 * Validations
 */

LikeSchema.path('likedMovies').validate(function (likedMovies) {
  // check unique movie list
  return _.uniqBy(likedMovies, (movieId)=> {
    return movieId.toString();
  }).length === likedMovies.length;
}, 'briefDescription cannot be blank');



/**
 * Statics
 */

LikeSchema.statics = {
  findLikeOrCreateIfNotExist: async function({ userId }) {
    let like = await this.findOne({
      userId: userId,
    });

    if (_.isNil(like)) {
      // create new like
      like = new this();
      like.userId = userId;
      await like.save();
    }

    return like;
  },
  /**
   * return movies liked by userId
   * @param userId
   * @returns {Promise<*[]|*|likedMovies|{$in}>}
   */
  findMoviesLikedByUserId: async function({ userId }) {
    await this.findLikeOrCreateIfNotExist({ userId });
    const like = await this.findOne({
      userId: userId,
    }).populate('likedMovies');
    return like.likedMovies;
  },
  /**
   * return users who like movie with movieId
   * @param movieId
   * @returns {Promise<*>}
   */
  findUsersLikeMovieId: async function({ movieId }) {
    let movieList = [movieId];
    const likeList = await this.find({
      likedMovies: {
        $in: movieList,
      },
    });
    return likeList;
  },
};

/**
 * pre
 */

LikeSchema.pre('save', incrementVersionNumberForSchema);

mongoose.model(likeSchemaString, LikeSchema);

module.exports = {
  JoiLikeSchema,
  likeSchemaString,
};
