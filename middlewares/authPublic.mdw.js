const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.headers.authorization) {
    const { publicKey } = req.body;
    const token = req.headers.authorization.split(' ').pop();
    if (token) {
      try {
        const check = jwt.verify(token, publicKey, { algorithm: 'RS256' });
        if (check) {
          next();
        } else {
          return res.status(401).json({ Message: 'Error' });
        }
      } catch (err) {
        return res.status(401).json({ Message: 'Error' });
      }
    }
  } else {
    return res.status(401).json({ Message: 'Error' });
  }
};
