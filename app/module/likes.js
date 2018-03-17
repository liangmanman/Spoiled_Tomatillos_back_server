'use strict';
const _ = require('lodash');

const mongoose = require('mongoose');
const { movieSchemaString } = require('../models/movie');
const { likeSchemaString } = require('../models/like');
const { userSchemaString } = require('../models/user');

const Movie = mongoose.model(movieSchemaString);
const Like = mongoose.model(likeSchemaString);
const User = mongoose.model(userSchemaString);

async function findUserWithId({userId}) {
  const user = await User.findOne({
    _id: userId,
  });

  if (_.isNil(user)) {
    throw new Error(`Cannot find user with _id: ${userId}.`);
  }
  return user;
}

function movieIdentityPredicate(movieId) {
  return (m) => {
    return m.toString() === movieId.toString();
  }
}

function findMovieInLikedList(movieList, movieId) {
  return _.find(movieList, movieIdentityPredicate(movieId));
}

async function like({ userId, imdbID }) {
  const user = await User.findOne({
    _id: userId,
  });

  if (_.isNil(user)) {
    throw new Error(`Cannot find user with _id: ${userId}.`);
  }

  const movie = await Movie.findOne({
    imdbID,
  });

  if (_.isNil(movie)) {
    throw new Error(`Cannot find movie with imdbID: ${imdbID}.`);
  }

  const like = await Like.findLikeOrCreateIfNotExist({ userId });

  if (_.isNil(findMovieInLikedList(like.likedMovies, movie._id))) {
    like.likedMovies.push(movie._id);
    await like.save();
  }

  return like;
}

async function unlike({ userId, imdbID }) {
  const user = await User.findOne({
    _id: userId,
  });

  if (_.isNil(user)) {
    throw new Error(`Cannot find user with _id: ${userId}.`);
  }

  const movie = await Movie.findOne({
    imdbID,
  });

  if (_.isNil(movie)) {
    throw new Error(`Cannot find movie with imdbID: ${imdbID}.`);
  }

  const like = await Like.findLikeOrCreateIfNotExist({ userId });

  if (!_.isNil(findMovieInLikedList(like.likedMovies, movie._id))) {
    like.likedMovies.remove(movie._id);
    await like.save();
  }

  return like;
}

async function findUserLikedMovies({ userId }) {
  const user = await findUserWithId({userId});

  const movieList = await Like.findUserLikedMovies({ userId: user._id });

  return movieList;
}

async function findMovieLikedByUsers({ movieId }) {
  return await Like.findMovieLikedByUsers({ movieId });

}

// Like.findMovieLikedByUsers({
//   movieId: '5aabfeb6a6a48e001347b11f',
// });

// User.getUserWithoutPassword({
//   userId: '5aab385601662b0013bd3ca2',
// });

module.exports = {
  like,
  unlike,
  findUserLikedMovies,
  findMovieLikedByUsers,
};
