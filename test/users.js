"use strict";
// definitions
const assert = require('assert');

const {
  decodeToken,
  generateJwtTokenForUser,
  verifyMe,
  getUser,
  findUsersBySearch,
} = require('../app/module/users');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const chai = require('chai'), expect = chai.expect;
const userModule = require('../app/module/users');

const { testConfig, options } = require('./constant');

const { userSchemaString } = require('../app/models/user');
const User = mongoose.model(userSchemaString);

const getuserfun = require('../app/module/users').getUser;

const userId_example = new ObjectId;

const user_example = {
  _id: userId_example,
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
    User.collection.drop();
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('Connected to Database');
      done();
    });
  });

  beforeEach(async () => {
    await new User(user_example).save();
  });

  afterEach(() => {
    User.collection.drop();
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });


  describe('User_database_test', function() {
    //stores user in database
    var test_user = User({
      email: "sgsdgsdgsd@t.com",
      fullName: "Test Two",
      password: "Two"
    });
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

    // tests gets User from DB
    it('getUser', async() => {
      var person = {name:"James", userId: userId_example};
      const res = await getuserfun(person)
      expect(res.fullName).to.equal("Joey Joey")

    });

    // tests false instance for VerifyMe
    it("VerifyMe_false", async() => {
      var person = user_example
      const res = await verifyMe(person, "sdvim")
      expect(res.auth).to.equal(false)
    });

    // tests true instance for VerifyMe
    it("VerifyMe_true", async() => {
      const user_example_token = await userModule.generateJwtTokenForUser({
        userId:userId_example
      });
      const res = await verifyMe(user_example, user_example_token);
      expect(res.auth).to.equal(true)
    });

    it("VerifyMe_error with different user", async() => {
      const user_example_token = await userModule.generateJwtTokenForUser({
        userId: new ObjectId,
      });
      const res = await verifyMe(user_example, user_example_token);
      expect(res.auth).to.equal(false);
    });

    // tests error instance for VerifyMe
    it("VerifyMe_error", async() => {
      const res = await verifyMe("hello", "goodbye" )
      expect(res.auth).to.equal(false)
    });

    it("newUser with no password error", async() => {
      try {
        let user = await new User({
          email: 'jjy@jj.com',
          fullName: 'Joey Joey',
          password: ' ',
        }).save();
      } catch (e) {
        expect(e.message).to.equal('Invalid password');
      }
    });

    it("test authenticate", async() => {
      const user = await User.findOne({
        email: 'jjy@jj.com',
        fullName: 'Joey Joey',
      });
      const value = user.authenticate("pass");
      expect(value).to.be.equal(true);
    });

    it("test encryptPassword with empty string", async() => {
      const user = await User.findOne({
        email: 'jjy@jj.com',
        fullName: 'Joey Joey',
      });
      const value = user.encryptPassword("");
      expect(value).to.be.equal("");
    });
  });
});