'use strict';
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const router = express.Router();

const { createMovieIfNotExist } = require('../module/movies');
const { sendJoiValidationError } = require('../utils/joi');

const { JoiMovieSchema, movieSchemaString } = require('../models/movie');
const Movie = mongoose.model(movieSchemaString);

const authorization = require('../middlewares/authorization');

// router.use(authorization.requiresLogin);

router.get('/', async function (req, res) {
    const movieList = await Movie.find({});
    res.json(movieList);
});


router.get('/:id',
    async function(req, res) {
        try {
            const movie = await Movie.findOne({
                _id: req.params.id,
            });
            if (_.isNil(movie)) {
                res.sendStatus(404);
            } else {
                res.json(movie);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

router.post('/',
    authorization.requiresLogin,
    async function(req, res) {

        const fieldList = ['title', 'imdbID', 'posterImgPath', 'releaseYear', 'briefDescription'];
        const newMovieFromBody = _.pick(req.body, fieldList);

        const joiResult  = Joi.validate(newMovieFromBody, JoiMovieSchema, {
            presence: 'required',
            abortEarly: false,
        });
        const joiError = joiResult.error;

        if (!_.isNil(joiError)) {
            return sendJoiValidationError(joiError, res);
        }

        try {
            // if not exist, don't create a new one.
            const newMovie = await createMovieIfNotExist(newMovieFromBody);
            res.json(newMovie);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });


module.exports = router;
