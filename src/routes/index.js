const express = require('express');

const router = express.Router();


router.get('/api/status', (req, res) => {
  try {
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});


module.exports = router;
