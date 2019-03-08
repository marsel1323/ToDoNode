module.exports = {
  PORT: 8081,

  db: {
    // local mongodb
    url: 'mongodb://localhost:27017/ToDoNode',
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
