const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
const userModel = require('../models/user-model');

module.exports.registerUser = async function (req, res) {

    console.log(req.body);

    try {

        let { name, email, password } = req.body;

        let existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send("User with this email already exists");
        }

        bcrypt.genSalt(10, function (err, salt) {

            if (err) {
                return res.status(500).send(err.message);
            }

            bcrypt.hash(password, salt, async function (err, hash) {

                if (err) {
                    return res.status(500).send(err.message);
                }

                let user = await userModel.create({
                    name,
                    email,
                    password: hash
                });

                let token = generateToken(user);

                res.cookie("token", token, {
                    httpOnly: true
                }).send({
                    msg: "User registered successfully",
                    token
                });

            });

        });

    } catch (err) {

        res.status(500).send(err.message);

    }

}

module.exports.loginUser = async function (req, res) {

    try {

        let { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).send("Email or password is incorrect");
        }

        bcrypt.compare(password, user.password, function (err, result) {

            if (err) {
                return res.status(500).send(err.message);
            }

            if (result) {

                let token = generateToken(user);

                res.cookie("token", token, {
                    httpOnly: true
                }).send({
                    msg: "User logged in successfully",
                    token
                });

            } else {

                return res.status(400).send("Email or password is incorrect");

            }

        });

    } catch (err) {

        res.status(500).send(err.message);

    }

}

module.exports.logout = function (req, res) {

    res.clearCookie("token");

    res.redirect("/");

}