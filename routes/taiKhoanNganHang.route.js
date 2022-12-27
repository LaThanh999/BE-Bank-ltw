const express = require('express');

const router = express.Router();
const {
  getAll,
  getById,
  insert,
  edit,
  remove,
  transfer
} = require('../controllers/taiKhoanNganHang.controllers');
const mdwValidate = require('../middlewares/validate.mdw');
const schema = require('../schemas/taiKhoanNganHang.json');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', mdwValidate(schema), insert);
router.delete('/:id', remove);
router.put('/:id', mdwValidate(schema), edit);
router.post('/transfer',transfer);
module.exports = router;
