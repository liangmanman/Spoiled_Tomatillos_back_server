const assert = require('assert');
const { decodeToken, test } = require('../app/module/users')

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
  });

  describe('test', function() {
    it('test function', function() {
      assert.equal(test(), 'hello');
    });
  })
});