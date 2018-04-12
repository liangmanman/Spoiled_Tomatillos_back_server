
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const chai = require('chai')
  , expect = chai.expect;

const { testConfig, options } = require('./constant');
const reviewsModule = require('../app/module/reviews');
const { movieSchemaString } = require('../app/models/movie');
const Movie = mongoose.model(movieSchemaString);

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

describe("Review Modules", function () {

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

  // tests updateReviewOrCreateIfNotExist
  it("updateReviewOrCreateIfNotExist", async function() {
    const temp = {
      userId,
      movieId,
      content: "This is a movie",
    };
    const result = await reviewsModule.updateReviewOrCreateIfNotExist(temp);
    expect(result.content).to.equal("This is a movie");
  });

  it("FindReviewQuery with UserId and movieId", async function() {
    const temp = {
      movieId,
      userId,
    };
    const result = await reviewsModule.findReviewQuery(temp);
    expect(result.length).to.equal(1);
    expect(result[0].content).to.equal("This is a movie");
  });

  it("FindReviewQuery with movieId", async function() {
    const temp = {
      movieId,
    };
    const result = await reviewsModule.findReviewQuery(temp);
    expect(result.length).to.equal(1);
    expect(result[0].content).to.equal("This is a movie");
  });

  it("FindReviewQuery with userId", async function() {
    const temp = {
      userId,
    };
    const result = await reviewsModule.findReviewQuery(temp);
    expect(result.length).to.equal(1);
    expect(result[0].content).to.equal("This is a movie");
  });

  it("FindReviewQuery", async function() {
    const temp = {
    };
    const result = await reviewsModule.findReviewQuery(temp);
    expect(result.length).to.equal(1);
    expect(result[0].content).to.equal("This is a movie");
  });

  it("deleteReviewByUserIdAndMovieId", async function() {
    const temp = {
      userId,
      movieId,
    };
    const result = await reviewsModule.deleteReviewByUserIdAndMovieId(temp);
    expect(result.n).to.equal(1);
  });

});
