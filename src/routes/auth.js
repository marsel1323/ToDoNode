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


router.post('/signup', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send({ error: 'User already exists' });
    } else {
      const newUser = await User.create(req.body);
      if (newUser) {
        res.send(generateTokens(newUser));
      } else {
        res.status(401).send('Login failed');
      }
    }
  } catch (error) {
    console.error({ error: error.code });
    res.status(500).send();
  }
});

router.post('/login', async (req, res, next) => {
  await passport.authenticate('local', (err, user, message) => {
    if (user === false) {
      res.status(400).send(message || 'Login failed');
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
