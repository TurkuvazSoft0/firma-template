const express = require("express");
const router = express.Router();
const db = require('../config/db.js');
const {authenticateToken} = require("../middleware/authMiddleware.js")
router.post("/followers-add", authenticateToken, (req, res) => {
    const { followers_company_id } = req.body;
    const { id } = req.user;
  
    if (!followers_company_id || !id) {
      return res.status(400).json({ error: 'Eksik bilgiler: followers_company_id ve followers_user_id gerekli' });
    }
  
    // İlk olarak mevcut bir kayıt olup olmadığını kontrol et
    const checkSql = "SELECT * FROM followers WHERE followers_company_id = ? AND followers_user_id = ?";
    
    db.query(checkSql, [followers_company_id, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Veritabanı sorgusu sırasında hata oluştu' });
      }
  
      if (results.length > 0) {
        // Eğer kayıt varsa, followers_status değerini tersine çevir
        const currentStatus = results[0].followers_status;
        const newStatus = currentStatus === 1 ? 0 : 1;
  
        const updateSql = "UPDATE followers SET followers_status = ? WHERE followers_company_id = ? AND followers_user_id = ?";
        db.query(updateSql, [newStatus, followers_company_id, id], (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ error: 'Veritabanı güncelleme sırasında hata oluştu' });
          }
  
          return res.status(200).json({
            message: `Takip durumu güncellendi. Yeni durum: ${newStatus === 1 ? 'Takip Ediliyor' : 'Takip Edilmiyor'}`,
          });
        });
      } else {
        // Eğer kayıt yoksa, yeni bir kayıt ekle
        const insertSql = "INSERT INTO followers(followers_company_id, followers_user_id, followers_status) VALUES (?, ?, 1)";
        db.query(insertSql, [followers_company_id, id], (insertErr, insertResults) => {
          if (insertErr) {
            return res.status(500).json({ error: 'Veritabanı ekleme sırasında hata oluştu' });
          }
  
          return res.status(200).json({
            message: "Firmayı Takip Etmeye Başladınız",
            insertedId: insertResults.insertId,
          });
        });
      }
    });
  });
  