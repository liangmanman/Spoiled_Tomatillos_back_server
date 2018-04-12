/*
// definitions

const assert = require('assert');
const {
  decodeToken,
  generateJwtTokenForUser,
  verifyMe,
  getUser,
  findUsersBySearch,
} = require('../app/module/users')

const mongoose = require('mongoose');
var util = require('util');
const testConfig = 'mongodb://james_test:password@ds121189.mlab.com:21189/spoiled-tomatillos-test'
const { options } = require('./constant');
const { userSchemaString } = require('../app/models/user');
const User = mongoose.model(userSchemaString);
const router = require('../app/controllers/users');
const request = require('supertest');
const express = require('express');
const testApp = require('../index');

const getuserfun = require('../app/module/users').getUser;
const getusernbysearch = require('../app/module/users').findUsersBySearch;
const user_example = {
    email: 'jjy@jj.com',
    fullName: 'Joey Joey',
    password: "pass"
};

const user_instance = new User(user_example);
const token_instance = generateJwtTokenForUser("ignore");


// controller user Tests
describe('User Controller Tests', function () {
  var server;
  var port = 3000;

  // setup
  beforeEach(async () => {
    server = testApp.listen(port);
    mongoose.connect(testConfig, options);
    const db = mongoose.connection;
    User.collection.drop();
    db.dropDatabase();
    db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
          console.log('Connected to Database');
        });
  });

  //take down
  afterEach(() => {
    server.close();
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close();
    });
  });

  /* Tests Below */

  it('/isLoggedIn', function (done) {
    request('localhost:3000').get('/isLoggedIn').expect(401);
    //request(require('../app/controllers/users')
    var response = request('localhost:3000').get('isLoggedIn')
    console.log(util.inspect(response, false, null));
//    console.log("RESPONSE: " + JSON.stringify(response))
    done();
  });
});
*/