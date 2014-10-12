define([
  'intern!bdd'
  , 'intern/chai!expect'
  , 'intern/order!mojo-auth'
], function (bdd, expect, mojoauth) {
  bdd.describe('creating a secret', function () {
    bdd.it('should be a string', function () {
      expect(mojoauth.createSecret()).to.be.a('string');
    });
  });
});
