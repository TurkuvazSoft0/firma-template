const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Bu anahtarı güvenli bir şekilde saklayın

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log("token yok");
    return res.status(401).json({ message: 'Erişim izni yok, token gerekli' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Geçersiz token' });
      console.log("geçersiz token");
    }
    console.log("doğru token");
    req.user = user; // Doğrulanan kullanıcı bilgilerini isteğe ekleyin
    next(); // Bir sonraki middleware veya route handler'a geç
  });
};

module.exports = authenticateToken; 