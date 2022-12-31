const express = require('express');

const router = express.Router();
const { sendOTP, checkOTP } = require('../controllers/otpTransfer.controllers');

router.post('/', sendOTP);
router.post('/isVerifyOtp', checkOTP);

module.exports = router;
