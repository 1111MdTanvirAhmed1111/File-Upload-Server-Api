const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const secretKey = process.env.SECRET_API_KEY;

  if (!apiKey || apiKey !== secretKey) {
    return res.status(403).json({ message: 'Invalid or missing API Key' });
  }

  next();
};
