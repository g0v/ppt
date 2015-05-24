module.exports = {
  "local": {
    "provider": "local",
    "module": "passport-local",
    "usernameField": "username",
    "passwordField": "password",
    "authPath": "/auth/local",
    "successRedirect": "/auth/account",
    "failureRedirect": "/local",
    "failureFlash": true
  },
  "facebook-login": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": process.env.PROVIDER_FB_ID,
    "clientSecret": process.env.PROVIDER_FB_SECRET,
    "callbackURL": "/auth/facebook/callback",
    "authPath": "/auth/facebook",
    "callbackPath": "/auth/facebook/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "scope": ["email", "public_profile"],
    "failureFlash": true
  },
  "google-login": {
    "provider": "google",
    "module": "passport-google-oauth",
    "strategy": "OAuth2Strategy",
    "clientID": process.env.PROVIDER_GOOGLE_ID,
    "clientSecret": process.env.PROVIDER_GOOGLE_SECRET,
    "callbackURL": "/auth/google/callback",
    "authPath": "/auth/google",
    "callbackPath": "/auth/google/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "scope": ["email", "profile"],
    "failureFlash": true
  },
  "facebook-link": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": process.env.PROVIDER_FB_ID,
    "clientSecret": process.env.PROVIDER_FB_SECRET,
    "callbackURL": "/link/facebook/callback",
    "authPath": "/link/facebook",
    "callbackPath": "/link/facebook/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "scope": ["email", "public_profile"],
    "link": true,
    "failureFlash": true
  },
  "google-link": {
    "provider": "google",
    "module": "passport-google-oauth",
    "strategy": "OAuth2Strategy",
    "clientID": process.env.PROVIDER_GOOGLE_ID,
    "clientSecret": process.env.PROVIDER_GOOGLE_SECRET,
    "callbackURL": "/link/google/callback",
    "authPath": "/link/google",
    "callbackPath": "/link/google/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "scope": ["email", "profile"],
    "link": true,
    "failureFlash": true
  }
};
