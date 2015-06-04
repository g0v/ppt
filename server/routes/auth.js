var express = require('express'),
    passport = require('passport'),
    router = express.Router();

router.get('/google', passport.authenticate('google',{
  scope: [
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.send(`Google ok! userId=${req.user.id}`).end();
});

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));
router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  res.send(`Facebook ok! userId=${req.user.id}`).end();
});

module.exports = router;
