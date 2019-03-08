const passport = require('passport');


module.exports = async (req, res, next) => {
  if (process.env.NODE_ENV !== 'Production'
    && req.headers['user-agent'].includes('Postman')) {
    await next();
    return;
  }
  await passport.authenticate('jwt', async (err, user) => {
    if (user) {
      req.user = user;
      await next();
    } else {
      res.status(401).send({ error: 'You do not have access to this resource' });
    }
  })(req, next);
};
