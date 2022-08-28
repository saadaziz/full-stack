const express = require('express');
const passport = require('passport');

const router = express.Router();

// custom middleware for development
router.use((req, res, next) => {
  console.log('Auth-router: ', Date.now());
  next();
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }),
);

router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    failureRedirect: '/logout',
  }),
  (req, res) => {
    // Cookies that have not been signed
    console.log('oauth2callbackCookies: ', req.cookies);

    // Cookies that have been signed
    console.log('oauth2callbackSigned Cookies: ', req.signedCookies);

    // inspect the request/session
    console.log(`request.session.cookie ${JSON.stringify(req.session.cookie)}`);
    console.log(`request.sessions.passport ${JSON.stringify(req.session.passport)}`);

    // Who is this user?
    //   res.send(`/profile GET request: user | ${await req.user}`);
    res.send(`/profile GET request: user | ${req.user}`);
  },
);

router.get('/login', (req, res, next) => {
  res.render('login');
});

module.exports = router;
