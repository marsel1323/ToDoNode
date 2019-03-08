const express = require('express');

const router = express.Router();

const auth = require('./auth');


router.get('/api/status', (req, res) => {
  try {
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.use('/api', auth);


module.exports = router;
