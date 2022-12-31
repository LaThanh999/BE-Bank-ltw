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
  getNumberMoney,
} = require('../controllers/taiKhoan.controllers');
const mdwValidate = require('../middlewares/validate.mdw');
const schema = require('../schemas/taiKhoan.json');
const { login } = require('../controllers/dangNhap.controllers');

router.get('/getAll', getAll);
router.get('/:id', getById);
router.get('/getWithNumberCard/:numberCard', getByNumberCard);
router.post('/getWithNumberCardAndBankId', getByNumberCardAndBankId);
router.get('/getMoney/:id', getNumberMoney);
router.post('/', mdwValidate(schema), insert);
router.delete('/:id', remove);
router.put('/:id', mdwValidate(schema), edit);
router.post('/', mdwValidate(schema), login);

module.exports = router;
