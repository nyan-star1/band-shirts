const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Invalid token
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};

exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.sendStatus(403); // Forbidden if not admin
  }
  next();
};
