'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

const { groupSchemaString } = require('../models/group');
const Group = mongoose.model(groupSchemaString);

async function leaveGroup({ userId, _id }) {
  const group = await Group.findGroupById({ _id });
  const groupMembers = userIdsInString(group.users);
  if (group.groupAdminId.toString() === userId.toString()) {
    return await Group.deleteGroup({
      _id,
    });
  } else if (_.includes(groupMembers, userId)) {
    const newUsers = _.difference(groupMembers, [userId]);
    return await Group.updateGroup({
      users: newUsers,
      _id,
    });
  }
  else {
    throw new Error('do not have leaveGroup permission');
  }
}

async function createGroup({ users, userId }) {
  return await Group.createGroup({ users, userId });
}

async function findGroupQuery({ userId, _id }) {
  let groupList = [];
  if(!_.isNil(_id)) {
    groupList = await Group.findGroupByIdWithUserInfo({ _id });
  } else if (!_.isNil( userId )) {
    groupList = await Group.findGroupsWithUserId({ userId });
  }
  return groupList;
}

function userIdsInString(userList) {
  return _.map(userList, function (userId) {
    return userId.toString();
  })
}

async function removeMembers({ users, userId, _id }) {
  const group = await Group.findGroupById({ _id });
  if (group.groupAdminId.toString() === userId.toString()) {
    const groupMembers = userIdsInString(group.users);
    const newUsers = _.difference(groupMembers, users);
    return await Group.updateGroup({
      users: newUsers,
      _id,
    });
  } else {
    throw new Error('do not have groupAdmin permission');
  }
}

async function addMembers({ users, userId, _id }) {
  const group = await Group.findGroupById({ _id });
  const groupMembers = userIdsInString(group.users);
  if (_.includes(groupMembers, userId)) {
    const newUsers = _.union(groupMembers, users);
    return await Group.updateGroup({
      users: newUsers,
      _id,
    });
  } else {
    throw new Error('do not have groupMember permission');
  }
}

module.exports = {
  removeMembers,
  addMembers,
  leaveGroup,
  createGroup,
  findGroupQuery,
};
