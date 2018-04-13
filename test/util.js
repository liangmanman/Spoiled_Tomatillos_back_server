const chai = require('chai')
  , assert = chai.assert
  , expect = chai.expect;
const _ = require('lodash');

const { checkRequiredEnv } = require('../config/util');

describe("Utils Testing", function () {

  before(function() {

  });

  it("test checkRequiredEnv MONGO_DB_URI be null", async function(done) {
    // check required env variables
    process.env.NODE_ENV = "";
    process.env.MONGO_DB_URI = undefined;
    expect(checkRequiredEnv).to.throw(Error);
    done();
  });

  it("test checkRequiredEnv NODE_ENV be ci", async function() {
    process.env.NODE_ENV = "CI";
    checkRequiredEnv();
  });

  it("test checkRequiredEnv with NODE_ENV be test", async function() {
    process.env.NODE_ENV = "test";
    checkRequiredEnv();
  });





});