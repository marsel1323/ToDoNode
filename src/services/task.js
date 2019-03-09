const { Task } = require('../models');


const create = async ({ userId, title }) => {
  try {
    const newTask = await Task.create({ userId, title, status: 0 });
    return newTask;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const get = async ({ userId, id }) => {
  try {
    const task = await Task.findOne({ userId, _id: id });
    return task;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const list = async ({ userId }) => {
  try {
    return Task.find({ userId });
  } catch (error) {
    console.error(error);
    return null;
  }
};

const update = async ({
  userId, id, title, status,
}) => {
  try {
    return Task.findOneAndUpdate(
      { userId, _id: id },
      { title, status },
      (err, doc) => {
        if (err) return err;
        return doc;
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
};
