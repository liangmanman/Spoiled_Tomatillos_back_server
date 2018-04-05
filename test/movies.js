//
//const assert = require('assert');
//const {
//    createMovieIfNotExist,
//} = require('../app/module/movies')
//
//const mongoose = require('mongoose');
//var MongoClient = require('mongodb').MongoClient;
//const { movieSchemaString } = require('../app/models/movie');
//const Movie = mongoose.model(movieSchemaString);
//
//const getuserfun = require('../app/module/users').createMovieIfNotExist;
//const testConfig = 'mongodb://james_test:password@ds121189.mlab.com:21189/spoiled-tomatillos-test';
//
//const movie_example = {
//    title: 'Title2',
//    imdbID: 'Imdb2',
//    posterImgPath: "poster2",
//    releaseYear: "1995",
//    briefDescription: "Description",
//};
//
//const movie_instance = new Movie(movie_example);
//
//// Movie tests
//describe("Movie Modules", function () {
//  it("Tests Movie Creation", function() {
//    assert.equal(movie_instance.title, "Title2");
//  });
//
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
//    describe('Movie_database_test', function() {
//      //stores user in database
//      var movie_example = Movie({
//        title: 'Title1',
//        imdbID: 'Imdb1',
//        posterImgPath: "poster1",
//        releaseYear: "1996",
//        briefDescription: "Description",
//      });
//      movie_example.save();
//
//      // tests that movie was successfuly saved to database
//      it("Tests movie was saved to database", function() {
//        assert.equal(movie_example.title, "Title1");
//      })
//
//      // * tests finding a user by Search
//      it("Tests Create Movie If Not Exist", function(done) {
//        const res = createMovieIfNotExist(movie_example);
//        res
//        .then((result) => {
//          done();
//        })
//        .catch((error) => {
//          console.log(error);
//          done(error);
//        });
//      });
//  });
//
//  after(function(done){
//    mongoose.connection.db.dropDatabase(function(){
//      mongoose.connection.close(done);
//    });
//  });
//});