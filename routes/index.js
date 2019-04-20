const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const labRoutes = require('./labs');

// Check service health
router.get('/health-check', (req, res) => res.send('OK'))

router.use('/auth', authRoutes);
router.use('/labs', labRoutes);

module.exports = router;
