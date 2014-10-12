[![Build Status](https://travis-ci.org/mojolingo/mojo-auth.js.svg?branch=develop)](http://travis-ci.org/mojolingo/mojo-auth.js)

# mojo-auth.js

[mojoauth](http://mojolingo.com/mojoauth) is a set of standard approaches to cross-app authentication based on [Hash-based Message Authentication Codes](http://en.wikipedia.org/wiki/Hash-based_message_authentication_code) (HMAC), inspired by ["A REST API For Access To TURN Services"](http://tools.ietf.org/html/draft-uberti-behave-turn-rest).

## Installation

Run `npm install mojo-auth.js --save` to add this library as a dependency to your Node.js project.

## Usage

```javascript
var mojoauth = require('mojo-auth.js');

# Generate a shared secret
var secret = mojoauth.createSecret();
  # => "XyD+xeJHivzbOUe3vwdU6Z5vDe/vio34MxKX8HYViR0+p4t/NzaIpbK+9VwX\n5qHCj7m4f7UNRXgOJPXzn6MT0Q==\n"

# Create temporary credentials
var credentials = mojoauth.createCredentials({id: 'foobar', secret: secret});
  # => {:username=>"1411837760:foobar", :password=>"wb6KxLj6NXcUaqNb1SlHH1V3QHw=\n"}

# Test credentials
mojoauth.testCredentials({username: "1411837760:foobar", password: "wb6KxLj6NXcUaqNb1SlHH1V3QHw=\n"}, secret: secret);
  # => "foobar"
mojoauth.testCredentials({username: "1411837760:foobar", password: "wrongpassword"}, secret: secret);
  # => false

# 1 day later
mojoauth.testCredentials({username: "1411837760:foobar", password: "wb6KxLj6NXcUaqNb1SlHH1V3QHw=\n"}, secret: secret);
  # => false
```

## Contributing

1. [Fork it](https://github.com/mojolingo/mojo_auth.js/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
