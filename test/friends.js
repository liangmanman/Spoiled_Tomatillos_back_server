const assert = require('assert');
const chai  = require('chai'), expect = chai.expect;

const {
    updateFriendOrCreateIfNotExist,
    determineIsFriendOfUser,
    deleteFriend,
} = require('../app/module/friends');


// Mongoose Database imports for Friend Table
const mongoose = require('mongoose');
const { testConfig, options } = require('./constant');
const ObjectId = mongoose.Types.ObjectId;

const { friendSchemaString } = require('../app/models/friend');
const { userSchemaString } = require('../app/models/user');

const Friends = mongoose.model(friendSchemaString);
const User  = mongoose.model(userSchemaString);

const userId1 = new ObjectId;
const userId2 = new ObjectId;

const user_example_1 = {
    _id: userId1,
    email: 'testUser1@test.com',
    fullName: 'Test Test',
    password: "test",
};

const user_example_2 = {
    _id: userId2,
    email: 'testUser2@test.com',
    fullName: 'Test Test',
    password: "test",
};


describe('Friend Module', function () {
    // Set up the test
    before( async () => {
        mongoose.connect(testConfig, options);
        const db = mongoose.connection;
        User.collection.drop();
        Friends.collection.drop();
        await new User(user_example_1).save();
        await new User(user_example_2).save();
    });

    beforeEach(function() {
    });

    afterEach(function() {
    })

    after(function(done) {
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });

    describe( "Friend Creation", () => {
        it('should update the Friend entry or create it if it doesn\'t Exist', async function () {
            await updateFriendOrCreateIfNotExist({
                fromUserId: userId1,
                toUserId: userId2,
            });


            var ans = await Friends.findOne({'fromUserId': userId1});
            expect(ans.fromUserId).to.eql(user_example_1._id);
            expect(ans.toUserId).to.eql(user_example_2._id);
        });

        it('should determine if given user is a friend of user', async function () {
            var ans = await determineIsFriendOfUser({
                fromUserId: userId1,
                toUserId: userId2,
            });
            expect(ans.fromUserId).to.eql(user_example_1._id);
            expect(ans.toUserId).to.eql(user_example_2._id);
        });
    });

    describe( "Friend Deletion" , async () => {
        it('should delete the friend', async function () {
            await deleteFriend({
                fromUserId: userId1,
                toUserId: userId2,
            });
            var ans = await Friends.findOne({'fromUserId': userId1});
            expect(ans).to.be.a('null');
        });

        it('should determine if given user is a friend of user', async function () {
            var ans = await determineIsFriendOfUser({
                fromUserId: userId1,
                toUserId: userId2,
            });
            expect(ans).to.be.a('null');
        });
    });
});