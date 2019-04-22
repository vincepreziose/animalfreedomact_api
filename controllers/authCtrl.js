const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

// Public functions
const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user)});
}

const signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      const error = new Error('You must provide email and password');
      error.status = 422;
      throw error;
    }

    const existingUser = await User.findOneByEmail(email);
    if (existingUser) {
      const error = new Error('Email is in use');
      error.status = 422;
      throw error;
    }

    let hashedPassword;
    bcrypt.genSalt(10, async (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(password, salt, null, async (err, hashedPassword) => {
        if (err) return next(err);

        const newUser = await User.save(email, hashedPassword);

        if (!newUser instanceof User) {
          throw Error('Could not save new user.')
        }

        const token = tokenForUser(newUser);

        return res.status(200).send({
          status: 200,
          message: 'Successfully create new user!',
          data: {
            token: token
          }
        });
      });
    });
  } catch (err) {
    next(err);
  }
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