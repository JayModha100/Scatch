const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/authController');

router.get('/users', (req, res) => {
  res.send('Users route');
});
router.post('/register', registerUser);
module.exports = router;
