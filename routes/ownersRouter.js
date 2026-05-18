const express = require('express');
const router = express.Router();
const OwnderModel = require('../models/owner-model');

if(process.env.NODE_ENV === 'development') {
  router.post('/create', async function (req, res) {
    let owners = await OwnerModel.find();
    if(owners.length>0) 
      return res
      .send(503)
      .send("You don't have permission to create more than one owner");
  });

  router.post('/create', async (req, res) => {
    let createdOwner = await OwnerModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    res.status(201).json({createdOwner});
  });
}
  router.get('/owners', (req, res) => {
  res.send('Owners route');
});

module.exports = router;
