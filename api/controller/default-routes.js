const express = require('express')

const router = express.Router();

// custom middleware for development
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send('Welcome to the index page');
});

router.get('/about', (req, res) => {
  res.send('About api');
});

module.exports = router;