'use strict';
const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const router = express.Router();

const { JoiReviewSchema } = require('../models/review');
const { updateReviewOrCreateIfNotExist, findAllReviews } = require('../module/reviews');
const { sendJoiValidationError } = require('../utils/joi');
const { validateUserHasPermission, sendPermissionError } = require('../utils/permission');

const authorization = require('../middlewares/authorization');

router.use(authorization.requiresLogin);

const fieldList = ['userId', 'movieId', 'content'];


router.post('/review', async function (req, res) {
    const newReviewBody = _.pick(req.body, fieldList);

    const joiResult  = Joi.validate(newReviewBody, JoiReviewSchema, {
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
        userId: newReviewBody.userId,
    });

    if (!hasPermission) {
        return sendPermissionError({
            userId: newReviewBody.userId,
            res,
        })
    }

    try {
        await updateReviewOrCreateIfNotExist(newReviewBody);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }

});

router.get('/', async function(req, res) {
    const reviewList = await findAllReviews();

    res.json(reviewList);
});


module.exports = router;
