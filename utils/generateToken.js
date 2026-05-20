const jwt = require("jsonwebtoken")

const generateToken = (user) => {
  let token = jwt.sign({id : user._id, email: user.email}, process.env.JWT_SECRETKEY, { expiresIn: "1h" });
  return token;
}
module.exports.generateToken = generateToken;