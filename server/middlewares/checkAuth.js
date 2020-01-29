const jwt = require('jsonwebtoken');
/* eslint-disable */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, 'secret');
    req.userData = decode;
    next();
  } catch {
    return res.status(401).json({
      message: 'Auth Failed ',
    });
  }
};
