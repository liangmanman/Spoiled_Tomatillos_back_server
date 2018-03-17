'use strict';

const express = require('express');
const usersModule = require('../module/users');

const router = express.Router();

const authorization = require('../middlewares/authorization');
router.use(authorization.requiresLogin);

router.get('/me', async function (req, res) {
    const { userId } = req.decodedToken;

    try {
        const user = await usersModule.getUser({ userId });
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
});

router.get('/:userId', async function (req, res) {
  const { userId } = req.params;

  try {
    const user = await usersModule.getUser({ userId });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  }

});

router.get('/privateProfile', async function (req, res) {
   return res.send("private profile page");
});


module.exports = router;
