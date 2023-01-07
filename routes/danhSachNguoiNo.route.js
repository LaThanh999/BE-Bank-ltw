const express = require('express');

const router = express.Router();
const {
  getAll,
  getById,
  insert,
  getByNumberCard,
  edit,
  remove,
} = require('../controllers/danhSachNguoiNo.controllers');
const mdwValidate = require('../middlewares/validate.mdw');
const schema = require('../schemas/danhSachNguoiNo.json');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', insert);
router.post('/getByNumberCard', getByNumberCard);
router.delete('/:id', remove);
router.put('/:id', edit);

module.exports = router;
