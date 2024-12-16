const express = require('express');
const cors = require('cors'); 

const bodyParser = require('body-parser');
const companyRoutes = require('./routes/companyRoutes'); // Router dosyasını içe aktarın
const authRoutes = require('./routes/authRoutes'); // Router dosyasını içe aktarın
const authenticateToken = require('./middleware/authMiddleware');
const teklifRoutes = require('./routes/teklifRoutes');
const notificationRoute = require('./routes/notificationRoute');
const roleControl = require('./routes/roleControl');
const applicationRoute = require("./routes/applicationRoute");
const db = require('./config/db');
const app = express();
const port = 3002;

// Body-parser'ı kullan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Şirket router'ını kullan
app.use('/companies', companyRoutes);
app.use("/application",applicationRoute);
app.use('/auth', authRoutes);
app.use('/teklif', teklifRoutes);
app.use('/notification', notificationRoute);
app.use('/roleControl', roleControl);

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});