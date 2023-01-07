const taiKhoanModel = require('../models/taiKhoan.model');
const taiKhoanNganHangModel = require('../models/taiKhoanNganHang.model');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const helper = require('../helper/email');
const moment = require('moment');
const constant = require('../constants/common');

exports.getAll = async (req, res) => {
  const result = await taiKhoanModel.getAll();
  res.json(result);
};

exports.getByNumberCard = async (req, res) => {
  const numberCard = +req.params.numberCard || 0;
  if (!numberCard) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.getFindByNumberCard(numberCard);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.getByNumberCardWithMoney = async (req, res) => {
  const numberCard = +req.params.numberCard || 0;
  if (!numberCard) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.getFindByNumberCardWithMoney(numberCard);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.getByNumberCardOrEmailPhone = async (req, res) => {
  const inputSearch = req.body.inputSearch;
  if (!inputSearch) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.getFindByNumberCardOrEmailPhone(inputSearch);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.getByNumberCardAndBankId = async (req, res) => {
  const numberCard = +req.body.numberCard;
  const bankId = +req.body.bankId;
  if (!numberCard || !bankId) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.getFindByNumberCardAndBankId(numberCard, bankId);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const taiKhoan = req.body;
  const result = await taiKhoanModel.update(id, taiKhoan);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(taiKhoan);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};

exports.register = async (req, res) => {
  const user = req.body;
  user.matKhau = bcrypt.hashSync(user.matKhau, 10);
  const temp = await taiKhoanModel.getWithUsernameOrEmail(user.taiKhoan);
  if (temp) {
    res.status(409).json({ message: 'Bạn đã đăng ký rồi' });
  }
  const result = await taiKhoanModel.add(user);
  user.id = result[0];
  res.status(201).json(user);
};

exports.insert = async (req, res) => {
  const customer = req.body;
  const result = await taiKhoanModel.add(customer);
  customer.customer_id = result;
  res.status(201).json(customer);
};

exports.getNumberMoney = async (req, res) => {
  const id = +req.params.id || 0;
  const result = await taiKhoanModel.getNumberMoneyWithId(id);
  res.status(201).json(result);
};

exports.blockAccount = async (req, res) => {
  const { numberCard } = req.body;
  if (!numberCard) {
    return res.status(401).json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.updateBuyNumberCard(numberCard, { isBlock: 1 });
  res.status(201).json(result);
};

exports.getAllCustomer = async (req, res) => {
  const result = await taiKhoanModel.getAllCustomer();
  res.json(result);
};
exports.getAllEmployee = async (req, res) => {
  const result = await taiKhoanModel.getAllEmployee();
  res.json(result);
};
exports.addCustomer = async (req, res) => {
  try {
    const { username, fullName, email, phone } = req.body;
    const tempEmail = await taiKhoanModel.getWithUsernameOrEmail(email);
    const tempPhone = await taiKhoanModel.getWithUsernameOrEmail(phone);
    const tempUsername = await taiKhoanModel.getWithUsernameOrEmail(username);
    if (tempPhone || tempEmail || tempUsername) {
      res.status(409).json({ status: 2, message: 'Bạn đã đăng ký rồi' });
      return;
    }
    let numberCard;
    do {
      numberCard = Math.floor(Math.random() * 9999999999) + 1000000000;
    } while (await taiKhoanModel.getFindByNumberCard(numberCard));
    const password = Math.floor(Math.random() * 999999) + 100000;
    const passwordHash = bcrypt.hashSync(`${password}`, 10);
    helper.sendMailPassWord(email, fullName, password);
    await taiKhoanModel.addCustomer({
      taiKhoan: username,
      matKhau: passwordHash,
      hoTen: fullName,
      email: email,
      sdt: phone,
      loaiTaiKhoan: 2,
      maTaiKhoan: numberCard,
      create_at: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
    });
    res.status(200).json({ status: 1, message: 'Thành công' });
  } catch (err) {
    res.status(401).json({ status: 3, message: 'Thất bại' });
    return;
  }
};

exports.addMoneyCustomer = async (req, res) => {
  try {
    const { numberOfMoney, numberCard } = req.body;

    const accountNguoiGui = await taiKhoanNganHangModel.getFindByAccountNumber(numberCard);

    let date_ob = new Date();
    // current date
    let date = ('0' + date_ob.getDate()).slice(-2);
    // current month
    let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current minutes
    let minutes = date_ob.getMinutes();
    // Tạo mã giao dịch
    let number = parseInt(year + month + date + minutes + '') || 0;
    let mts = moment().unix() + number;
    let maGiaoDich = mts.toString();

    let ngayGioGiaoDich = moment(date_ob).format('YYYY-MM-DD HH:mm:ss');

    var dataHistory = {
      maGiaoDich: maGiaoDich,
      taiKhoanNguoiNhan: numberCard,
      taiKhoanNguoiGui: 0,
      soTienChuyen: numberOfMoney,
      tienThucNhan: numberOfMoney,
      phiGiaoDich: 0,
      noiDung: 'Nap tien vào tài khoản',
      idNganHangNhan: constant.ID_BANK_LTW,
      idNganHangGui: constant.ID_BANK_LTW,
      idLoaiGiaoDich: constant.ID_TYPE_TRANSFER_ADD_CUSTOMER,
      ngayGioGiaoDich: ngayGioGiaoDich,
      create_at: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
    };

    await taiKhoanModel.addMoneyCustomer(
      numberCard,
      {
        soDu: +accountNguoiGui.soDu + +numberOfMoney,
      },
      dataHistory,
    );

    res.status(200).json({ status: 1, message: 'Thành công' });
    return;
  } catch (err) {
    res.status(401).json({ status: 2, message: 'Thất bại' });
    return;
  }
};
