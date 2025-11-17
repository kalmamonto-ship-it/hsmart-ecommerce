# ✨ HSMart - Frontend SPA

HSMart sekarang difokuskan sebagai aplikasi React single-page (SPA) yang bisa dikoneksikan ke API manapun melalui environment variable `REACT_APP_API_URL`. Semua file backend lama sudah dihapus supaya repo ini ringan dan siap di-deploy cepat via Vercel.

**Dibuat oleh:** Haikal Saputra Mamonto  
**NIM:** 231011402017

## ✨ Fitur

- ✅ Halaman beranda dengan hero section dan highlight produk
- ✅ Browse katalog lengkap + detail produk
- ✅ Keranjang dan checkout (mengirim request ke API yang kamu tentukan)
- ✅ Auth + halaman admin (bergantung pada API yang tersedia)
- ✅ Routing terproteksi & state global AuthContext

> Karena backend tidak lagi disertakan, pastikan Anda memiliki API yang kompatibel (atau mock server sendiri) untuk menangani autentikasi, produk, cart, dan orders.

## 🧱 Teknologi

- React 18 + React Router DOM
- Context API untuk auth & cart state
- Axios untuk komunikasi API
- CSS modern (gradient, glassmorphism, responsive layout)

## 🚀 Instalasi & Development

1. Clone / download repo ini.
2. Install dependency frontend:
   ```bash
   cd client
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm start
   ```
4. Buka `http://localhost:3000`.

### Konfigurasi API

Atur base URL API melalui salah satu cara berikut:

- `.env` di folder `client`:
  ```
  REACT_APP_API_URL=https://api-kamu.com
  ```
- Atau edit `client/src/config.js` untuk memberi default URL lain.

Tanpa API yang valid, request login, cart, produk, dst akan gagal dan menampilkan error di console.

## 🗂️ Struktur Project

```
ecommerce-digital-entrepreneurship/
├── client/          # React app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── start.bat        # Shortcut untuk npm run dev (Windows)
├── start-clean.bat  # Versi yang membersihkan port 3000 dulu
├── package.json     # Script helper (dev/client/install-all)
└── README.md
```

## 🌐 Deployment

- Paling cepat deploy ke **Vercel**. Ikuti panduan di `CARA_DEPLOY.md` atau `DEPLOYMENT.md`.
- GitHub Actions (`.github/workflows/deploy.yml`) sudah siap untuk auto-deploy frontend ke Vercel kalau kamu isi secret `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
- Jangan lupa set environment variable `REACT_APP_API_URL` di dashboard Vercel agar aplikasi tahu URL backend kamu.

## 🧪 Testing Manual

1. Pastikan API yang kamu pakai bisa diakses (opsional: cek `/api/health` atau `/api/products`).
2. Jalankan app di localhost atau URL Vercel.
3. Tes alur utama: register/login, tambah produk ke keranjang, checkout, dan halaman admin (jika API mendukung).

## 🛠 Troubleshooting

- **Error network / CORS:** Pastikan `REACT_APP_API_URL` benar dan API mengizinkan origin domain kamu.
- **Halaman blank saat build:** Jalankan `npm run build` di folder `client` untuk melihat error compile.
- **Port 3000 dipakai:** Gunakan `start-clean.bat` atau ganti port via `set PORT=3001 && npm start`.

## Lisensi

Project ini dibuat untuk kebutuhan tugas akademik dan dapat dimodifikasi sesuai kebutuhan.

---

Selamat memakai HSMart versi frontend-only! 🛒

