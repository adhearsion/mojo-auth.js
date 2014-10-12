/* global define */

'use strict';

var crypto = require('crypto');

var required = function(name) {
  throw(Error, 'requires ' + name);
};

var sign = function(message, secret) {
  var hmac = crypto.createHmac('sha1', secret);
  hmac.update(message);
  return hmac.digest('base64');
};

exports.createSecret = function () {
  return crypto.randomBytes(64).toString('hex');
};

exports.createCredentials = function (args) {
  var secret = args.secret || required('secret')
    , username = 'foo'
    ;

  return {username: username, password: sign(username, secret)};
};

exports.testCredentials = function (credentials, secret) {
  return credentials.password == sign(credentials.username, secret);
};
