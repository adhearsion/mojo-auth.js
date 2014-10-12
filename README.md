[![Build Status](https://travis-ci.org/mojolingo/mojo-auth.js.svg?branch=develop)](http://travis-ci.org/mojolingo/mojo-auth.js)

# mojo-auth.js

[mojoauth](http://mojolingo.com/mojoauth) is a set of standard approaches to cross-app authentication based on [Hash-based Message Authentication Codes](http://en.wikipedia.org/wiki/Hash-based_message_authentication_code) (HMAC), inspired by ["A REST API For Access To TURN Services"](http://tools.ietf.org/html/draft-uberti-behave-turn-rest).

## Installation

Run `npm install mojo-auth.js --save` to add this library as a dependency to your Node.js project.

## Usage

```javascript
> var mojoauth = require('mojo-auth.js');

> var secret, credentials;
undefined

// Generate a shared secret
> secret = mojoauth.createSecret();
'27058c65ab05794cdec23abb2ad49f402e011d1ff56b61d4a4c37032ced2d94df6cff260c4fee814d1f9ea35fa7a2962332f0b2c5415e753b329c328a62c86f8'

// Create temporary credentials
> credentials = mojoauth.createCredentials({id: 'foobar', secret: secret});
{ username: '1413151933064:foobar',
  password: 'lvpE3AcLea5Io4mj8xT/eMlvw9k=' }

// Test credentials
> mojoauth.testCredentials({username: '1413151933064:foobar', password: 'lvpE3AcLea5Io4mj8xT/eMlvw9k='}, secret);
'foobar'
> mojoauth.testCredentials({username: '1413151933064:foobar', password: 'wrongpassword'}, secret);
false

// 1 day later
> mojoauth.testCredentials({username: '1413151933064:foobar', password: 'lvpE3AcLea5Io4mj8xT/eMlvw9k='}, secret);
false
```

## Contributing

1. [Fork it](https://github.com/mojolingo/mojo_auth.js/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
