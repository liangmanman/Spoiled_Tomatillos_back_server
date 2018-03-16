'use strict';

const express = require('express');
const usersModule = require('../module/users');

const router = express.Router();

const authorization = require('../middlewares/authorization');
router.use(authorization.requiresLogin);

router.get('/me', async function (req, res) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    try {
        const decodedToken = await usersModule.getMe(token);
        return res.status(200).send(decodedToken);
    } catch (error) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
});

router.get('/privateProfile', async function (req, res) {
   return res.send("private profile page");
});


module.exports = router;
