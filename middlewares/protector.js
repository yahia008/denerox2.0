const jwt = require('jsonwebtoken');

exports.protector = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new Error('Authorization token is missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error("Not Authorized, no token");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    // Attach user info to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ message: 'Unauthorized access', error: error.message });
  }
};
