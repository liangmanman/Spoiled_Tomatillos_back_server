const assert = require('assert');
const {
  test,
  decodeToken,
  generateJwtTokenForUser,
  verifyMe,
  getUser,
  findUsersBySearch,
} = require('../app/module/users')

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
      assert(verifyMe({userId: "hi"}), 'hello');
    });
    it('getUser', function() {
      assert(getUser({userId: "hi"}), 'hello');
    });
    it('findUsersBySearch', function() {
      assert(findUsersBySearch({searchBy:'fullName'}), 'hello');
    })

  });

  describe('test', function() {
    it('test function', function() {
      assert.equal(test(), 'hello');
    });
  })
});