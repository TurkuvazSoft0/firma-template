import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// CORS ayarları
const corsOptions = {
  origin: '*', // Tüm kaynaklara izin ver
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// JSON verilerini işlemek için middleware
app.use(express.json());

// Basit bir GET endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Merhaba, TypeScript ile Express!');
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu şu adreste çalışıyor: http://localhost:${port}`);
}); 