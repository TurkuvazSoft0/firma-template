const express = require("express");
const db = require('../config/db.js');

const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer();

// Yeni rota ekleme
router.post('/toplu-mail-gonder', upload.none(),authenticateToken, (req, res) => {
 
  const { baslik, mesaj, mails } = req.body;
  const mail_durum = 2;

  // req.user'dan mail_adresi alınır
  const mail_adresi = req.user.email;

  const kullaniciTeklifQuery = 'INSERT INTO kullanici_teklif_detay(mail_adresi) VALUES (?)';
  db.query(kullaniciTeklifQuery, [mail_adresi], (err, result) => {
    if (err) {
      console.error('Kullanıcı teklif ekleme hatası:', err);
      return res.status(500).send('Veritabanı hatası');
    }

    const mailerQuery = 'INSERT INTO mailer(firma_mail, firma_baslik, firma_mesaj, mail_durum, mail_adresi) VALUES (?, ?, ?, ?, ?)';
    const mailsArray = JSON.parse(mails);

    mailsArray.forEach((mailFirma) => {
      db.query(mailerQuery, [mailFirma, baslik, mesaj, mail_durum, mail_adresi], (err, result) => {
        if (err) {
          console.error(`Kayıt başarısız: ${mailFirma} - ${err}`);
        } else {
          console.log(`Kayıt başarılı: ${mailFirma}`);
        }
      });
    });

    const transporter = nodemailer.createTransport({
      host: 'mail.ignotus.com.tr',
      port: 587,
      secure: false,
      auth: {
        user: 'selim@ignotus.com.tr',
        pass: 'k5ZT8Ou7=?9-'
      }
    });

    const mailOptions = {
      from: '"İgnotus" <selim@ignotus.com.tr>',
      to: mailsArray.join(', '),
      subject: 'Toplu Mail Başlığı',
      html: `<h1>${baslik}</h1><p>${mesaj.replace(/\n/g, '<br>')}</p>`,
      text: mesaj
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Mail gönderimi başarısız oldu:', error);
        return res.status(500).send('Mail gönderimi başarısız oldu');
      }
      console.log('Mail başarıyla gönderildi:', info.response);
      res.send('Mail başarıyla gönderildi');
    });
  });
});


router.post('/mail-al', authenticateToken, (req, res) => {
    const mail = req.user.email; // JWT'den gelen mail adresi
    console.log(mail, "Kullanıcı maili");

    // Veritabanı sorgusu
    db.query(
        "SELECT * FROM mailer WHERE firma_mail = ? AND mail_durum = 2",
        [mail],
        (err, results) => {
            if (err) {
                console.error("Veritabanı hatası:", err);
                return res.status(500).json({ message: "Sunucu hatası" });
            }

            // Sorgu sonucunu kontrol et
            console.log("Sorgu sonucu:", results);

            if (!results || results.length === 0) {
                return res.status(404).json({ message: "Kayıt bulunamadı" });
            }

            // Sonuçları döndür
            res.status(200).json(results);
        }
    );
});



router.post('/teklifDurumGuncelle',upload.none(),authenticateToken, async (req, res) => {

  

    const { mail_id, mail_durum } = req.body;
    console.log(mail_id, mail_durum, req.user.email, "maiwedwedwel_id, mail_durum, req.user.email");
  
    try {
      // Veritabanı sorgusunu çalıştır
      const [result] = await db.execute("UPDATE mailer SET mail_durum = ? WHERE mail_id = ? AND firma_mail = ? ", [mail_durum, parseInt(mail_id), req.user.email]);
  
      // Sorgunun başarılı olup olmadığını kontrol et
      if (result.affectedRows > 0) {
        res.send("Mail durumu başarıyla güncellendi.");
      } else {
        res.send("Güncelleme sırasında bir hata oluştu veya güncelleme yapılacak kayıt bulunamadı.");
      }
    } catch (error) {
      console.error("Veritabanı hatası:", error);
      res.status(500).send("Sunucu hatası");
    }
});

router.post('/kullanici-mail-getir', authenticateToken, (req, res) => {
    const mail = req.user.email; // JWT'den gelen mail adresi

    // Veritabanı sorgusu
    db.query(
        "SELECT * FROM mailer WHERE mail_adresi = ?",
        [mail],
        (err, results) => {
            if (err) {
                console.error("Veritabanı hatası:", err);
                return res.status(500).json({ message: "Sunucu hatası" });
            }

            // Sorgu sonucunu kontrol et
            console.log("Sorgu sonucu:", results);

            if (!results || results.length === 0) {
                return res.status(404).json({ message: "Kayıt bulunamadı" });
            }

            // Sonuçları döndür
            res.status(200).json(results);
        }
    );
});

module.exports = router;