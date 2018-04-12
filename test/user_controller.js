//// definitions
//
//const assert = require('assert');
//const {
//  decodeToken,
//  generateJwtTokenForUser,
//  verifyMe,
//  getUser,
//  findUsersBySearch,
//} = require('../app/module/users')
//
//const mongoose = require('mongoose');
//const testConfig = 'mongodb://james_test:password@ds121189.mlab.com:21189/spoiled-tomatillos-test'
//const { options } = require('./constant');
//const { userSchemaString } = require('../app/models/user');
//const User = mongoose.model(userSchemaString);
//const router = require('../app/controllers/users');
//const request = require('supertest');
//const express = require('express');
//const testApp = require('../index').app; // THIS LINE CAUSES EVERYTHING TO BREAK
//
//const getuserfun = require('../app/module/users').getUser;
//const getusernbysearch = require('../app/module/users').findUsersBySearch;
//const user_example = {
//    email: 'jjy@jj.com',
//    fullName: 'Joey Joey',
//    password: "pass"
//};
//
//const user_instance = new User(user_example);
//const token_instance = generateJwtTokenForUser("ignore");
//
//
//// controller user Tests
//describe('User Controller Tests', function () {
//  var server;
//  var port = 3000;
//
//  beforeEach(function () {
//    server = testApp.listen(port);
//    mongoose.connect(testConfig, options);
//    const db = mongoose.connection;
//    User.collection.drop();
//    db.dropDatabase();
//    db.on('error', console.error.bind(console, 'connection error'));
//        db.once('open', function() {
//          console.log('Connected to Database');
//          done();
//        });
//    index_connect(testConfig);
//  });
//
//  afterEach(function () {
//    server.close();
//  })
//
//  it('/isLoggedIn', function testSearch(done) {
//    request('localhost:3000')
//    .get('/isLoggedIn')
//    .expect(401);
//    done();
//  });
//});
