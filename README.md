# ✨ HSMart - Perlengkapan Produktivitas Mahasiswa

HSMart adalah aplikasi e-commerce (React SPA) yang mensimulasikan toko **perlengkapan produktivitas untuk mahasiswa & pekerja muda**. Di dalamnya ada katalog laptop kerja ringan, headphone noise cancelling, tas ransel laptop, desk set ergonomis, starter kit konten kreator, dan satu produk digital berupa template Notion planner.

**Dibuat oleh:** Haikal Saputra Mamonto  
**NIM:** 231011402017

## ✨ Fitur Utama

- ✅ Halaman beranda dengan hero section yang menjelaskan fokus bisnis (produktivitias mahasiswa/pekerja muda)
- ✅ Katalog produk: elektronik, aksesoris, kreatif, dan produk digital (template Notion)
- ✅ Detail produk + stok + kategori yang relevan dengan tema produktivitas
- ✅ Keranjang & checkout yang menyimpan data di `localStorage` (tanpa backend)
- ✅ Auth (register/login) dengan akun admin dan customer, plus halaman admin untuk kelola produk & pesanan
- ✅ Routing terproteksi & state global `AuthContext`

> Implementasi saat ini menggunakan **mock API berbasis `localStorage`** (`client/src/mockApi.js`) sehingga seluruh alur bisnis (register, login, cart, orders, admin) dapat didemokan tanpa server terpisah.

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

