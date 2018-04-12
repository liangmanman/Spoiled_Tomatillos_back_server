//
//"use strict";
//// definitions
//const assert = require('assert');
//
////const {
////  updateFriendOrCreateIfNotExist,
////  determineIsFriendOfUser,
////  deleteFriend,
////} = request('../app/module/friends')
//
//const { testConfig, options } = require('./constant');
//const mongoose = require('mongoose');
//const ObjectId = mongoose.Types.ObjectId;
//const chai = require('chai'), expect = chai.expect;
//const friendModule = require('../app/module/friend');
//var MongoClient = require('mongodb').MongoClient;
//
//const { friendSchemaString } = require('../app/models/friend');
//const Friend = mongoose.model(friendSchemaString);
//
//const { userSchemaString } = require('./user');
//const User = mongoose.model(userSchemaString);
//
//
//const updateFriendOrCreateIfNotExist = require('../app/module/friends').updateFriendOrCreateIfNotExist;
//const determineIsFriendOfUser = require('../app/module/friends').determineIsFriendOfUser;
//const deleteFriend = require('../app/module/friends').deleteFriend;
//
//
//example1_user1 = {
//    _id: new ObjectId,
//    email: 'jjy@jj.com',
//    fullName: 'Joey Joey',
//    password: "pass"
//}
//example1_user2 = {
//    _id: new ObjectId,
//    email: 'czs@czs.com',
//    fullName: 'Jim Jim',
//    password: "ssap"
//}
//
//const ex1_instance1 = new User(example1_user1);
//const ex1_instance2 = new User(example1_user2);
//
//example1_friend = {
//    fromUserId: ex1_instance1._id
//    toUserId: ex1_instance2._id
//}
//
//// Friend
//describe("Friend Modules", function () {
//
//  // Tests Friend Creation
//  it ("Friend_Creation", function(done) {
//    const friend = new Friend(example1_friend);
//    assert.equal(friend , "jjy@jj.com");
//    done();
//  });
//}
