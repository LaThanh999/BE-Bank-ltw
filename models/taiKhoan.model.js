const db = require('../utils/db');
const _ = require('lodash');
const constant = require('../constants/common');

module.exports = {
  getAll() {
    return db('taiKhoan');
  },

  async getFindById(id) {
    const result = await db('taiKhoan').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },

  async getFindByNumberCard(numberCard) {
    const result = await db('taiKhoan').where({ maTaiKhoan: numberCard });
    if (!result) {
      return null;
    }
    return result[0];
  },

  async getFindByNumberCardWithMoney(numberCard) {
    const result = await db('taiKhoan')
      .join('taiKhoanNganHang', 'taiKhoan.maTaiKhoan', 'taiKhoanNganHang.maTaiKhoan')
      .select('taiKhoan.*', 'taiKhoanNganHang.soDu')
      .where('taiKhoan.maTaiKhoan', numberCard);
    if (!result) {
      return null;
    }
    return result[0];
  },

  async getFindByNumberCardOrEmailPhone(inputSearch) {
    const result = await db('taiKhoan')
      .join('taiKhoanNganHang', 'taiKhoan.maTaiKhoan', 'taiKhoanNganHang.maTaiKhoan')
      .select('taiKhoan.*', 'taiKhoanNganHang.soDu')
      .where('taiKhoan.maTaiKhoan', inputSearch)
      .orWhere('taiKhoan.email', inputSearch)
      .orWhere('taiKhoan.sdt', inputSearch)
      .orWhere('taiKhoan.taiKhoan', inputSearch);
    if (!result) {
      return null;
    }
    return result[0];
  },

  async getFindByNumberCardAndBankId(numberCard, bankId) {
    const result = await db('taiKhoan').where({ maTaiKhoan: numberCard, maNganHang: bankId });
    if (!result) {
      return null;
    }
    return result[0];
  },

  async getWithUsernameOrEmail(value) {
    const result = await db('taiKhoan')
      .where({ taiKhoan: value })
      .orWhere({ email: value })
      .orWhere({ maTaiKhoan: value })
      .orWhere({ sdt: value });
    if (_.isEmpty(result)) {
      return null;
    }
    return result[0];
  },

  remove(id) {
    return db('taiKhoan').where('id', id).del();
  },

  add(user) {
    return db('taiKhoan').insert(user);
  },
  update(id, user) {
    return db('taiKhoan').where('id', id).update(user);
  },
  async getNumberMoneyWithId(value) {
    console.log('value', value);
    const result = await db('taiKhoan')
      .join('taiKhoanNganHang', 'taiKhoan.maTaiKhoan', 'taiKhoanNganHang.maTaiKhoan')
      .select('taiKhoan.hoTen', 'taiKhoan.maTaiKhoan', 'taiKhoanNganHang.soDu')
      .where('taiKhoan.id', value);
    console.log('result', result);
    if (_.isEmpty(result)) {
      return null;
    }
    return result[0];
  },

  async getAllCustomer() {
    const result = await db('taiKhoan')
      .join('taiKhoanNganHang', 'taiKhoan.maTaiKhoan', 'taiKhoanNganHang.maTaiKhoan')
      .select('taiKhoan.*', 'taiKhoanNganHang.soDu')
      .where('taiKhoan.loaiTaiKhoan', 2);
    if (result?.length < 1) {
      return null;
    }
    return result;
  },

  async isValidRefreshToken(id, refreshToken) {
    const result = await db('taiKhoan').where({ id: id }).andWhere({ refreshToken: refreshToken });
    if (_.isEmpty(result)) {
      return null;
    }
    return result[0];
  },

  async addCustomer(values) {
    const { maTaiKhoan, create_at } = values;
    await db.transaction(async (trx) => {
      await trx('taiKhoan').insert(values);

      await trx('taiKhoanNganHang').insert({
        maTaiKhoan: maTaiKhoan,
        soDu: 0,
        create_at: create_at,
        maNganHang: constant.ID_BANK_LTW,
      });
    });
  },

  async addMoneyCustomer(numberCard, valueAccount, valueHistory) {
    await db.transaction(async (trx) => {
      await trx('taiKhoanNganHang').where('maTaiKhoan', numberCard).update(valueAccount);
      await trx('lichSuGiaoDich').insert(valueHistory);
    });
  },
};
