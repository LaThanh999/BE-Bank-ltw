const express = require('express');

const router = express.Router();
const {
  getAll,
  getById,
  insert,
  edit,
  remove,
} = require('../controllers/lichSuGiaoDich.controllers');
const mdwValidate = require('../middlewares/validate.mdw');
const schema = require('../schemas/lichSuGiaoDich.json');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', mdwValidate(schema), insert);
router.delete('/:id', remove);
router.put('/:id', mdwValidate(schema), edit);

module.exports = router;
