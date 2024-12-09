const express = require("express");
const db = require('../config/db.js');

const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

// Yeni rota ekleme
router.get('/', authenticateToken , (req, res) => {
    try {
    // Burdaki Asıl Amacım Kullanıcının Rolünü Almaktır.    
        const { type } = req.user;
    
   
    
        // Sunucudan Dönen Cevap
        res.json({
    
          type,     // Kullanıcı rolü
        });
        // Eğer Bir Hata Oluşursa
      } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
      }
});







module.exports = router;