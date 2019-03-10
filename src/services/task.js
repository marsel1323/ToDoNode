const { Task } = require('../models');


const create = async ({ userId, title }) => {
  try {
    const task = await Task.create({ userId, title, status: 0 });
    return {
      id: task.id,
      title: task.title,
      status: task.status,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const get = ({ userId, id }) => {
  try {
    return Task.findOne({ userId, _id: id }, (err, doc) => ({
      id: doc._id,
      title: doc.title,
      status: doc.status,
    }));
  } catch (error) {
    console.error(error);
    return null;
  }
};

const list = async ({ userId }) => {
  try {
    const tasks = await Task.find({ userId });
    return tasks.map(task => ({
      id: task._id,
      title: task.title,
      status: task.status,
    }));
  } catch (error) {
    console.error(error);
    return null;
  }
};

const update = async ({ id, title, status }) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { title, status },
      (err, doc) => {
        if (err) return err;
        return doc;
      },
    );
    return {
      id: updatedTask._id,
      title: updatedTask.title,
      status: updatedTask.status,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};


const remove = async ({ id }) => {
  try {
    return Task.findOneAndDelete(
      { _id: id },
      (err, doc) => {
        if (err) return err;
        return true;
      },
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  create,
  get,
  list,
  update,
  remove,
};
