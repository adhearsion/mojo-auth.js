/* global define */

'use strict';

var crypto = require('crypto');

var required = function(name) {
  throw(Error, 'requires ' + name);
};

var DAY_IN_SECONDS = 86400;

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
    , ttl = args.ttl || DAY_IN_SECONDS
    , expiryTimestamp = new Date().getTime() + ttl
    , username = [expiryTimestamp, args.id].join(':')
    ;

  return {username: username, password: sign(username, secret)};
};

exports.testCredentials = function (credentials, secret) {
  var username = credentials.username.split(':')
    , expiryTimestamp = username[0]
    , id = username[1]
    ;

  if (parseInt(expiryTimestamp) < new Date().getTime()) {
    return false;
  }
  if (sign(credentials.username, secret) != credentials.password) {
    return false;
  }
  return id || true;
};
