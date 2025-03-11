import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// Inisialisasi middleware CORS
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Metode yang diizinkan
  origin: '*', // Izinkan hanya akses dari localhost:3001
  credentials: true, // Untuk mengizinkan pengiriman cookies dan credentials
});

// Fungsi untuk menjalankan middleware CORS
function runCors(req:NextApiRequest, res:NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve();
    });
  });
}

// Middleware untuk API dan Halaman
export async function Middleware(req: NextApiRequest, res: NextApiResponse) {

        return await runCors(req, res);
   
}