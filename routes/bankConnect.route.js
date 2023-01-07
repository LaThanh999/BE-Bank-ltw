const express = require('express');

const router = express.Router();
const {
  getPermissionConnectBank,
  getInfoWithNumberCard,
  transferMoney,
} = require('../controllers/nganHangDoiTac.controllers');
const mdwAuth = require('../middlewares/authPublic.mdw');

router.get('/getPermission', getPermissionConnectBank);
router.post('/getInfo', mdwAuth, getInfoWithNumberCard);
router.post('/transferMoney', mdwAuth, transferMoney);

module.exports = router;
