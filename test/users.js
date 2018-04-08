"use strict";
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
var MongoClient = require('mongodb').MongoClient;
const { userSchemaString } = require('../app/models/user');
const User = mongoose.model(userSchemaString);
const router = require('../app/controllers/users');
const request = require('supertest');
const express = require('express');
//const testApp = require('../index').app; // THIS LINE CAUSES EVERYTHING TO BREAK

const getuserfun = require('../app/module/users').getUser;
const getusernbysearch = require('../app/module/users').findUsersBySearch;
const testConfig = 'mongodb://james_test:password@ds121189.mlab.com:21189/spoiled-tomatillos-test';
var options = {
  server: {
    socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 },
    // sets how many times to try reconnecting
    reconnectTries: Number.MAX_VALUE,
    // sets the delay between every retry (milliseconds)
    reconnectInterval: 1000
  }
};
const user_example = {
    email: 'jjy@jj.com',
    fullName: 'Joey Joey',
    password: "pass"
};

const user_instance = new User(user_example);
const token_instance = generateJwtTokenForUser("ignore");

// User
describe("User Modules", function () {

  // Tests User Creation
  it ("User_Creation", function(done) {
    const user = new User(user_example);
    assert.equal(user.email , "jjy@jj.com");
    done();
  });

  // tests generating JWT token
  it ("Generate_JWT_Token", function() {
    let result = generateJwtTokenForUser("ignore").substring(0,2);
    assert.equal(result,"ey")
  });

  // tests decoding tokens
  it ("decode_token", function(done) {
    const res = decodeToken(token_instance);
    res
    .then((result) => {
      assert.equal(result.exp.toString().substring(0,2), 15);
      done();
    })
    .catch((error) => {
      done(error);
    });
  });

  //tests interacting with the database
  before(function(done) {
    mongoose.connect(testConfig, options);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('Connected to Database');
      done();
    });
  });


    describe('User_database_test', function() {
      //stores user in database
      var test_user = User({
        email: "sgsdgsdgsd@t.com",
        fullName: "Test Two",
        password: "Two"
      });
      console.log(test_user);
      test_user.save();

      // tests that you can add to database
      it("Tests adding a User to the db", function(done) {
        var test_user2 = User({
          email: "sgsdgsdgsd@t.com",
          fullName: "Test Two",
          password: "Two"
        });
        test_user2.save();
        done();
      });

////      // tests gets User from DB
//      it('getUser', function(done) {
//        var person = {name:"James", userId: "5abe84d7c4fd37766e2b3d09"};
//        const res = getuserfun(person);
//        res
//        .then((result) => {
//          console.log("RES: " + res);
//          done();
//        })
//        .catch((error) => {
//          console.log("RES2: " + res);
//          done(error);
//        });
//      });

      // tests finding a user by Search
      it("Find User By Search", function(done) {
        const res = getusernbysearch({searchBy:'fullName'});
        res
        .then((result) => {
          console.log(res);
          done();
        })
        .catch((error) => {
          done(error);
        });
      });
    });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});



//// controller user Tests
//describe('User Controller Tests', function () {
//  var server;
//  var port = 3000;
//  beforeEach(function () {
//    console.log("Test Config:  " + testApp)
//    server = testApp.listen(port);
//    console.log('Express app started on port ' + port);
////    index_connect(testConfig);
//
//  });
//  afterEach(function () {
//    server.close();
//  })
//  it('/isLoggedIn', function testSearch(done) {
//    request('localhost:3000')
//    .get('/isLoggedIn')
//    .expect(401);
//    done();
//  });
//  });
//});