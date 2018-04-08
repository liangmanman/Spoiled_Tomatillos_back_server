

const assert = require('assert');
const {
      updateRateOrCreateIfNotExist,
      deleteRateByUserIdAndMovieId,
      findRateQuery,
      calculateRateOfMovie,
} = require('../app/module/rates')

const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

const { rateSchemaString } = require('../app/models/rate');
const Rate = mongoose.model(rateSchemaString);
const testConfig = 'mongodb://james_test:password@ds121189.mlab.com:21189/spoiled-tomatillos-test';
const method_updateRateOrCreateIfNotExist = require('../app/module/rates').updateRateOrCreateIfNotExist;
const method_deleteRateByUserIdAndMovieId = require('../app/module/rates').deleteRateByUserIdAndMovieId;
const method_findRateQuery = require('../app/module/rates').findRateQuery;
const method_calculateRateOfMovie = require('../app/module/rates').calculateRateOfMovie;

describe("Rate Modules", function () {

  it("updateRateorCreateIfNotExist", function(done) {
    const temp = {
      movieId: "5abe84d7c4fd37766e2b3d09",
      userId: "5abe84d7c4fd37766e2b3d0b",
      rate: 3,
    }
    var f = method_updateRateOrCreateIfNotExist(temp);
    done();
  });

  it("DeleteRateByUser", function(done) {
    const temp = {
      movieId: "5abe84d7c4fd37766e2b3d09",
      userId: "5abe84d7c4fd37766e2b3d0b",
    }
    var f = method_deleteRateByUserIdAndMovieId(temp);
    done();
  });

  it("FindRateQuery", function(done) {
      const temp = {
        movieId: "5abe84d7c4fd37766e2b3d09",
        userId: "5abe84d7c4fd37766e2b3d0b",
      }
      var f = method_findRateQuery(temp);
      done();
  });



  it("CalculateRateByMovie", function(done) {
    const temp = {
      movieId: "5abe84d7c4fd37766e2b3d09",
    }
    var f = method_deleteRateByUserIdAndMovieId(temp);
    done();
  });




//  //tests interacting with the database
//  before(function(done) {
//    mongoose.connect(testConfig);
//    const db = mongoose.connection
//    db.on('error', console.error.bind(console, 'connection error'));
//    db.once('open', function() {
//      console.log('Connected to Database');
//      done();
//    });
//  });
//
//  after(function(done) {
//    mongoose.connection.db.dropDatabase(function(){
//      mongoose.connection.close(done);
//    });
//  });


});
