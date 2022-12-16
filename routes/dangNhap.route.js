const express = require('express');
const router = express.Router();

const { login, refreshToken } = require('../controllers/dangNhap.controllers');
const schema = require('../schemas/dangNhap.json');
const mdwValidate = require('../middlewares/validate.mdw');

router.post('/', mdwValidate(schema), login);
router.post('/refreshToken', refreshToken);

module.exports = router;
