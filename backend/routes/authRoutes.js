const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.js');
const multer = require('multer');
const router = express.Router();

// JWT için gizli anahtar
const JWT_SECRET = 'your_jwt_secret_key';

// Multer ayarları
const upload = multer();

// Kullanıcı kaydı için POST isteği
router.post('/register', upload.none(), async (req, res) => {
    const { status, mail, password, phone, name, firma_ad, firma_vergidairesi, firma_verginumarasi, firma_telefon } = req.body;
  
    if (!status || !mail || !password) {
      return res.status(400).json({ status: 'error', message: 'Tüm alanlar gereklidir.' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      if (status === 'musteri') {
        const [user] = await db.promise().query('SELECT * FROM mobil_kullanicilar WHERE kullanici_mail = ?', [mail]);
  
        if (user.length > 0) {
            const existingUser = user[0];
            if (existingUser.kullanici_mail === mail) {
              return res.status(400).json({ status: 'error', text: 'Bu e-posta adresi zaten kayıtlı.' });
            }
            if (existingUser.kullanici_telefon === phone) {
              return res.status(400).json({ status: 'error', text: 'Bu telefon numarası zaten kayıtlı.' });
            }
      }
  
        // Kullanıcı mevcut değilse ekleme işlemi yap
        await db.promise().query('INSERT INTO mobil_kullanicilar (kullanici_ad, kullanici_mail, kullanici_telefon, sifre, kullanici_durum) VALUES (?, ?, ?, ?, 0)', [name, mail, phone, hashedPassword]);
  
        return res.status(200).json({ status: 'success', text: 'Yeni kullanıcı eklendi. Lütfen giriş yapınız.' });
      } else if (status === 'firma') {
        const [user] = await db.promise().query('SELECT * FROM mobil_firmalar WHERE firma_mail = ? OR firma_verginumarasi = ? OR firma_telefon = ?', [mail, firma_verginumarasi, firma_telefon]);
  
        if (user.length > 0) {
          return res.status(400).json({ status: 'error', text: 'Firma bilgileri zaten mevcut.' });
        }
  
        // Firma mevcut değilse ekleme işlemi yap
        await db.promise().query('INSERT INTO mobil_firmalar (firma_ad, firma_mail, firma_telefon, firma_verginumarasi, firma_vergidairesi, firma_sifre, firma_durum) VALUES (?, ?, ?, ?, ?, ?, 0)', [firma_ad, mail, firma_telefon, firma_verginumarasi, firma_vergidairesi, hashedPassword]);
  
        return res.status(200).json({ status: 'success', text: 'Yeni firma eklendi. Lütfen giriş yapınız.' });
      } else {
        return res.status(400).json({ status: 'error', text: 'Geçersiz status değeri.' });
      }
    } catch (error) {
      console.error('Hata:', error);
      return res.status(500).json({ status: 'error', text: 'Sunucu hatası.' });
    }
  });
router.post('/login',upload.none(), async (req, res) => {
    const { mail, password } = req.body;
  console.log(mail,password,"mail ve password");
    if (!mail || !password) {
      return res.status(400).json({ status: 'error', message: 'Tüm alanlar gereklidir.' });
    }

    try {
      // mobil_kullanicilar tablosunda kullanıcıyı ara
      const [users] = await db.promise().query('SELECT * FROM mobil_kullanicilar WHERE kullanici_mail = ?', [mail]);
      const user = users[0];
  
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.sifre);
        if (isPasswordValid) {
          const token = jwt.sign({ id: user.kullanici_id, type: 'musteri',email:user.kullanici_mail }, JWT_SECRET, { expiresIn: '1h' });
          return res.json({
          status_type:"musteri",
            token,
        
          });
        } else {
          return res.status(401).json({ status: 'error', message: 'Şifre yanlış.' });
        }
      }
  
      // mobil_firmalar tablosunda firmayı ara
      const [firms] = await db.promise().query('SELECT * FROM mobil_firmalar WHERE firma_mail = ?', [mail]);
      const firm = firms[0];
  
      if (firm) {
        const isPasswordValid = await bcrypt.compare(password, firm.firma_sifre);
        if (isPasswordValid) {
          const token = jwt.sign({ id: firm.firma_id, type: 'firma',email:firm.firma_mail }, JWT_SECRET, { expiresIn: '1h' });
          return res.json({
            status_type:"firma",
        token
          });
        } else {
          return res.status(401).json({ status: 'error', message: 'Şifre yanlış.' });
        }
      }
  
      return res.status(404).json({ status: 'error', message: 'Kullanıcı veya firma bulunamadı.' });
    } catch (error) {
      console.error('Hata:', error);
      return res.status(500).json({ status: 'error', message: 'Sunucu hatası.' });
    }
  });


module.exports = router; 