const express = require('express');

const router = express.Router();

const auth = require('./auth');
const task = require('./task');

router.get('/api/status', (req, res) => {
  try {
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.use('/api', auth);
router.use('/api/task', task);

module.exports = router;
