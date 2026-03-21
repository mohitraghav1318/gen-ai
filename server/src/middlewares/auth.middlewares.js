const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');

/**
 * @name authUser
 * @desc Middleware to authenticate user based on JWT token in cookies
 * @access Private (requires authentication)
 */


async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const isBlacklisted = await blacklistModel.findOne({ token });
  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: Token is blacklisted' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports = {
  authUser,
};
