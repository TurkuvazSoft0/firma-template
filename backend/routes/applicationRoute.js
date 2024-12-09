const express = require('express');
const db = require('../config/db.js');
const router = express.Router();
const multer = require("multer")
const { authenticateToken,checkRole }  =  require('../middleware/authMiddleware.js');
// Başvuru eklemek için POST isteği
const upload = multer();
router.get('/firma-basvuru-ekle',authenticateToken,upload.none(), checkRole(["firma"]), (req, res) => {
    const user = req.user; // Token'dan gelen bilgiler
    console.log("Deneme");
    const basvuru_firma_id = user.id; // Örneğin, firma ID'si token'dan gelir
    const { basvuru_mesaj } = req.query;
    console.log(basvuru_mesaj);
    if (!basvuru_mesaj) {
    console.log("Başvuru Mesajı Gereklidir");
        return res.status(400).json({ message: "Başvuru mesajı gerekli" });
    }
    // Aynı ID ile başvuru kontrolü
    const checkQuery = "SELECT * FROM firma_panel_basvurulari WHERE basvuru_firma_id = ?";
    db.query(checkQuery, [basvuru_firma_id], (err, results) => {
        if (err) {
            console.error("Veritabanı hatası:", err);
            return res.status(500).json({ message: "Sunucu hatası" });
        }

        if (results.length > 0) {
            // Eğer kayıt varsa işlem yapılmaz
            return res.status(409).json({ message: "Bu firma için zaten bir başvuru mevcut" });
        }

        // Veritabanına başvuru kaydı ekleme
        const insertQuery = `
            INSERT INTO firma_panel_basvurulari (basvuru_firma_id, basvuru_durum, basvuru_mesaj)
            VALUES (?, 0, ?)
        `;
        db.query(insertQuery, [basvuru_firma_id, basvuru_mesaj], (err, result) => {
            if (err) {
                console.error("Veritabanı hatası:", err);
                return res.status(500).json({ message: "Sunucu hatası" });
            }

            console.log("Başvuru başarıyla eklendi:", result);
            res.status(200).json({ message: "Başvuru başarıyla eklendi"});
        });
    });
});


module.exports  = router;