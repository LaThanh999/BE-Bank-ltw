const historyModel = require('../models/history.model');

exports.getAll = async (req, res) => {
  const result = await historyModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;

  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }

  const result = await historyModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't not find customer" });
  }

  res.json(result);
};
exports.getByAccountNumber = async (req, res) => {
  let accountNumber = req.params.accountNumber;
  if (accountNumber === '' || accountNumber === null) {
    return res.json({ Message: 'Please check input' });
  }

  const result = await historyModel.getByAccountNumber(accountNumber);

  let type = + req.params.type || 0;
  if (type === '' || type === null) {
    type = 0;
  }
  if (!result) {
    return res.json({ Message: "Can't find" });
  }

  let array = [];
  if (result.length !== 0) {
    result.forEach((item) => {
      if (item.taiKhoanNguoiGui === accountNumber) {
        item.type = 1;
      }
      if (item.taiKhoanNguoiNhan === accountNumber) {
        item.type = 2;
      }
      // print(temp)
    });

////// Check xem để lấy lịch sử giao dịch theo chuyển hay nhận
    if (type === 1) {
      result.forEach(function (item) {
        if (item.type === 1) {
          array.push(item);
        }

      });
    }
    else if (type === 2) {
      result.forEach(function (item) {
        if (item.type === 2) {
          array.push(item);
        }
      });
    }
    else {
      array = result;
    }

  }
  res.json(array);
};


exports.receiveMoney = async (req, res) => {
  let accountNumber = req.params.accountNumber;
  if (accountNumber === '' || accountNumber === null) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await historyModel.receiveMoney(accountNumber);
  if (!result) {
    return res.json({ Message: "Can't find" });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const lichSuGiaoDich = req.body;
  const result = await historyModel.add(lichSuGiaoDich);
  lichSuGiaoDich.id = result;
  res.status(201).json(lichSuGiaoDich);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const lichSuGiaoDich = req.body;
  const result = await historyModel.update(id, lichSuGiaoDich);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(lichSuGiaoDich);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await historyModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove  successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
