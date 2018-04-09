const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const chai = require('chai')
  , expect = chai.expect;

const { testConfig, options } = require('./constant');
const ratesModule = require('../app/module/rates');
const { movieSchemaString } = require('../app/models/movie');
const Movie = mongoose.model(movieSchemaString);
const { rateSchemaString } = require('../app/models/rate');
const Rate = mongoose.model(rateSchemaString);

const userId = new ObjectId;
const movieId = new ObjectId;
const movie_example = {
  _id: movieId,
  title: 'testMovieTitle',
  imdbID: 'testImdbId',
  posterImgPath: 'testImgPath',
  releaseYear: 'testReleaseYear',
  briefDescription: 'testDescription',
};

describe("Rate Modules", function () {

  //tests interacting with the database
  before(function(done) {
    mongoose.connect(testConfig, options);
    const db = mongoose.connection;
    Movie.collection.drop();
    db.dropDatabase();
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('Connected to Database');
      done();
    });
  });

  beforeEach(async () => {
    await new Movie(movie_example).save();
  });

  afterEach(() => {
    Movie.collection.drop();
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });

  it("updateRateorCreateIfNotExist", async function() {
    const rate = await ratesModule.updateRateOrCreateIfNotExist({
      movieId,
      userId,
      rate: 3,
    });
    expect(rate.rate).to.equal(3);
  });

  it("FindRateQuery with UserId and movieId", async function() {
    const temp = {
      movieId,
      userId,
    };
    const result = await ratesModule.findRateQuery(temp);
    expect(result.length).to.equal(1);
  });

  it("FindRateQuery with movieId", async function() {
    const temp = {
      movieId,
    };
    const result = await ratesModule.findRateQuery(temp);
    expect(result.length).to.equal(1);
  });

  it("FindRateQuery with userId", async function() {
    const temp = {
      userId,
    };
    const result = await ratesModule.findRateQuery(temp);
    expect(result.length).to.equal(1);
  });

  it("FindRateQuery", async function() {
    const temp = {
    };
    const result = await ratesModule.findRateQuery(temp);
    expect(result.length).to.equal(1);
  });

  it("CalculateRateByMovie", async function() {
    const temp = {
      movieId,
    };
    const result = await ratesModule.calculateRateOfMovie(temp);
    expect(result).to.equal(3);
  });

  it("DeleteRateByUser", async function() {
    const temp = {
      movieId,
      userId,
    };
    const result = await ratesModule.deleteRateByUserIdAndMovieId(temp);
    expect(result.n).to.equal(1);
  });

  it("create Rate with invalid rate value less than 0", async function () {
    const invalidRate = {
      movieId,
      userId,
      rate: -1,
    };
    await new Rate(invalidRate).save().catch( e => {
      expect(e.name).to.equal('ValidationError');
    });
  });

  it("create Rate with invalid rate value greater than 10", async function () {
    const invalidRate = {
      movieId,
      userId,
      rate: 11,
    };
    await new Rate(invalidRate).save().catch( e => {
      expect(e.name).to.equal('ValidationError');
    });
  });


});
