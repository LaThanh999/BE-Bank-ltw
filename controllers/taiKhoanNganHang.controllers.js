const taiKhoanNganHangModel = require('../models/taiKhoanNganHang.model');
const lichsuGiaoDichModel = require('../models/lichsuGiaoDich.model');
const loaiGiaoDichModel = require('../models/loaiGiaoDich.model');
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
  
   async function   hoanTienNguoiGui(idNguoiGui,soDuNguoiGui,soTien ,phiGiaoDich,traPhi) {
    let moneyBack = soDuNguoiGui +  parseFloat(soTien) ;
    if(traPhi === 1 )
    {
      moneyBack = moneyBack + parseFloat(phiGiaoDich);
    }
  await taiKhoanNganHangModel.updateAccount(idNguoiGui, moneyBack);
  }

  async function hoanTienNguoiNhan(idNguoiNhan, soDuNguoiNhan,soTien,phiGiaoDich,traPhi){

    let moneyBack = soDuNguoiNhan -  parseFloat(soTien);
    if(traPhi === 0)
    {
      moneyBack = moneyBack + parseFloat(phiGiaoDich);
    }
    await taiKhoanNganHangModel.updateAccount(idNguoiNhan, moneyBack);

  }
  

  if (accountNumber === "") {
    return res.json({ Message: 'Không có số tài khoản.', Status: 4 });
  }
  ////// Lấy thông tin tài khoản người nhận, người gửi để kiểm trả
  const accountNguoiGui = await taiKhoanNganHangModel.getFindByAccountNumber(thongTinGiaoDich.soTaiKhoanGui);
  const accountNguoiNhan = await taiKhoanNganHangModel.getFindByAccountNumber(thongTinGiaoDich.soTaiKhoanNhan);

  if (!accountNguoiGui || !accountNguoiNhan) {
    return res.json({ Message: 'Không tìm thấy tài khoản ngân hàng.', Status: 4 });
  }

  let soDuNguoiGui = (parseFloat(accountNguoiGui.soDu) - parseFloat(thongTinGiaoDich.soTien)) 
  let soDuNguoiNhan = (parseFloat(accountNguoiNhan.soDu) + parseFloat(thongTinGiaoDich.soTien))

  // Cập nhật phí giao dịch
  const loaiGiaoDich = await loaiGiaoDichModel.getFindByMaGD(thongTinGiaoDich.loaiGiaoDich);
  ///// Kiểm tra tài khoản nào tốn phí
  if(thongTinGiaoDich.traPhi === 1 )
  {
    soDuNguoiGui = soDuNguoiGui - parseFloat(loaiGiaoDich.phiGiaoDich);
  }
  else if(thongTinGiaoDich.traPhi === 0)
  {
    soDuNguoiNhan = soDuNguoiNhan - parseFloat(loaiGiaoDich.phiGiaoDich);
  }
//////// kiểm tra số tiền có âm hay không
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
      await hoanTienNguoiGui(accountNguoiGui.id,soDuNguoiGui,thongTinGiaoDich.soTien,loaiGiaoDich.phiGiaoDich,thongTinGiaoDich.traPhi);
      return res.json({ Message: "Update tài khoản gửi thất bại.", Status: 4 });
    }

  }


  //////////////  Add lịch sử giao dịch  //////////////
  let date_ob = new Date();
  // current date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
  let year = date_ob.getFullYear() ;
    // current minutes
  let minutes = date_ob.getMinutes();
  // Tạo mã giao dịch
  let number =parseInt(year+month+date+ minutes+"")||0;
  let mts = moment().unix() + number ; 
  let maGiaoDich = mts.toString();

  let ngayGioGiaoDich =  moment(date_ob).format("YYYY-MM-DD HH:mm:ss");
  let tienThucNhan =  thongTinGiaoDich.soTien - loaiGiaoDich.phiGiaoDich;

  var data = {
    maGiaoDich:maGiaoDich,
    taiKhoanNguoiNhan:thongTinGiaoDich.soTaiKhoanNhan,
    taiKhoanNguoiGui:thongTinGiaoDich.soTaiKhoanGui,
    soTienChuyen:thongTinGiaoDich.soTien,
    tienThucNhan: tienThucNhan ,
    phiGiaoDich:loaiGiaoDich.phiGiaoDich,
    noiDung:thongTinGiaoDich.noiDung,
    maNganHangNguoiNhan:thongTinGiaoDich.maNganHangGui,
    maNganHangNguoiGui:"LTW",
    loaiGiaoDich:thongTinGiaoDich.loaiGiaoDich,
    ngayGioGiaoDich:ngayGioGiaoDich,
    create_at:ngayGioGiaoDich
};
try{

     await lichsuGiaoDichModel.add(data);

}catch(ex)
{
  ////////// có lỗi phát sinh lúc add lịch sử thì s
  await hoanTienNguoiGui(accountNguoiGui.id,soDuNguoiGui,thongTinGiaoDich.soTien,loaiGiaoDich.phiGiaoDich,thongTinGiaoDich.traPhi);
  await hoanTienNguoiNhan(accountNguoiNhan.id,soDuNguoiNhan,thongTinGiaoDich.soTien,loaiGiaoDich.phiGiaoDich,thongTinGiaoDich.traPhi);
  return res.json({ Message: 'Lỗi hệ thống',Status:4 });
}

  return res.json({ Message: 'Giao dịch thành công',Status:2 });
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
