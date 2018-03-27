const assert = require('assert');
const { decodeToken } = require('../app/module/users')

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

});