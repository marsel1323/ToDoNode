const config = require('config');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('../securities/passport');
const { User } = require('../models');

const { jwtsecret, tokenExpires, refreshTokenExpires } = config.security;

const generateTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, jwtsecret, {
    expiresIn: tokenExpires,
  });
  const refreshToken = jwt.sign({ id: user.id }, jwtsecret, {
    expiresIn: refreshTokenExpires,
  });
  const expiresIn = Date.now() + (tokenExpires * 1000);
  user.setRefreshToken(refreshToken);
  return {
    accessToken: `JWT ${token}`,
    refreshToken,
    expiresIn,
  };
};


router.post('/register', async (req, res) => {
  try {
    await User.create(req.body);
    res.send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post('/login', async (req, res, next) => {
  await passport.authenticate('local', (err, user, message) => {
    if (user === false) {
      res.status(401).send(message || 'Login failed');
    } else {
      res.send(generateTokens(user));
    }
  })(req, next);
});

router.get('/refresh-token/:token', async (req, res) => {
  const { token: oldRefreshToken } = req.params;
  const oldPayload = jwt.verify(oldRefreshToken, jwtsecret);
  if (oldPayload) {
    const user = await User.findById(oldPayload.id).exec();
    if (user.refreshToken === oldRefreshToken) {
      res.send(generateTokens(user));
    }
  }
});


module.exports = router;
