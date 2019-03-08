const config = require('config');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');

const { User } = require('../models');

const { jwtsecret } = config.security;


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: jwtsecret,
};

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  ((email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user || !user.checkPassword(password)) {
        return done(null, false, { message: 'User doesn\'t exists or wrong password' });
      }
      return done(null, user);
    });
  }),
));

passport.use(new JwtStrategy(jwtOptions, ((payload, done) => {
  User.findById(payload.id, (err, user) => {
    if (err) {
      done(err);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
})));


module.exports = passport;
