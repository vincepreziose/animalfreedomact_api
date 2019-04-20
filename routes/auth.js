const express = require('express');
const passport = require('passport');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl');
const passportService = require('../services/passport');
const requireSignin = passport.authenticate('local', { session: false });

// Auth Routes
router.post('/signin', requireSignin, authCtrl.signin);
router.post('/signup', authCtrl.signup);

module.exports = router;
