'use strict';
const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const router = express.Router();

const { JoiRateSchema } = require('../models/rate');
const {
    updateRateOrCreateIfNotExist,
    findRateQuery,
    deleteRateByUserIdAndMovieId,
} = require('../module/rates');
const { sendJoiValidationError } = require('../utils/joi');
const { validateUserHasPermission, sendPermissionError } = require('../utils/permission');

const authorization = require('../middlewares/authorization');

router.use(authorization.requiresLogin);

const JoiRateQuerySchema = Joi.object().keys({
    userId: Joi.string(),
    movieId: Joi.string(),
});



router.post('/rate', async function (req, res) {
    const fieldList = ['userId', 'movieId', 'rate'];

    const newRateBody = _.pick(req.body, fieldList);

    const joiResult  = Joi.validate(newRateBody, JoiRateSchema, {
        presence: 'required',
        abortEarly: false,
    });
    const joiError = joiResult.error;

    if (!_.isNil(joiError)) {
        return sendJoiValidationError(joiError, res);
    }

    const userInfo = req.decodedToken;

    const hasPermission = validateUserHasPermission({
        userInfo,
        userId: newRateBody.userId,
    });

    if (!hasPermission) {
        return sendPermissionError({
            userId: newRateBody.userId,
            res,
        })
    }

    try {
        await updateRateOrCreateIfNotExist(newRateBody);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }

});


router.delete('/rate', async function (req, res) {
    const fieldList = ['userId', 'movieId'];

    const newRateQuery = _.pick(req.query, fieldList);

    const joiResult  = Joi.validate(newRateQuery, JoiRateQuerySchema, {
        presence: 'required',
        abortEarly: false,
    });
    const joiError = joiResult.error;

    if (!_.isNil(joiError)) {
        return sendJoiValidationError(joiError, res);
    }
    const userInfo = req.decodedToken;

    const hasPermission = validateUserHasPermission({
        userInfo,
        userId: newRateQuery.userId,
    });

    if (!hasPermission) {
        return sendPermissionError({
            userId: newRateQuery.userId,
            res,
        })
    }

    try {
        await deleteRateByUserIdAndMovieId(newRateQuery);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }

});

router.get('/', async function(req, res) {
    const fieldList = ['userId', 'movieId'];

    const newRateQuery = _.pick(req.query, fieldList);

    const joiResult  = Joi.validate(newRateQuery, JoiRateQuerySchema, {
        abortEarly: false,
    });
    const joiError = joiResult.error;

    if (!_.isNil(joiError)) {
        return sendJoiValidationError(joiError, res);
    }

    try {
        const rateList = await findRateQuery(newRateQuery);
        res.json(rateList);
    } catch (error) {
        res.status(500).send(error.message);
    }

});

module.exports = router;
