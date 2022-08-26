const express = require('express');

const UserService = require('../lib/user');

const router = express.Router();

// custom middleware for development
router.use((req, res, next) => {
  console.log('User-router: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send('User');
});

router.post('/', async (req, res) => {
  const { googleId, email, displayName, avatarUrl } = req.body;

  try {
    const { userId } = await UserService.createUser(googleId, email, displayName, avatarUrl);
    res.json({ userId });
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;