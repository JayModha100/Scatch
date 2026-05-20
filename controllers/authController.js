const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const userModel = require('../models/user-model');

module.exports.registerUser = async function (req, res) {
    console.log(req.body);
  try {

    let { name, email, password } = req.body;

    let existingUser = await userModel.findOne({ email });

    if(existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    bcrypt.genSalt(10, function(err, salt) {

      bcrypt.hash(password, salt, async function(err, hash) {

        if(err) {
          return res.status(500).send(err.message);
        }

        let user = await userModel.create({
          name,
          email,
          password: hash
        });

        let token = generateToken(user);

        res.cookie("token", token).send({
          msg: "User registered successfully",
          token
        });

      });

    });

  } catch (err) {

    res.status(500).send(err.message);

  }

};