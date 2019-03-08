const router = require('express').Router();
const { task: taskService } = require('../services');
const isAuthenticated = require('../middlewares/policies/isAuthenticated');

router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { user, body: { title } } = req;

    const newTask = await taskService.create({ userId: user.id, title });
    res.send(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

module.exports = router;
