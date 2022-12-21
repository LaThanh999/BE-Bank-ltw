const lichSuGiaoDichModel = require('../models/lichSuGiaoDich.model');

exports.getAll = async (req, res) => {
  const result = await lichSuGiaoDichModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;

  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }

  const result = await lichSuGiaoDichModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't not find customer" });
  }

  res.json(result);
};
exports.getByAccountNumber = async (req, res) => {
  let accountNumber = req.params.accountNumber;
  if (accountNumber === "" || accountNumber === null) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await lichSuGiaoDichModel.getByAccountNumber(accountNumber);
  if (!result) {
    return res.json({ Message: "Can't find" });
  }
  if(result.length !== 0)
  {
    result.forEach(item => {
      if(item.taiKhoanNguoiGui ===  accountNumber)
      {
        item.type = 1;
   
      }
      if(item.taiKhoanNguoiNhan ===  accountNumber)
      {
        item.type = 2;
    
      }
      // print(temp)
    });
   
  }
  res.json(result);
};
exports.transferMoney = async (req, res) => {
  let accountNumber = req.params.accountNumber;
  if (accountNumber === "" || accountNumber === null) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await lichSuGiaoDichModel.transferMoney(accountNumber);
  if (!result) {
    return res.json({ Message: "Can't find" });
  }
  res.json(result);
};
exports.receiveMoney = async (req, res) => {
  let accountNumber = req.params.accountNumber;
  if (accountNumber === "" || accountNumber === null) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await lichSuGiaoDichModel.receiveMoney(accountNumber);
  if (!result) {
    return res.json({ Message: "Can't find" });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const lichSuGiaoDich = req.body;
  const result = await lichSuGiaoDichModel.add(lichSuGiaoDich);
  lichSuGiaoDich.id = result;
  res.status(201).json(lichSuGiaoDich);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const lichSuGiaoDich = req.body;
  const result = await lichSuGiaoDichModel.update(id, lichSuGiaoDich);
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
  const result = await lichSuGiaoDichModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove  successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
