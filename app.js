const express = require('express');
const app = express();
var cors = require('cors');
var morgan = require('morgan');
require('express-async-errors');
require('dotenv').config();
const http = require('http').Server(app);
const logger = require('./logger');

var io = require('socket.io')(http);

io.on('connection', function (socket) {
  socket.on('sendDataClient', function (data) {
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    io.emit('sendDataServer', 'updated'); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  });

  socket.on('msg', function (data) {
    //Send message to everyone
    io.sockets.emit('newmsg', data);
  });
});

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
app.use('/dangKy', require('./routes/users.route'));
app.use('/danhSachNguoiNhan', authMdw, require('./routes/danhSachNguoiNhan.route'));
app.use('/danhSachNguoiNo', authMdw, require('./routes/danhSachNguoiNo.route'));
app.use('/lichSuGiaoDich', authMdw, require('./routes/lichSuGiaoDich.route'));
app.use('/loaiGiaoDich', authMdw, require('./routes/loaiGiaoDich.route'));
app.use('/loaiTaiKhoan', authMdw, require('./routes/loaiTaiKhoan.route'));
app.use('/nganHangDoiTac', authMdw, require('./routes/nganHangDoiTac.route'));
app.use('/taiKhoan', authMdw, require('./routes/taiKhoan.route'));
app.use('/taiKhoanNganHang', authMdw, require('./routes/taiKhoanNganHang.route'));
app.use('/notifications', authMdw, require('./routes/notifications.route'));
app.use('/dangNhap', require('./routes/dangNhap.route'));
app.use('/sendOTP', require('./routes/otpTransfer.route'));
app.use('/connectBank', require('./routes/bankConnect.route'));
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
  logger.error(`404 ||  ${res.statusMessage} - URL: ${req.originalUrl} -  Method: ${req.params}`);
});

// app.get('/', function (req, res) {
//   throw new Error('BROKEN'); // Express will catch this on its own.
// });

// app.use(function (req, res, next) {
//   res.status(404).json({
//     Message: 'Not Found!',
//   });
// });

const PORT = process.env.PORT || 3008;

http.listen(PORT, () => {
  console.log(`run server http://localhost:${PORT}`);
});
