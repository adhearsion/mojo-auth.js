/* global define */

'use strict';

var crypto = require('crypto');

var required = function(name) {
  throw new Error('requires ' + name);
};

var DAY_IN_SECONDS = 86400;

var sign = function(message, secret) {
  var hmac = crypto.createHmac('sha1', secret);
  hmac.update(message);
  return hmac.digest('base64');
};

/**
  * Create a new random secret
  *
  * @return {String} a new random secret
 */
exports.createSecret = function () {
  return crypto.randomBytes(64).toString('hex');
};

/**
  * Create a new credential set
  *
  * @param {String} id the identity to be asserted in the credentials
  * @param {String} secret the shared secret with which to create credentials
  * @param {Integer} ttl the duration for which the credentials should be valid in seconds
  *
  * @return {Object} signed credentials, keys username and password
 */
exports.createCredentials = function (args) {
  var secret = args.secret || required('secret')
    , ttl = args.ttl || DAY_IN_SECONDS
    , expiryTimestamp = new Date().getTime() + ttl
    , username = [expiryTimestamp, args.id].join(':')
    ;

  return {username: username, password: sign(username, secret)};
};

/**
  * Test that credentials are valid
  *
  * @param {Object} credentials a set of credentials including a username and a password
  * @param {String} secret the shared secret against which to test credentials
  *
  * @return {Boolean, String} whether or not the credentials are valid (were created using the specified secret) and current (have not yet expired). When the credentials assert an identity, that identity is returned.
 */
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
