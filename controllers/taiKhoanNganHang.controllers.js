const taiKhoanNganHangModel = require('../models/taiKhoanNganHang.model');
const lichsuGiaoDichModel = require('../models/lichsuGiaoDich.model');
const moment = require('moment');
exports.getAll = async (req, res) => {
  const result = await taiKhoanNganHangModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanNganHangModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't find" });
  }
  res.json(result);
};

exports.transfer = async (req, res) => {

  const thongTinGiaoDich = req.body;
  const accountNumber = thongTinGiaoDich.soTaiKhoanGui || "";
  if (accountNumber === "") {
    return res.json({ Message: 'Không có số tài khoản.', Status: 4 });
  }
  const accountNguoiGui = await taiKhoanNganHangModel.getFindByAccountNumber(thongTinGiaoDich.soTaiKhoanGui);
  const accountNguoiNhan = await taiKhoanNganHangModel.getFindByAccountNumber(thongTinGiaoDich.soTaiKhoanNhan);
  if (!accountNguoiGui || !accountNguoiNhan) {
    return res.json({ Message: 'Không tìm thấy tài khoản ngân hàng.', Status: 4 });
  }
  const soDuNguoiGui =+ (accountNguoiGui.soDu - thongTinGiaoDich.soTien) ;
  const soDuNguoiNhan =+ (accountNguoiNhan.soDu + thongTinGiaoDich.soTien) ;
  if(thongTinGiaoDich.soTien <= 0 )
  {
    return res.json({ Message: 'Số tiền gửi không hợp lệ.', Status: 4 });
  }

  if (soDuNguoiGui < 0) {
    return res.json({ Message: 'Số dư không đủ để thực hiện giao dịch.', Status: 4 });
  }
  else {

    /// Update tài khoản người gửi 
    const result = await taiKhoanNganHangModel.updateAccount(accountNguoiGui.id, soDuNguoiGui);
    if (!result) {
      return res.json({ Message: "Update tài khoản gửi thất bại.", Status: 4 });
    }
    /// Update tài khoản người nhận 
    const result1 = await taiKhoanNganHangModel.updateAccount(accountNguoiNhan.id, soDuNguoiNhan);

    if (!result1) {
      //Update lại tài khoản người gửi
      let moneyBack =+ (accountNguoiGui.soDu + thongTinGiaoDich.soTien);
      await taiKhoanNganHangModel.updateAccount(accountNguoiGui.id,moneyBack);
      return res.json({ Message: "Update tài khoản gửi thất bại.", Status: 4 });
    }

  }
  let date_ob = new Date();
  // current date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear() ;
  let minutes = date_ob.getMinutes();
  
  let number =parseInt(year+month+date+ minutes+"")||0;
  let mts = moment().unix() + number ; 
  let maGiaoDich = mts.toString();
  let ngayGioGiaoDich =  moment(date_ob).format("YYYY-MM-DD HH:mm:ss");
  var data = {
    maGiaoDich:maGiaoDich,
    taiKhoanNguoiNhan:thongTinGiaoDich.soTaiKhoanNhan,
    taiKhoanNguoiGui:thongTinGiaoDich.soTaiKhoanGui,
    soTienChuyen:thongTinGiaoDich.soTien,
    phiGiaoDich:0,
    noiDung:thongTinGiaoDich.noiDung,
    maNganHangNguoiNhan:"LTW",
    maNganHangNguoiGui:"LTW",
    loaiGiaoDich:"LGD001",
    ngayGioGiaoDich:ngayGioGiaoDich,
    create_at:ngayGioGiaoDich
};

  await lichsuGiaoDichModel.add(data);
  res.json({ Message: 'Giao dịch thành công',Status:2 });
};

exports.insert = async (req, res) => {
  const taiKhoanNganHang = req.body;
  const result = await taiKhoanNganHangModel.add(taiKhoanNganHang);
  taiKhoanNganHang.id = result;
  res.status(201).json(taiKhoanNganHang);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const taiKhoanNganHang = req.body;
  const result = await taiKhoanNganHangModel.update(id, taiKhoanNganHang);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(taiKhoanNganHang);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanNganHangModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
