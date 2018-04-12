
const assert = require('assert');

const {
  updateFriendOrCreateIfNotExist,
  determineIsFriendOfUser,
  deleteFriend,
} = require('../app/module/friends');

const {
  like,
  unlike,
  findMoviesLikedByUserId,
  findUsersLikeMovieId,
} = require('../app/module/likes');

const {
  createMovieIfNotExist,
} = require('../app/module/movies');

const {
  updateRateOrCreateIfNotExist,
  deleteRateByUserIdAndMovieId,
  findRateQuery,
  calculateRateOfMovie,
} = require('../app/module/rates');

const {
  updateReviewOrCreateIfNotExist,
  deleteReviewByUserIdAndMovieId,
  findReviewQuery,
} = require('../app/module/reviews');

const {
  decodeToken,
  generateJwtTokenForUser,
  verifyMe,
  getUser,
  findUsersBySearch,
} = require('../app/module/users');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });

  describe('check decodeToken', function() {
    it('should decode token', function() {
      assert(decodeToken('hello'), 'hello');
    });
    it('generateJwtTokenForUser', function() {
      assert(generateJwtTokenForUser({userId: "hello"}), 'hello');
    });
    it('verifyMe', function() {
      assert(verifyMe({userId: "hi"}, 'fakeToken'), 'hello');
    });
    it('getUser', function() {
      assert(getUser({userId: "hi"}), 'hello');
    });
    it('findUsersBySearch', function() {
      assert(findUsersBySearch({searchBy:'fullName'}), 'hello');
    })

  });

  describe('testMovie', function () {
    it('should createMovieIfNotExist', function () {
      assert(createMovieIfNotExist({omdbId: 'testid'}), 'testMovie');
    });
  });

  describe('testFriend', function () {
    it('updateFriendOrCreateIfNotExist', function () {
      assert(updateFriendOrCreateIfNotExist({
        fromUserId: 'testUserId1',
        toUserId: 'testUserId2'
      }), 'testUser');
    });

    it('determineIsFriendOfUser', function () {
      assert(determineIsFriendOfUser({
        fromUserId: 'testUserId1',
        toUserId: 'testUserId2'
      }), true);
    });

    it('deleteFriend', function () {
      assert(deleteFriend({
        fromUserId: 'testUserId1',
        toUserId: 'testUserId2'
      }), 'testResult');
    });
  });

  describe('testLike', function () {
    it('like', function () {
      assert(like({
        userId: 'testUserId',
        movieId: 'testMovieId',
      }), 'testResult');
    });

    it('unlike', function () {
      assert(unlike({
        userId: 'testUserId',
        movieId: 'testMovieId',
      }), 'testResult');
    });

    it('findMoviesLikedByUserId', function () {
      assert(findMoviesLikedByUserId({
        imdbId: 'testImdbId',
      }), []);
    });

    it('findUsersLikeMovieId', function () {
      assert(findUsersLikeMovieId({
        userId: 'testUserId'
      }), [])
    });
  });

  describe('testRate', function () {
    it('updateRateOrCreateIfNotExist', function () {
      assert(updateRateOrCreateIfNotExist({
        movieId: 'testMovieId',
        userId: 'testUserId',
        rate: 5,
      }), 'testResult');
    });

    it('deleteRateByUserIdAndMovieId', function () {
      assert(deleteRateByUserIdAndMovieId({
        movieId: 'testMovieId',
        userId: 'testUserId',
      }), 'testResult');
    });

    it('findRateQuery', function () {
      assert(findRateQuery({
        movieId: 'testMovieId',
        userId: 'testUserId',
      }), 'testResult');
    });

    it('calculateRateOfMovie', function () {
      assert(calculateRateOfMovie({
        movieId: 'testMovieId',
      }), 'result');
    });
  });

  describe('testReview', function () {
    it('updateReviewOrCreateIfNotExist', function () {
      assert(updateReviewOrCreateIfNotExist({
        movieId: 'testMovieId',
        userId: 'testUserId',
        contest: 'testContent',
      }), 'testResult');
    });

    it('deleteReviewByUserIdAndMovieId', function () {
      assert(deleteReviewByUserIdAndMovieId( {
        movieId: 'testMovieId',
        userId: 'testUserId',
      }), 'testRestlt');
    });

    it('findReviewQuery', function () {
      assert(findReviewQuery({
        movieId: 'testMovieId',
        userId: 'testUserId',
      }), 'testResult');
    });
  });
});
