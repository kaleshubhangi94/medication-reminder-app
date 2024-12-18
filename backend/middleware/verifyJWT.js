const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Extract token from Authorization header
console.log("token--==",token);

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token
    req.user = decoded;  // Attach user info from decoded token
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = verifyJWT;
