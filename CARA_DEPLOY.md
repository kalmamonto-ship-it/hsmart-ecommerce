# 🚀 Cara Deploy HSMart ke Internet (Step-by-Step)

Panduan lengkap untuk membuat aplikasi HSMart bisa diakses online oleh semua orang.

---

## 📋 Persiapan

### Yang Perlu Disiapkan:
1. ✅ Akun GitHub (gratis) - https://github.com
2. ✅ Akun Vercel (gratis) - https://vercel.com  
3. ✅ (Opsional) URL/API backend milikmu sendiri (bisa dari service apa pun)

---

## ⚙️ OPSIONAL: Deploy Otomatis via GitHub Actions

Workflow `/.github/workflows/deploy.yml` sekarang fokus ke frontend saja. Setiap kali ada push ke branch `main`, GitHub Actions otomatis build React app (`client/`) dan deploy ke Vercel. Siapkan dulu:

1. Repo sudah ada di GitHub (lihat Step 1).
2. Tambahkan secrets di `Settings → Secrets and variables → Actions`:
   | Secret | Isi |
   | --- | --- |
   | `VERCEL_TOKEN` | Token pribadi dari Vercel (`Account Settings → Tokens`). |
   | `VERCEL_ORG_ID` | ID organisasi/team Vercel (lihat `Project → Settings → General`). |
   | `VERCEL_PROJECT_ID` | ID project frontend di Vercel (halaman project → General). |
3. Pastikan environment variable `REACT_APP_API_URL` di Vercel mengarah ke backend/API yang kamu pakai (kalau pakai API publik/eksternal, isi URL tersebut).
4. (Opsional) Jalankan workflow pertama via **Actions → Deploy HSMart → Run workflow**.

Kalau build gagal, cek tab **Actions** untuk melihat log-nya.

---

## 🎯 STEP 1: Upload Project ke GitHub

### A. Buat Repository di GitHub

1. Buka https://github.com dan login
2. Klik tombol **"+"** di kanan atas → **"New repository"**
3. Isi form:
   - **Repository name:** `hsmart-ecommerce` (atau nama lain)
   - **Description:** `HSMart - E-Commerce Platform untuk Digital Entrepreneurship`
   - **Visibility:** Public (agar gratis)
4. Klik **"Create repository"**

### B. Upload File ke GitHub

Buka terminal/command prompt di folder project (`D:\haikal projek`), lalu jalankan:

```bash
# Inisialisasi git
git init

# Tambahkan semua file
git add .

# Commit
git commit -m "Initial commit - HSMart E-Commerce"

# Tambahkan remote GitHub (GANTI USERNAME dengan username GitHub Anda!)
git remote add origin https://github.com/USERNAME/hsmart-ecommerce.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Catatan:** Ganti `USERNAME` dengan username GitHub Anda!

Jika diminta login, gunakan GitHub username dan Personal Access Token (bukan password).

---

## 🌐 STEP 2: Deploy Frontend ke Vercel

### A. Daftar & Setup Vercel

1. **Buka Vercel:**
   - Kunjungi https://vercel.com
   - Klik **"Sign Up"** → Pilih **"Continue with GitHub"**
   - Authorize Vercel untuk akses GitHub

2. **Import Project:**
   - Setelah login, klik **"Add New..."** → **"Project"**
   - Pilih repository `hsmart-ecommerce`
   - Klik **"Import"**

3. **Configure Project:**
   - **Framework Preset:** Create React App (auto-detect)
   - **Root Directory:** Klik **"Edit"** → Ubah dari `.` menjadi `client`
   - **Build Command:** `npm run build` (auto, jangan ubah)
   - **Output Directory:** `build` (auto, jangan ubah)
   - **Install Command:** `npm install` (auto, jangan ubah)

4. **Set Environment Variable (opsional):**
   - Scroll ke bagian **"Environment Variables"**
   - Klik **"Add"**
   - Isi:
     - **Name:** `REACT_APP_API_URL`
     - **Value:** `https://URL-BACKEND-KAMU`
     - Contoh: `https://api.hsmart-app.com`
   - Klik **"Save"**

5. **Deploy:**
   - Scroll ke bawah, klik tombol **"Deploy"**
   - Tunggu proses build (sekitar 2-3 menit)
   - Setelah selesai, Vercel akan memberikan URL
   - Contoh: `hsmart-ecommerce.vercel.app` atau `hsmart-ecommerce-xxx.vercel.app`

---

## ✅ STEP 3: Testing

1. **Test Frontend:**
   - Buka URL Vercel yang diberikan
   - Halaman harus muncul dengan baik

2. **Jika pakai API eksternal:**
   - Pastikan endpoint `REACT_APP_API_URL` bisa merespon request (contoh cek `/api/products`).
   - Kalau API tidak tersedia, fitur autentikasi/keranjang akan menampilkan error.

---

## 🎉 Selesai!

Aplikasi HSMart sekarang sudah **ONLINE** dan bisa diakses oleh siapa saja!

- **URL Frontend:** `https://hsmart-ecommerce.vercel.app`
- **API:** gunakan URL milikmu sendiri melalui `REACT_APP_API_URL`

---

## 🆘 Troubleshooting

### ❌ Frontend error saat call API
- Pastikan `REACT_APP_API_URL` di Vercel sudah benar (tanpa slash di akhir).
- Cek browser console (F12) untuk detail error.
- Pastikan API tujuan memang aktif dan mengizinkan origin/domain kamu.

### ❌ CORS Error
- Tambahkan domain Vercel kamu di konfigurasi backend/API yang digunakan.
- Jika pakai layanan publik, lihat dokumentasi CORS mereka.

### ❌ Build Error di Vercel
- Pastikan Root Directory = `client`.
- Pastikan Build Command = `npm run build`.
- Cek Vercel build logs untuk detail error compile.

---

## 🎊 Share ke Teman & Dosen!

Setelah deploy selesai, share URL Vercel ke:
- ✅ Teman-teman untuk test
- ✅ Dosen untuk presentasi
- ✅ Siapa saja yang ingin coba aplikasi

**Aplikasi sudah siap untuk demo! 🚀**

---

**Butuh bantuan?** Cek file `DEPLOYMENT.md` untuk panduan lebih detail.

