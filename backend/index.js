const express = require('express');
const cors = require('cors'); 

const bodyParser = require('body-parser');
const companyRoutes = require('./routes/companyRoutes'); // Router dosyasını içe aktarın
const authRoutes = require('./routes/authRoutes'); // Router dosyasını içe aktarın
const authenticateToken = require('./middleware/authMiddleware');
const teklifRoutes = require('./routes/teklifRoutes');
const notificationRoute = require('./routes/notificationRoute');
const roleControl = require('./routes/roleControl');
const db = require('./config/db');
const app = express();
const port = 3000;

// Body-parser'ı kullan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Şirket router'ını kullan
app.use('/companies', companyRoutes);
app.use('/auth', authRoutes);
app.use('/teklif', teklifRoutes);
app.use('/notification', notificationRoute);
app.use('/roleControl', roleControl);
// session  
//  jwt token 

// Sunucuyu başlat
app.listen(port,"192.168.1.44", () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});