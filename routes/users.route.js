const express = require('express');

const router = express.Router();
const { register } = require('../controllers/taiKhoan.controllers');

router.post('/', register);

module.exports = router;
