const express = require("express");
const router = express.Router();
const db = require('../config/db.js');
const authenticateToken = require('../middleware/authMiddleware');
router.get("/company-get",authenticateToken, (req, res) => {
  const sql = "SELECT * FROM sirketler_new WHERE sirket_durum = 1 ORDER BY sirket_ad ASC";

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Veritabanı sorgusu sırasında hata oluştu' });
      return;
    }

    const rows = results.map(row => {
      row.sirket_veriler = JSON.parse(row.sirket_veriler);
      return row;
    });

    res.json(rows);
  });
});

module.exports = router;