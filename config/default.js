module.exports = {
  PORT: 8080,

  db: {
    // local mongodb
    // url: 'mongodb://localhost:27017/ToDoNode',

    // web db
    url: 'mongodb://user:qwerty123@ds263295.mlab.com:63295/todolist',
    options: {
      keepAlive: 1,
      useNewUrlParser: true,
    },
  },

  security: {
    jwtsecret: 'mysecretkey',
    tokenExpires: 60 * 30,
    refreshTokenExpires: 60 * 60 * 48,
  },
};
