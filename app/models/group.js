'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash');
const Schema = mongoose.Schema;

const { incrementVersionNumberForSchema } = require('./utils');
const groupSchemaString = 'group';
const { userSchemaString } = require('./user');

/**
 * Group Schema
 */
const GroupSchema = new Schema({
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: userSchemaString,
      index: true,
      required: true,
    }
  ],
  groupAdminId: {
    type: mongoose.Schema.ObjectId,
    ref: userSchemaString,
    index: true,
    required: true,
  }
}, {
  timestamps: true,
});

/**
 * Virtuals
 */
GroupSchema.virtual('groupAdmin', {
  ref: userSchemaString,
  localField: 'groupAdminId',
  foreignField: '_id',
  justOne: true,
});

/**
 * Validations
 */
const JoiGroupSchema = Joi.object().keys({
  userId: Joi.string(),
  users: Joi.array().items(Joi.string()),
  _id: Joi.string(),
});

// create unique compound index
GroupSchema.index({ users: 1, }, { unique: true });

/**
 * pre
 */
GroupSchema.pre('save', incrementVersionNumberForSchema);


/**
 * Statics
 */
GroupSchema.statics = {

  populateUsersInfo: async function(queryResponse) {
    const group =  await queryResponse
      .populate({
        path: 'groupAdmin',
        select: '-hashed_password -salt',
      })
      .populate({
      path: 'users',
      select: '-hashed_password -salt',
      });
    return group;
  },
  deleteGroup: async function({ _id }) {
    return await this.remove({
      _id
    });
  },
  createGroup: async function({ users, userId }) {
    let query = this.create({
      groupAdminId: userId,
      users,
    });
    return query;
  },
  updateGroup: async function({ _id, users }) {
    let query = this.findOneAndUpdate({
      _id,
    }, {
      _id,
      users,
    }, {
      new: true,
      upsert: true,
    });
    return await this.populateUsersInfo(query);
  },
  findGroupsWithUserId: async function({ userId }) {
    let userList = [userId];
    const groupList = this.find({
      users: {
        $in: userList,
      },
    });
    return await this.populateUsersInfo(groupList);
  },
  findGroupByIdWithUserInfo: async function({ _id }) {
    let group = this.findOne({ _id });
    return await this.populateUsersInfo(group);
  },
  findGroupById: async function({ _id }) {
    let group = this.findOne({ _id });
    return group;
  }
};

mongoose.model(groupSchemaString, GroupSchema);

module.exports = {
  JoiGroupSchema,
  groupSchemaString,
};
