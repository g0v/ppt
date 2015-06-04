import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';
import {User} from '../models';

const debug = require('debug')('ppt:passport');

if (process.env.NODE_ENV !== 'production') {
  require('node-env-file')(__dirname+'/../../.env');
  let port = require('../../package.json').config.webpackDevServerPort;

  // Local environment, use localhost as callback host.
  //
  process.env.PROVIDER_CALLBACK_HOST = `http://localhost:${port}`
}

//
// Strategies
//

passport.use(new FacebookStrategy({
  clientID: process.env.PROVIDER_FB_ID,
  clientSecret: process.env.PROVIDER_FB_SECRET,
  callbackURL: `${process.env.PROVIDER_CALLBACK_HOST}/auth/facebook/callback`,
  enableProof: false
}, function verifyFacebook(accessToken, refreshToken, profile, done) {
  debug('Verifying user profile', profile);

  var email = profile.emails[0] && profile.emails[0].value || '',
      matchConditions = [{fbid: profile.id}];

  if(email){
    // If email exists, also match email
    matchConditions.push({email});
  }

  User.findOrCreate({
    where: { $or: matchConditions },
    defaults: {
      name: profile.displayName,
      fbid: profile.id,
      avatar: `https://graph.facebook.com/v2.3/${profile.id}/picture`,
      email
    }
  }).then(([user, isCreated]) => {
    done(null, user);
  }).catch(done);
}));

passport.use(new GoogleStrategy({
  clientID: process.env.PROVIDER_GOOGLE_ID,
  clientSecret: process.env.PROVIDER_GOOGLE_SECRET,
  callbackURL: `${process.env.PROVIDER_CALLBACK_HOST}/auth/google/callback`
}, function verifyGoogle(accessToken, refreshToken, profile, done) {
  debug('Verifying user profile', profile);

  var email = profile.emails[0] && profile.emails[0].value || '',
      matchConditions = [{googleid: profile.id}];

  if(email){
    // If email exists, also match email
    matchConditions.push({email});
  }

  User.findOrCreate({
    where: { $or: matchConditions },
    defaults: {
      name: profile.displayName,
      googleid: profile.id,
      avatar: profile.photos[0] && profile.photos[0].value || '',
      email
    }
  }).then(([user, isCreated]) => {
    done(null, user);
  }).catch(done);
}));

//
// Session handling
//
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  }).catch(done);
});
