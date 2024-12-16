const express = require("express");
const router = express.Router();
const db = require('../config/db.js');
const {authenticateToken} = require("../middleware/authMiddleware.js")
router.get("/company-get", authenticateToken, (req, res) => {
  const { id  } = req.user;

  if (!id) {
    return res.status(400).json({ error: 'Kullanıcı kimliği bulunamadı.' });
  }

  const sql = `
    SELECT 
      s.sirket_id,
      s.sirket_ad,
      s.sirket_durum,
      s.sirket_veriler,
      s.sirket_firma_id,
      IFNULL(f.followers_status, 0) AS takip_durumu
    FROM sirketler_new s
    LEFT JOIN followers f 
      ON s.sirket_firma_id = f.followers_company_id AND f.followers_user_id = ?
    WHERE s.sirket_durum = 1
    ORDER BY s.sirket_ad ASC
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Veritabanı sorgusu sırasında hata oluştu.' });
    }

    const rows = results.map(row => {
      row.sirket_veriler = JSON.parse(row.sirket_veriler);
      return row;
    });

    res.status(200).json(rows);
  });
});

module.exports = router;