const express = require('express');

const router = express.Router();
const {
  getByAccountNumber,
  addNotificationsTransfer,
  updateNotifyByAccountNumber,
} = require('../controllers/notifications.controllers');

router.post('/getByAccountNumber', getByAccountNumber);
router.post('/addNotification', addNotificationsTransfer);
router.post('/updateNotification', updateNotifyByAccountNumber);

module.exports = router;
