const express = require('express');
const router = express.Router();

const { login, refreshToken } = require('../controllers/auth.controllers');

router.post('/', login);
router.post('/refreshToken', refreshToken);

module.exports = router;
