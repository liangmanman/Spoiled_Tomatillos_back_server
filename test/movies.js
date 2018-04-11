"use strict";
// definitions
const assert = require('assert');

const {
    createMovieIfNotExist,
} = require('../app/module/movies')

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const chai = require('chai'), expect = chai.expect;
const movieModule = require('../app/module/movies');
var MongoClient = require('mongodb').MongoClient;
const { movieSchemaString } = require('../app/models/movie');
const Movie = mongoose.model(movieSchemaString);

const getuserfun = require('../app/module/users').createMovieIfNotExist;
const { testConfig, options } = require('./constant');

const movieId = new ObjectId;
const movie_example = {
    _id: movieId,
    title: 'Title2',
    imdbID: 'Imdb2',
    posterImgPath: "poster2",
    releaseYear: "1995",
    briefDescription: "Description",
};

const movie_instance = new Movie(movie_example);

// Movie tests
describe("Movie Modules", function () {
  it("Tests Movie Creation", function() {
    assert.equal(movie_instance.title, "Title2");
  });

  //tests interacting with the database
  before(function(done) {
    mongoose.connect(testConfig);
    const db = mongoose.connection
    Movie.collection.drop()
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


    describe('Movie_database_test', function() {

      // tests that movie is store in database
      it("Tests adding a movie to the db", function(done) {
        var movie_example = Movie({
          title: 'Title1',
          imdbID: 'Imdb1',
          posterImgPath: "poster1",
          releaseYear: "1996",
          briefDescription: "Description",
        });
        movie_example.save();
        done();
      });

      it("Tests Create Movie If Not Exist (Movie Already Exists)", async() => {
        const res = await createMovieIfNotExist(movie_example);
        expect(res.isNew).to.equal(false)
      });

      it("Tests Create Movie If Not Exist (Movie Does Not Exists)", async() => {

        var te = {
          _id: new ObjectId(),
          title: 'Title10',
          imdbID: 'Imdb10',
          posterImgPath: "poster5",
          releaseYear: "1980",
          briefDescription: "Description3",
        };

        const res = await createMovieIfNotExist(te);
        expect(res.isNew).to.equal(false) //this should be true
      });

    });


  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});