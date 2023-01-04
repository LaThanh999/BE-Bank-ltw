const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'lvnt999@outlook.com.vn',
    pass: '12344321qQq',
  },
});

var content = '';
content += `
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Bank LTW</a>
  </div>
  <p style="font-size:1.1em">Xin chào bạn</p>
  <p>Vui lòng nhập OTP để xác nhận. Đây là mã OTP của bạn, lưu ý thời gian tồn tại của OTP là 5 phút!</p>
  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">324457</h2>
  <p style="font-size:0.9em;">Cảm ơn Bạn</p>
  <hr style="border:none;border-top:1px solid #eee" />
</div>
</div>
    `;

const getContent = (name, otp) => {
  return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Bank LTW</a>
      </div>
      <p style="font-size:1.1em">Xin chào bạn ${name}</p>
      <p>Vui lòng nhập OTP để xác nhận. Đây là mã OTP của bạn, lưu ý thời gian tồn tại của OTP là 5 phút!</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Cảm ơn Bạn</p>
      <hr style="border:none;border-top:1px solid #eee" />
    </div>
    </div>
        `;
};

const getContentPassword = (name, password) => {
  return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Bank LTW</a>
      </div>
      <p style="font-size:1.1em">Xin chào bạn ${name}</p>
      <p> Đây là mật khẩu đăng nhập của bạn. Vui lòng đăng nhập vào internet banking để đổi mật khẩu!</p>
      <a href="https://fe-bank-ltw.vercel.app/login">Đăng nhập</a>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${password}</h2>
      <p style="font-size:0.9em;">Cảm ơn Bạn</p>
      <hr style="border:none;border-top:1px solid #eee" />
    </div>
    </div>
        `;
};

exports.sendMail = (email, name, otp) => {
  transporter.sendMail(
    {
      from: '"Bank LTW" <lvnt999@outlook.com.vn>',
      to: email,
      subject: 'Bank LTW',
      text: '',
      html: getContent(name, otp),
    },
    function (err, info) {
      if (err) {
        console.log(err);
      }
    },
  );
};

exports.sendMailPassWord = (email, name, password) => {
  transporter.sendMail(
    {
      from: '"Bank LTW" <lvnt999@outlook.com.vn>',
      to: email,
      subject: 'Bank LTW',
      text: '',
      html: getContentPassword(name, password),
    },
    function (err) {
      if (err) {
        console.log(err);
      }
    },
  );
};
