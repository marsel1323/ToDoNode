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

router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const { user, params: { id } } = req;

    const task = await taskService.get({ userId: user.id, id });

    if (task) {
      res.send(task);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const { user } = req;

    const tasks = await taskService.list({ userId: user.id });

    if (tasks) {
      res.send(tasks);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { body: { title, status }, params: { id } } = req;

    const task = await taskService.update({ id, title, status });

    if (task) {
      res.send(task);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const { params: { id } } = req;

    await taskService.remove({ id });

    res.send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});


module.exports = router;
