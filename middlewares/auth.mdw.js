const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.headers.authorization) {
    const accessToken = req.headers.authorization.split(' ').pop();
    if (accessToken) {
      try {
        req.accessTokenPayload = jwt.verify(accessToken, process.env.SECRET_KEY);
        next();
      } catch (err) {
        return res.status(401).json({ Message: 'Invalid accessToken' });
      }
    }
  } else {
    return res.status(401).json({ Message: "Can't not find accessToken" });
  }
};
