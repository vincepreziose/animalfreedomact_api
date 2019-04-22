const express = require('express');
const passport = require('passport');
const router = express.Router();
const labCtrl = require('../controllers/labCtrl');
const passportService = require('../services/passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', requireAuth, labCtrl.getLabs);

module.exports = router;
