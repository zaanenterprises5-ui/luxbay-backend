const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = 'mySuperSecretKey123!@#';

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'You are not authorized', message: 'No authorization header' });
    }

    // Extract token (handle both "Bearer <token>" and just "<token>")
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    if (!token) {
      return res.status(401).json({ error: 'You are not authorized', message: 'Token missing' });
    }

    // Verify token directly
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        console.error('JWT Verify Error:', err.message);
        return res.status(401).json({ 
          error: 'You are not authorized', 
          message: err.message === 'jwt malformed' ? 'Session expired or invalid. Please logout and login again.' : err.message 
        });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'You are not authorized', message: 'User not found' });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Auth Middleware Exception:', error);
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

module.exports = auth;
