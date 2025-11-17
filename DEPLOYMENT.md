# 🚀 Panduan Deployment (Frontend Only)

Panduan terbaru untuk mendeploy HSMart versi frontend-only ke Vercel. Backend tidak lagi menjadi bagian repo ini, jadi kamu bebas memakai API eksternal mana pun (atau mock server sendiri).

## 📋 Prerequisites

- Akun GitHub
- Akun Vercel
- URL API yang kompatibel (opsional, tapi diperlukan jika ingin semua fitur berjalan)

---

## 📦 Step 1 – Siapkan Repository

1. Pastikan project ini sudah berada di GitHub.
2. Jika belum, jalankan:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/hsmart-ecommerce.git
   git push -u origin main
   ```

---

## 🌐 Step 2 – Deploy Manual ke Vercel

1. Login ke https://vercel.com dan pilih **Add New → Project**.
2. Import repo GitHub kamu.
3. Konfigurasi:
   - **Framework Preset:** Create React App (auto terdeteksi)
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Tambahkan environment variable (opsional tapi direkomendasikan):
   - Name: `REACT_APP_API_URL`
   - Value: `https://api-kamu.com` (atau URL API apa pun yang ingin dipakai)
5. Klik **Deploy**. Setelah selesai, Vercel akan memberi URL publik (contoh: `https://hsmart.vercel.app`).

> Tanpa API yang valid, request login/cart akan gagal. Pastikan API kamu mengizinkan origin dari domain Vercel tersebut.

---

## 🤖 Step 3 – Auto Deploy via GitHub Actions

Repo ini sudah punya workflow `.github/workflows/deploy.yml`. Langkahnya:

1. Di GitHub repo → `Settings → Secrets and variables → Actions`.
2. Tambahkan tiga secrets:
   | Nama | Nilai |
   | --- | --- |
   | `VERCEL_TOKEN` | Token pribadi Vercel (`Account Settings → Tokens`). |
   | `VERCEL_ORG_ID` | ID organisasi/team (lihat `Project → Settings → General`). |
   | `VERCEL_PROJECT_ID` | ID project frontend (halaman yang sama). |
3. Set juga `REACT_APP_API_URL` di dashboard Vercel (Project → Settings → Environment Variables).
4. Setiap push ke `main` akan otomatis:
   - Checkout repo
   - `npm ci` + `npm run build` di folder `client`
   - Deploy ke Vercel (production)

Kalau workflow gagal, cek tab **Actions** untuk detail log.

---

## ✅ Step 4 – Testing

1. Buka URL Vercel.
2. Cek halaman beranda, produk, cart, checkout, admin.
3. Jika ada request yang gagal, buka DevTools (F12) → tab Network/Console untuk melihat error (biasanya 404/CORS karena API tidak tersedia).

---

## 🛠 Troubleshooting

| Masalah | Solusi |
| --- | --- |
| Build error di Vercel | Pastikan `client/package-lock.json` sinkron dengan `package.json`, jalankan `npm run build` lokal. |
| Request API gagal | Pastikan `REACT_APP_API_URL` sudah benar, API mengizinkan origin domain kamu, dan endpoint tersebut tersedia. |
| GitHub Actions gagal | Cek apakah secrets Vercel sudah benar dan workflow punya akses ke repo. |
| Halaman blank setelah deploy | Biasanya karena runtime error. Buka tab Console pada browser untuk melihat stack trace. |

---

## ☑️ Checklist Sebelum Share

- [ ] URL Vercel sudah bisa diakses publik
- [ ] `REACT_APP_API_URL` terisi dan API merespons
- [ ] Semua halaman utama (Home, Produk, Cart, Checkout, Admin) sudah dicoba
- [ ] Screenshot/recording siap untuk presentasi

---

Selamat! Versi frontend HSMart kini siap online tanpa perlu mengelola server sendiri. 🎉

