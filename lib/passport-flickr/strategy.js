/**
 * Module dependencies.
 */
var util = require('util')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy;


/**
 * `Strategy` constructor.
 *
 * The Flickr authentication strategy authenticates requests by delegating to
 * Flick using the OAuth protocol.
 *
 * Applications must supply a `verify` callback which accepts a `token`,
 * `tokenSecret` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `consumerKey`     identifies client to Flickr
 *   - `consumerSecret`  secret used to establish ownership of the consumer key
 *   - `callbackURL`     URL to which Flickr will redirect the user after obtaining authorization
 *
 * Examples:
 *
 *     passport.use(new FlickrStrategy({
 *         consumerKey: '123-456-789',
 *         consumerSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/flickr/callback'
 *       },
 *       function(token, tokenSecret, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.requestTokenURL = options.requestTokenURL || 'http://www.flickr.com/services/oauth/request_token';
  options.accessTokenURL = options.accessTokenURL || 'http://www.flickr.com/services/oauth/access_token';
  options.userAuthorizationURL = options.userAuthorizationURL || 'http://www.flickr.com/services/oauth/authorize?perms=read';
  options.sessionKey = options.sessionKey || 'oauth:flickr';

  OAuthStrategy.call(this, options, verify);
  this.name = 'flickr';
}

/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuthStrategy);

/**
 * Retrieve user profile from Flickr.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `id (Flickr user_nsid)`
 *   - `username`
 *   - `fullyName`
 *
 * @param {String} token
 * @param {String} tokenSecret
 * @param {Object} params
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(token, tokenSecret, params, done) {
    try {
      var profile = { provider: 'flickr' };
      profile.id = params['user_nsid'];
      profile.displayName = params['username'];
      profile.fullName = params['fullname'];
      
      done(null, profile);
    } catch(e) {
      done(e);
    }
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
