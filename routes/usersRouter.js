const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/users', (req, res) => {
  res.send('Users route');
});
router.post('/register', async function (req, res) {
  
  try {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, async function(err, hash) {
          {if(err) { return res.send(err.message) }
          else res.send(hash)}
      });
  });
    
    let { name, email, password } = req.body;
    let user = await userModel.create({ name, email, password });
    res.json({

module.exports = router;
