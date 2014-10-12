/* global define */

'use strict';

var crypto = require('crypto');

exports.createSecret = function () {
  return crypto.randomBytes(64).toString('hex');
};

exports.createCredentials = function () {

};

exports.testCredentials = function () {

};
