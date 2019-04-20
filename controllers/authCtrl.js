const jwt = require('jwt-simple');
const User = require('../models/user');

// Public functions
const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user)});
}

const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(422).send({ error: 'You must provide email and password' });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save(err => {
      if (err) return next(err);

      res.json({ token: tokenForUser(user)});
    });
  });

};

// Private functions
const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
}

module.exports = {
  signin,
  signup
}