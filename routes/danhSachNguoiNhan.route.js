const express = require('express');

const router = express.Router();
const {
  getAll,
  getByAccountNumber,
  getByAccountNumberUser,
  insert,
  edit,
  remove,
} = require('../controllers/danhSachNguoiNhan.controllers');
const mdwValidate = require('../middlewares/validate.mdw');
const schema = require('../schemas/danhSachNguoiNhan.json');

router.get('/', getAll);
router.get('/getByAccountNumber/:accountNumber', getByAccountNumber);
router.post('/getByAccountNumberUser', getByAccountNumberUser);
router.post('/', mdwValidate(schema), insert);
router.delete('/deleteByID/:id', remove);
router.put('/Update/:id', mdwValidate(schema), edit);

module.exports = router;
