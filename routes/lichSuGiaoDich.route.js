const express = require('express');

const router = express.Router();
const {
  getAll,
  getByAccountNumber,
  insert,
  edit,
  getAllAnotherBank,
  remove,
} = require('../controllers/lichSuGiaoDich.controllers');
const mdwValidate = require('../middlewares/validate.mdw');
const schema = require('../schemas/lichSuGiaoDich.json');

router.get('/', getAll);
router.get('/getAllAnotherBank', getAllAnotherBank);
router.get('/getByAccountNumber/:accountNumber/:type', getByAccountNumber);
router.get('/getByAccountNumber/:accountNumber', getByAccountNumber);
router.post('/', mdwValidate(schema), insert);
router.delete('/:id', remove);
router.put('/:id', mdwValidate(schema), edit);

module.exports = router;
