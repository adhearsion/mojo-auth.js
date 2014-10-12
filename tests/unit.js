define([
  'intern!bdd'
  , 'intern/chai!expect'
], function (bdd, expect) {
  bdd.describe('mojo-auth', function () {
    bdd.it('should run tests', function () {
      expect(2).eql(2);
    });
  })
});
