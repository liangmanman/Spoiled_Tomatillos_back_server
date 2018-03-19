'use strict';
const _ = require('lodash');

const mongoose = require('mongoose');
const { movieSchemaString } = require('../models/movie');
const Movie = mongoose.model(movieSchemaString);

async function createMovieIfNotExist(m) {
    let foundMovie = await Movie.findOne({
        imdbID: m.imdbID,
    });

    if (_.isNil(foundMovie)) {
        // create the movie if not Found
        const newMovie = new Movie(m);
        return await newMovie.save();
    } else {
        return foundMovie;
    }

}

module.exports = {
    createMovieIfNotExist,
};
