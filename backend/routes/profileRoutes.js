const express = require("express");
const router = express.Router();
const db = require('../config/db.js');
const {authenticateToken} = require("../middleware/authMiddleware.js")
router.get("/firma-get/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
  
    const sql = `
      SELECT 
        firma_id,
        firma_ad,
        firma_mail,
        firma_telefon,
        firma_vergilevhasi,
        firma_logo,
        firma_verginumarasi,
        firma_vergidairesi,
        firma_durum
      FROM 
        mobil_firmalar
      WHERE firma_id = ?;
    `;
  
    db.query(sql, [id], (err, results) => {
      if (err) {
        res.status(500).json({ error: "Veritabanı sorgusu sırasında hata oluştu" });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: "Firma bulunamadı" });
        return;
      }
  
      // Eğer gerekirse başka işlemler yapabilirsiniz
      const firma = results[0];
  
      res.json(firma);
    });
  });
  


module.exports = router;