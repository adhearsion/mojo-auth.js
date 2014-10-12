/*jshint -W030 */

var mojoauth = require('../index')
  , expect = require('chai').expect
  ;

describe('creating a secret', function () {
  it('should be a string', function () {
    expect(mojoauth.createSecret()).to.be.a('string');
  });

  it('is longer than 20 characters', function () {
    expect(mojoauth.createSecret()).to.have.length.above(20);
  });
});
