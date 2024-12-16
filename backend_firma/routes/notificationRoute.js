const db = require('../config/db.js');
const authenticateToken = require('../middleware/authMiddleware');
const express = require("express");
const router = express.Router();

// Veritabanı bağlantısını test et
const testConnection = async () => {
  try {
    const [result] = await db.execute('SELECT 1');
    console.log('Veritabanı bağlantısı başarılı:', result);
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error);
  }
};

// Uygulama başlatıldığında bağlantıyı test et
testConnection();



module.exports = router;