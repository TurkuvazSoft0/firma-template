const express = require('express');
const db = require('../config/db.js');
const router = express.Router();
const { authenticateToken,checkRole }  =  require('../middleware/authMiddleware.js');
// Başvuru eklemek için POST isteği
router.post('/basvuru-ekle',authenticateToken,checkRole(["firma"]) ,async (req, res) => {
    const {id} = req.user; // İstemciden gelen veriler

    // Gerekli alanların kontrolü
    if (!firma_id || !durum) {
        return res.status(400).json({ status: 'error', message: 'Firma ID ve durum alanları gereklidir.' });
    }

    try {
        // Başvuru ekleme işlemi
        const [result] = await db.promise().query('INSERT INTO firma_panel_basvurulari (basvuru_firma_id, basvuru_durum) VALUES (?, 0)', [id]);

        // Başvuru başarıyla eklendiyse
        if (result.affectedRows > 0) {
            return res.status(201).json({ status: 'success', message: 'Başvuru başarıyla eklendi.', basvuru_id: result.insertId });
        } else {
            return res.status(500).json({ status: 'error', message: 'Başvuru eklenirken bir hata oluştu.' });
        }
    } catch (error) {
        console.error('Hata:', error);
        return res.status(500).json({ status: 'error', message: 'Sunucu hatası.' });
    }
});

module.exports  = router;