const { User, Task } = require('../models');


const create = async ({ userId, title }) => {
  try {
    // const user = await User.findById(userId);
    // if(!user) throw new Error('User not found');

    const newTask = await Task.create({ userId, title, status: 0 });
    return newTask;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const get = (id) => {
  try {

  } catch (error) {
    console.error(error);
  }
};

const list = () => {
  try {

  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  create,
  get,
  list,
};
