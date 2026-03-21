const { Router } = require('express');
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user with username, email and password
 * @access Public
 */
authRouter.post('/register', authController.register);

/**
 * @route POST /api/auth/login
 * @desc Login a user with email and password
 * @access Public
 */
authRouter.post('/login', authController.login);

/**
 * @route POST /api/auth/logout
 * @desc Logout the current user by clearing the authentication cookie
 * @access Public
 */
authRouter.get('/logout', authController.logout);

/**
 * @route GET /api/auth/get-me
 * @desc Get the current authenticated user's information
 * @access Private (requires authentication)
 */
authRouter.get('/get-me', authMiddleware.authUser, authController.getMe);

module.exports = authRouter;
