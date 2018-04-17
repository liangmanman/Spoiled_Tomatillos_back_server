'use strict';
const _ = require('lodash');

const mongoose = require('mongoose');
const { friendSchemaString } = require('../models/friend');


const Friend = mongoose.model(friendSchemaString);

async function updateFriendOrCreateIfNotExist({ fromUserId, toUserId }) {
  return await Friend.updateFriendOrCreateIfNotExist({
    fromUserId,
    toUserId,
  });
}

async function determineIsFriendOfUser({ fromUserId, toUserId }) {
  return await Friend.getFriendStatus({ fromUserId, toUserId });
}

async function deleteFriend({ fromUserId, toUserId }) {
  return await Friend.deleteFriend({ fromUserId, toUserId });
}

async function getFriendList({ userId }) {
  const friendList = await Friend.getFriendList({ userId });
  return friendList;
}

module.exports = {
  updateFriendOrCreateIfNotExist,
  determineIsFriendOfUser,
  deleteFriend,
  getFriendList,
};
