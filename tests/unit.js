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

describe('creating and testing credentials', function () {
  describe('without an asserted ID', function () {
    var credentials
      , secret = mojoauth.createSecret()
      ;

    beforeEach(function() {
      credentials = mojoauth.createCredentials({secret: secret});
    });

    it('raises if no secret is given', function () {
      expect(function () { mojoauth.createCredentials({}); }).to.throw('requires secret');
    });

    describe('for the generated credentials', function () {
      it('tests true', function () {
        expect(mojoauth.testCredentials(credentials, secret)).to.be.true;
      });
    });

    describe('with an incorrect password', function () {
      it('tests false', function () {
        expect(mojoauth.testCredentials({ username: credentials.username, password: 'foobar' }, secret)).to.be.false;
      });
    });

    describe('with a different secret', function () {
      it('tests false', function () {
        expect(mojoauth.testCredentials(credentials, 'something_else')).to.be.false;
      });
    });

    describe('when attempting to extend the expiration', function () {
      it('tests false', function () {
        expect(mojoauth.testCredentials({ username: (new Date().getTime() + 100000).toString(), password: credentials.password }, secret)).to.be.false;
      });
    });
  });

  describe('with an asserted ID', function () {
    var id = mojoauth.createSecret()
      , secret = mojoauth.createSecret()
      , credentials
      ;

    beforeEach(function() {
      credentials = mojoauth.createCredentials({id: id, secret: secret});
    });

    describe('for the generated credentials', function () {
      it('tests truthy, returning the asserted ID', function () {
        expect(mojoauth.testCredentials(credentials, secret)).to.eql(id);
      });
    });

    describe('with an incorrect password', function () {
      it('tests false', function () {
        expect(mojoauth.testCredentials({ username: credentials.username, password: 'foobar' }, secret)).to.be.false;
      });
    });

    describe('with a different secret', function () {
      it('tests false', function () {
        expect(mojoauth.testCredentials(credentials, 'something_else')).to.be.false;
      });
    });

    describe('when attempting to extend the expiration', function () {
      it('tests false', function () {
        expect(mojoauth.testCredentials({ username: (new Date().getTime() + 100000).toString() + ':' + id, password: credentials.password }, secret)).to.be.false;
      });
    });
  });
});
