const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('Token no proporcionado');
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send('Fallo en la autenticación del token');
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;