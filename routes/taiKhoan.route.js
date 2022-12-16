const express = require('express');

const router = express.Router();
const { getAll, getById, insert, edit, remove } = require('../controllers/taiKhoan.controllers');
const mdwValidate = require('../middlewares/validate.mdw');
const schema = require('../schemas/taiKhoan.json');
const { login } = require('../controllers/dangNhap.controllers');

router.get('/getAll', getAll);
router.get('/:id', getById);
router.post('/', mdwValidate(schema), insert);
router.delete('/:id', remove);
router.put('/:id', mdwValidate(schema), edit);
router.post('/', mdwValidate(schema), login);

module.exports = router;
