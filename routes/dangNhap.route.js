const express = require('express');
const router = express.Router();

const {
  login,
  refreshToken,
  resetPassword,
  sendForgotPassWordOtp,
  checkForgotPassWordOtp,
  updateForgotPassWord,
} = require('../controllers/dangNhap.controllers');
const schema = require('../schemas/dangNhap.json');
const mdwValidate = require('../middlewares/validate.mdw');

router.post('/', mdwValidate(schema), login);
router.post('/refreshToken', refreshToken);
router.post('/resetPassword', resetPassword);
router.post('/sendForgotPassWordOtp', sendForgotPassWordOtp);
router.post('/checkForgotPassWordOtp', checkForgotPassWordOtp);
router.post('/updateForgotPassWord', updateForgotPassWord);

module.exports = router;
