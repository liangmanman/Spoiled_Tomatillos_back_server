
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const chai = require('chai')
  , expect = chai.expect;

const { testConfig, options } = require('./constant');
const likesModule = require('../app/module/likes');
const { userSchemaString } = require('../app/models/user');
const User = mongoose.model(userSchemaString);
const { movieSchemaString } = require('../app/models/movie');
const Movie = mongoose.model(movieSchemaString);

const userId = new ObjectId;
const fakeUserId = new ObjectId;
const movieId = new ObjectId;
const user_example = {
  _id: userId,
  email: 'testUser@test.com',
  fullName: 'Test Test',
  password: "test",
};
const movie_example = {
  _id: movieId,
  title: 'testMovieTitle',
  imdbID: 'testImdbId',
  posterImgPath: 'testImgPath',
  releaseYear: 'testReleaseYear',
  briefDescription: 'testDescription',
};

// User
describe("Like Modules", function () {
  //tests interacting with the database
  before(function(done) {
    mongoose.connect(testConfig, options);
    const db = mongoose.connection;
    User.collection.drop();
    Movie.collection.drop();
    db.dropDatabase();
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('Connected to Database');
      done();
    });
  });

  beforeEach(async () => {
    await new User(user_example).save();
    await new Movie(movie_example).save();
  });

  afterEach(() => {
    User.collection.drop();
    Movie.collection.drop();
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });

  describe('Like_Creation', () => {
    it('should create a like object', async () => {
      const like = await likesModule.like({
        userId,
        imdbID: 'testImdbId'
      });
      const likedMovies = like.likedMovies;
      expect(likedMovies).to.include(movieId);
    });

    it('should return error with not exist userId when like', async () => {
      likesModule.like({
        userId: fakeUserId,
        imdbID: 'testImdbId',
      }).catch( e => {
        expect(e).to.be.a('error');
      });
    });

    it('should return error with not exist imdbId when like', async () => {
      likesModule.like({
        userId,
        imdbID: 'testImdbId2',
      }).catch( e => {
        expect(e).to.be.a('error');
      });
    });

    it('should find movies liked by user', async () => {
      const movieList = await likesModule.findMoviesLikedByUserId({
        userId,
      });
      expect(movieList.length).to.equal(1);
      expect(movieList[0]._id.toString()).to.equal(movieId.toString());
    });

    it('should find users like movie', async () => {
      const userList = await likesModule.findUsersLikeMovieId({
        imdbID: 'testImdbId',
      });
      expect(userList.length).to.equal(1);
      expect(userList[0]._id.toString()).to.equal(userId.toString());
    });

    it('should return error with not exist userId when unlike', async () => {
      likesModule.unlike({
        userId: fakeUserId,
        imdbID: 'testImdbId',
      }).catch( e => {
        expect(e).to.be.a('error');
      });
    });

    it('should return error with not exist imdbId when unlike', async () => {
      likesModule.unlike({
        userId,
        imdbID: 'testImdbId2',
      }).catch( e => {
        expect(e).to.be.a('error');
      });
    });

    it('should unlike a movie', async () => {
      const like = await likesModule.unlike({
        userId,
        imdbID: 'testImdbId'
      });
      const likedMovies = like.likedMovies;
      expect(likedMovies).to.not.include(movieId);
    });
  });
});
