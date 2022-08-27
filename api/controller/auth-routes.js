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
        failureRedirect: '/login',
        successRedirect: '/profile',
    }),
    (req, res) => {
    },
);

module.exports = router;