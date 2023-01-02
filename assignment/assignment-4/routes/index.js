const express = require('express');

const router = express.Router();

const users = [];

router.get('/', (req, res) => {
  res.render('index.ejs', { path: '/' });
});

router.get('/users', (req, res) => {
  res.render('users.ejs', {
    path: '/users',
    users,
  });
});

router.post('/users', (req, res) => {
  users.push({ username: req.body.username });
  console.log(users);
  res.status(302).redirect('/users');
});

module.exports = router;
