const express = require('express');

const router = express.Router();
const {
  getAll,
  getById,
  insert,
  edit,
  remove,
  getByNumberCard,
  getByNumberCardAndBankId,
  getByNumberCardWithMoney,
  getByNumberCardOrEmailPhone,
  getNumberMoney,
  getAllCustomer,
  addCustomer,
  addMoneyCustomer,
} = require('../controllers/taiKhoan.controllers');
const mdwValidate = require('../middlewares/validate.mdw');
const schema = require('../schemas/taiKhoan.json');
const { login } = require('../controllers/dangNhap.controllers');

router.get('/getAll', getAll);
router.get('/getAllCustomer', getAllCustomer);
router.get('/:id', getById);
router.get('/getWithNumberCard/:numberCard', getByNumberCard);
router.get('/getWithNumberCardWithMoney/:numberCard', getByNumberCardWithMoney);
router.post('/getWithNumberCardOrEmailPhone', getByNumberCardOrEmailPhone);
router.post('/getWithNumberCardAndBankId', getByNumberCardAndBankId);
router.post('/addCustomer', addCustomer);
router.post('/addMoneyCustomer', addMoneyCustomer);
router.get('/getMoney/:id', getNumberMoney);
router.post('/', mdwValidate(schema), insert);
router.delete('/:id', remove);
router.put('/:id', mdwValidate(schema), edit);
router.post('/', mdwValidate(schema), login);

module.exports = router;
