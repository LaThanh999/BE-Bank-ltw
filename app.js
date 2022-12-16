const express = require('express');
const app = express();
var cors = require('cors');
var morgan = require('morgan');
require('express-async-errors');
require('dotenv').config();
const logger = require('./logger');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

const authMdw = require('./middlewares/auth.mdw');

// app.use('/login', require('./routes/auth.route'));
// app.use('/users', require('./routes/users.route'));
// app.use('/actor', authMdw, require('./routes/actor.route'));
// app.use('/customer', require('./routes/customer.route'));

app.use('/danhSachNguoiNhan', require('./routes/danhSachNguoiNhan.route'));
app.use('/danhSachNguoiNo', require('./routes/danhSachNguoiNo.route'));
app.use('/lichSuGiaoDich', require('./routes/lichSuGiaoDich.route'));
app.use('/loaiGiaoDich', require('./routes/loaiGiaoDich.route'));
app.use('/loaiTaiKhoan', require('./routes/loaiTaiKhoan.route'));
app.use('/nganHangDoiTac', require('./routes/nganHangDoiTac.route'));
app.use('/taiKhoan', require('./routes/taiKhoan.route'));
app.use('/taiKhoanNganHang', require('./routes/taiKhoanNganHang.route'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (err, req, res, next) {
 
  res.status(500).json({
    Message: 'Something broke!',
  });
  logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - URL: ${
      req.originalUrl
    } - Method: ${req.method}`,
  );
});

app.use((req, res, next) => {
  res.status(404).json({
    Message: 'Not Found!',
  });
  logger.error(`404 ||  ${res.statusMessage} - URL: ${req.originalUrl} -  Method: ${req.method}`);
});

// app.get('/', function (req, res) {
//   throw new Error('BROKEN'); // Express will catch this on its own.
// });

// app.use(function (req, res, next) {
//   res.status(404).json({
//     Message: 'Not Found!',
//   });
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`run server http://localhost:${PORT}`);
});
