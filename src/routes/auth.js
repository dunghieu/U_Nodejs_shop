const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail(),
    body('password', 'Password has to be valid')
      .isLength({ min: 1 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  '/signup',
  [
    check('email', 'Please enter a valid email.')
      .isEmail()
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('Email address is required.');
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email already exists.');
          }
        });
      })
      .normalizeEmail(),
    body('password', 'Password must be at least 5 characters long.')
      .isLength({ min: 1 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords must match.');
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
