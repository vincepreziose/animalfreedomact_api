const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Local Strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

  User.findOneByEmail(email)
    .then(user => {
      if (!user) {
        const error = new Error('Unauthorized: email not found.');
        error.status = 401;
        throw error;
      }
      return user;
    })
    .then(user => {
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) {
          const error = new Error(err);
          error.status = 400;
          return done(error)
        }
        if (!isMatch) {
          const error = new Error('Unauthorized: password does not match.');
          error.status = 401;
          return done(error);
        }
        return done(null, user);
      })
    })
    .catch(err => {
      return done(err);
    });
});

// Setup options for JwtStrategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

  console.log('Yo dawg!')
  // User.findById(payload.sub, (err, user) => {
  //   if (err) {
  //     const error = new Error(err);
  //     error.status = 401;
  //     return done(error)
  //   }
  //
  //   if (user) {
  //     done(null, user);
  //   } else {
  //     done(null, false);
  //   }
  // });
})

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
