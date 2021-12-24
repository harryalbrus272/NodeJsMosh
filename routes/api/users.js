const { User, validateUser } = require('../../models');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already Registered');
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  await user.save();
  res.status(200).send(_.pick(user, ['name', 'email', '_id']));
});

module.exports = router;
