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
};

/**
 * pre
 */

LikeSchema.pre('save', incrementVersionNumberForSchema);

// LikeSchema.pre('findOneAndUpdate', incrementVersionNumberForQuery);

// LikeSchema.pre('update', incrementVersionNumberForQuery);

mongoose.model(likeSchemaString, LikeSchema);

module.exports = {
  JoiLikeSchema,
  likeSchemaString,
};
