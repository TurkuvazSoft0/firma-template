const mysql = require('mysql2');

// MySQL bağlantısını oluştur
const connection = mysql.createConnection({
  host: 'cp.hurbilisim.com',
  user: 'mobileapp_uygulamakullanici', // Veritabanı kullanıcı adınızı buraya yazın
  password: 'uygulama4321*', // Veritabanı şifrenizi buraya yazın
  database: 'mobileapp_uygulama',// Bağlanmak istediğiniz veritabanı adını buraya yazın
  charset: 'utf8mb4' // Karakter setini UTF-8 olarak ayarlayın

});

// Bağlantıyı kontrol et
connection.connect((err) => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu:', err.stack);
    return;
  }
  console.log('Veritabanına başarıyla bağlanıldı.');
});

module.exports = connection;
