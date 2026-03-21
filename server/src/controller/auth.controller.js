const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');

/**
 * @name register
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */

async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const isUsernameTaken = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUsernameTaken) {
    return res
      .status(400)
      .json({ message: 'Username or email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // TODO: Hash the password before saving

  const newUser = new userModel({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );

  res.cookie('token', token);

  res.status(201).json({
    message: 'User registerd succesfully',
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
}

/**
 * @name login
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */

async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );
  res.cookie('token', token);

  res.status(200).json({
    message: 'User logged in succesfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name logout
 * @desc Logout the current user by clearing the authentication cookie
 * @route GET /api/auth/logout
 * @access Public
 */

async function logout(req, res) {
  const token = req.cookies.token;

  if (token) {
    await blacklistModel.create({
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set expiration time to 1 day
    });
  }

  res.clearCookie('token');
  res.status(200).json({ message: 'User logged out successfully' });
}

/**
 * @name getMe
 * @desc Get the current authenticated user's information
 * @route GET /api/auth/get-me
 * @access Private (requires authentication)
 */

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({
    message: 'User information retrieved successfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = {
  register,
  login,
  logout,
  getMe,
};
