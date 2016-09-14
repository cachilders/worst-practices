// This code is boilerplate from Auth0 (https://auth0.com)

const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const strategy = new Auth0Strategy({ // These environmental variables are provided by Auth0. Add them to .env.
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENTID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  '/authCallback'

  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now // Investigate this
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;