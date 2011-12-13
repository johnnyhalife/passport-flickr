# Passport-Flickr

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with Flickr using the OAuth 1.0a API.

## Installation

    $ npm install passport-flickr

## Usage

#### Configure Strategy

The Flickr authentication strategy authenticates users using a Flickr account and
OAuth tokens.  The strategy requires a `verify` callback, which accepts these
credentials and calls `done` providing a user, as well as `options` specifying a
consumer key, consumer secret, and callback URL.

    passport.use(new FlickrStrategy({
        consumerKey: FLICKR_CONSUMER_KEY,
        consumerSecret: FLICKR_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/flickr/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ flickrId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'flickr'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/flickr',
      passport.authenticate('flickr'),
      function(req, res){
        // The request will be redirected to Flickr for authentication, so this
        // function will not be called.
      });
    
    app.get('/auth/flickr/callback', 
      passport.authenticate('flickr', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Credits
  - [Johnny Halife](http://github.com/johnnyhalife)
