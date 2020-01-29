const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users');
const checkAuth = require('../middlewares/checkAuth');
/* eslint-disable */
// create new users here
router.post('/signup', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Email Exists',
        });
      }
      return bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        return user
          .save()
          .then(result => {
            res.status(201).json({
              message: 'User Created',
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err,
            });
          });
      });
    });
});

// check user is valid
router.post('/login', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth Failed!',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth Failed!',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            'secret',
            {
              expiresIn: '1h',
            },
          );
          return res.status(200).json({
            message: 'Auth Successful',
            token,
          });
        }
        res.status(401).json({
          message: 'Auth Failed!',
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
});

// get user data
router.get('/user_profile', checkAuth, async (req, res) => {
  await User.find({ _id: req.userData.userId }, { name: '', email: '' })
    .then(result => {
      return res.status(200).json({
        data: result,
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
});

// update user name
router.put('/user_profile_update', checkAuth, (req, res) => {
  const query = { _id: req.body.id };
  const update = {
    name: req.body.name,
  };
  const options = {};
  User.findOneAndUpdate(query, update, options)
    .exec()
    .then(result => {
      res.status(201).json({
        message: 'User Updated',
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
