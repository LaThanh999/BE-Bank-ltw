const notificationModel = require('../models/notifications.model');

exports.getAll = async (req, res) => {
  const result = await notificationModel.getAll();
  res.json(result);
};

exports.getByAccountNumber = async (req, res) => {
  try {
    let { numberCard } = req.body;
    if (!numberCard) {
      return res.json({ Message: 'Please check input' });
    }
    const result = await notificationModel.getWidthNumberCard(numberCard);
    return res.json(result);
  } catch (error) {
    res.status(401).json({
      status: 2,
      message: 'Thất bại',
    });
  }
};

exports.updateNotifyByAccountNumber = async (req, res) => {
  try {
    let { numberCard } = req.body;
    if (!numberCard) {
      return res.json({ Message: 'Please check input' });
    }
    await notificationModel.updateNotify(numberCard);
    return res.json({
      status: 1,
      message: 'Thành công',
    });
  } catch (error) {
    res.status(401).json({
      status: 2,
      message: 'Thất bại',
    });
  }
};

exports.addNotificationsTransfer = async (req, res) => {
  try {
    let { numberCardFrom, numberCardTo, numberOfMoney } = req.body;
    if (!numberCardFrom || !numberCardTo) {
      return res.json({ Message: 'Please check input' });
    }
    await notificationModel.add({
      numberCardFrom,
      numberCardTo,
      message: `Đã thanh toán số nợ ${numberOfMoney} VND`,
      type: 0,
      isSeen: 0,
    });
    return res.json({
      status: 1,
      message: 'Thành công',
    });
  } catch (error) {
    console.log('err', error);
    res.status(401).json({
      status: 2,
      message: 'Thất bại',
    });
  }
};
