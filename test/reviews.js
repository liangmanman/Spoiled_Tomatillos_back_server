
const assert = require('assert');
const {
    updateReviewOrCreateIfNotExist,
    deleteReviewByUserIdAndMovieId,
    findReviewQuery,
} = require('../app/module/reviews')

const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const testConfig = 'mongodb://james_test:password@ds121189.mlab.com:21189/spoiled-tomatillos-test';

const { reviewSchemaString } = require('../app/models/review');
const Review = mongoose.model(reviewSchemaString);

const method_updateReviewOrCreateIfNotExist = require('../app/module/reviews').updateReviewOrCreateIfNotExist;
const method_deleteReviewByUserIdAndMovieId = require('../app/module/reviews').deleteReviewByUserIdAndMovieId;
const method_findReviewQuery = require('../app/module/reviews').findReviewQuery;

//const user_example = {
//    email: 'u3@jj.com',
//    fullName: 'Joe Stevens',
//    password: "pass"
//};
//
//const movie_example = {
//    title: 'Title10',
//    imdbID: 'Imdb33',
//    posterImgPath: "poster4",
//    releaseYear: "2000",
//    briefDescription: "Description",
//};
//
//const user_instance = new User(user_example);
//const movie_instance = new Movie(movie_example);
//user_instance.save()
//movie_instance.save()



describe("Review Modules", function () {

  // tests updateReviewOrCreateIfNotExist
  it("updateReviewOrCreateIfNotExist", function(done) {
    const temp = {
      movieId: "5abe84d7c4fd37766e2b3d09",
      userId: "5abe84d7c4fd37766e2b3d0b",
      content: "This is a movie",
    }
    var f = method_updateReviewOrCreateIfNotExist(temp);
    done();
  })

  it("deleteReviewByUserIdAndMovieId", function(done) {
    const temp = {
      userId: "5abe84d7c4fd37766e2b3d0b",
      movieId: "5abe84d7c4fd37766e2b3d0b",
    }
    var f = method_deleteReviewByUserIdAndMovieId();
    done();
  })

  it("findReviewQuery", function(done) {
    const temp = {
      userId: "5abe84d7c4fd37766e2b3d0b",
      movieId: "5abe84d7c4fd37766e2b3d0b",
    }
    var f = method_findReviewQuery(temp);
    done();
  })






// //tests interacting with the database
//  before(function(done) {
//    mongoose.connect(testConfig);
//    const db = mongoose.connection;
//    db.on('error', console.error.bind(console, 'connection error'));
//    db.once('open', function() {
//      console.log('Connected to Database');
//      done();
//    });
//
//    describe("Review Database Tests", function() {
//      const movie_id = '5abe84d7c4fd37766e2b3d09';
//      const user_id = '5abe84d7c4fd37766e2b3d0b';
//      var review_test = Review({
//        movieId: movie_id,
//        userId: user_id,
//        content: "This is a good film",
//      });
//
//      it("Add User By Search", function(done) {
//        const temp = {
//          movieId: "5abe84d7c4fd37766e2b3d09",
//          userId: "5abe84d7c4fd37766e2b3d0b",
//          content: "This is a movie",
//        }
//        const res = method_updateReviewOrCreateIfNotExist(temp);
//        res
//        .then((result) => {
//          console.log(res);
//          setTimeout(done, 15000);
//        })
//        .catch((error) => {
//          console.log(res);
//          setTimeout(done, 15000);
//        });
//      });
//
//      it("Add User By Search", function(done) {
//        const res = review_test.save();
//        res
//        .then((result) => {
//          console.log(res);
//          setTimeout(done, 15000);
//        })
//        .catch((error) => {
//          console.log(res);
//          setTimeout(done, 15000);
//        });
//      });
//
//
//    });
//  });

});