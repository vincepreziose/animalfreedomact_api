const express = require('express');
const router = express.Router();
const labCtrl = require('../controllers/labCtrl');

router.get('/', labCtrl.getLabs);

module.exports = router;
