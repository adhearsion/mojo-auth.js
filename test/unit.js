/*jshint -W030 */

var mojoauth = require('../lib/index')
  , expect = require('chai').expect
  , Timecop = require('timecop')
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
  var defaultTTL = 86400 * 1000;

  describe('without an asserted ID', function () {
    var credentials
      , secret = mojoauth.createSecret()
      ;

    function createCredentials() {
      credentials = mojoauth.createCredentials({ secret: secret });
    }

    beforeEach(function() {
      createCredentials();
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

    context('with the default TTL (1 day)', function () {
      var currentDate = new Date();

      beforeEach(function () {
        Timecop.install();
        Timecop.freeze(currentDate);

        createCredentials();
      });

      afterEach(function () {
        Timecop.uninstall();
      });

      context('during the window', function () {
        beforeEach(function () {
          Timecop.freeze(currentDate.getTime() + defaultTTL);
        });

        it('tests true', function () {
          expect(mojoauth.testCredentials(credentials, secret)).to.be.true;
        });
      });

      context('after the window', function () {
        beforeEach(function () {
          Timecop.freeze(currentDate.getTime() + defaultTTL + 1);
        });

        it('tests false', function () {
          expect(mojoauth.testCredentials(credentials, secret)).to.be.false;
        });
      });
    });

    context('with a custom TTL', function () {
      var ttl = 200,
          currentDate = new Date(),
          futureDate = new Date(currentDate.getTime() + (ttl * 1000));

      beforeEach(function () {
        Timecop.install();
        Timecop.freeze(currentDate);

        credentials = mojoauth.createCredentials({ secret: secret, ttl: ttl });
      });

      afterEach(function () {
        Timecop.uninstall();
      });

      context('during the window', function () {
        beforeEach(function () {
          Timecop.freeze(futureDate);
        });

        it('tests true', function () {
          expect(mojoauth.testCredentials(credentials, secret)).to.be.true;
        });
      });

      context('after the window', function () {
        beforeEach(function () {
          Timecop.freeze(futureDate.getTime() + 1);
        });

        it('tests false', function () {
          expect(mojoauth.testCredentials(credentials, secret)).to.be.false;
        });
      });
    });
  });

  describe('with an asserted ID', function () {
    var id = mojoauth.createSecret()
      , secret = mojoauth.createSecret()
      , credentials
      ;

    function createCredentials() {
      credentials = mojoauth.createCredentials({id: id, secret: secret});
    }

    beforeEach(function() {
      createCredentials();
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

    context('with the default TTL (1 day)', function () {
      var currentDate = new Date();

      beforeEach(function () {
        Timecop.install();
        Timecop.freeze(currentDate);

        createCredentials();
      });

      afterEach(function () {
        Timecop.uninstall();
      });

      context('during the window', function () {
        beforeEach(function () {
          Timecop.freeze(currentDate.getTime() + defaultTTL);
        });

        it('tests truthy, returning the asserted ID', function () {
          expect(mojoauth.testCredentials(credentials, secret)).to.eql(id);
        });
      });

      context('after the window', function () {
        beforeEach(function () {
          Timecop.freeze(currentDate.getTime() + defaultTTL + 1);
        });

        it('tests false', function () {
          expect(mojoauth.testCredentials(credentials, secret)).to.be.false;
        });
      });
    });

    context('with a custom TTL', function () {
      var ttl = 200,
          currentDate = new Date(),
          futureDate = new Date(currentDate.getTime() + (ttl * 1000));

      beforeEach(function () {
        Timecop.install();
        Timecop.freeze(currentDate);

        credentials = mojoauth.createCredentials({ id: id, secret: secret, ttl: ttl });
      });

      afterEach(function () {
        Timecop.uninstall();
      });

      context('during the window', function () {
        beforeEach(function () {
          Timecop.freeze(futureDate);
        });

        it('tests truthy, returning the asserted ID', function () {
          expect(mojoauth.testCredentials(credentials, secret)).to.eql(id);
        });
      });

      context('after the window', function () {
        beforeEach(function () {
          Timecop.freeze(futureDate.getTime() + 1);
        });

        it('tests false', function () {
          expect(mojoauth.testCredentials(credentials, secret)).to.be.false;
        });
      });
    });
  });
});
