# 🚀 Cara Deploy HSMart ke Internet (Step-by-Step)

Panduan lengkap untuk membuat aplikasi HSMart bisa diakses online oleh semua orang.

---

## 📋 Persiapan

### Yang Perlu Disiapkan:
1. ✅ Akun GitHub (gratis) - https://github.com
2. ✅ Akun Vercel (gratis) - https://vercel.com  
3. ✅ Akun Railway (gratis) - https://railway.app

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

## 🔧 STEP 2: Deploy Backend ke Railway

### A. Daftar & Setup Railway

1. **Buka Railway:**
   - Kunjungi https://railway.app
   - Klik **"Login"** → Pilih **"Login with GitHub"**
   - Authorize Railway untuk akses GitHub

2. **Create New Project:**
   - Klik tombol **"New Project"** (hijau di kanan atas)
   - Pilih **"Deploy from GitHub repo"**
   - Pilih repository `hsmart-ecommerce` yang baru dibuat
   - Railway akan otomatis detect project

3. **Configure Backend:**
   - Klik pada service yang baru dibuat
   - Buka tab **"Settings"** (di sidebar kiri)
   - Scroll ke bagian **"Root Directory"**
   - Klik **"Override"** → Isi: `server`
   - Scroll ke **"Start Command"**
   - Klik **"Override"** → Isi: `node index.js`

4. **Set Environment Variables:**
   - Masih di tab **"Settings"**
   - Scroll ke bagian **"Variables"**
   - Klik **"New Variable"**
   - Tambahkan satu per satu:
     
     **Variable 1:**
     - Name: `JWT_SECRET`
     - Value: `hsmart-secret-key-2024-production-change-this`
     - Klik **"Add"**
     
     **Variable 2:**
     - Name: `PORT`
     - Value: `5000`
     - Klik **"Add"**
     
     **Variable 3:**
     - Name: `NODE_ENV`
     - Value: `production`
     - Klik **"Add"**

5. **Generate Domain (URL):**
   - Klik tab **"Settings"** → Scroll ke **"Networking"**
   - Klik **"Generate Domain"**
   - Copy URL yang muncul (contoh: `hsmart-production.up.railway.app`)
   - **SIMPAN URL INI!** (akan dipakai di frontend)

6. **Tunggu Deploy:**
   - Railway akan otomatis deploy
   - Tunggu sampai status berubah menjadi **"Deployed"** (hijau)
   - Bisa cek di tab **"Deployments"**

7. **Test Backend:**
   - Buka browser, akses: `https://YOUR-RAILWAY-URL/api/health`
   - Harus muncul: `{"status":"OK","message":"Server is running"}`
   - Jika muncul, backend sudah berhasil!

---

## 🌐 STEP 3: Deploy Frontend ke Vercel

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

4. **Set Environment Variable:**
   - Scroll ke bagian **"Environment Variables"**
   - Klik **"Add"**
   - Isi:
     - **Name:** `REACT_APP_API_URL`
     - **Value:** `https://YOUR-RAILWAY-URL` (URL dari Step 2, tanpa `/api`)
     - Contoh: `https://hsmart-production.up.railway.app`
   - Klik **"Save"**

5. **Deploy:**
   - Scroll ke bawah, klik tombol **"Deploy"**
   - Tunggu proses build (sekitar 2-3 menit)
   - Setelah selesai, Vercel akan memberikan URL
   - Contoh: `hsmart-ecommerce.vercel.app` atau `hsmart-ecommerce-xxx.vercel.app`

---

## ✅ STEP 4: Testing

1. **Test Frontend:**
   - Buka URL Vercel yang diberikan
   - Halaman harus muncul dengan baik

2. **Test Register:**
   - Klik **"Daftar"**
   - Buat akun baru
   - Harus berhasil

3. **Test Login:**
   - Login dengan akun yang baru dibuat
   - Harus berhasil masuk

4. **Test Fitur:**
   - Browse produk
   - Tambah ke keranjang
   - Checkout
   - Semua harus bekerja!

---

## 🎉 Selesai!

Aplikasi HSMart sekarang sudah **ONLINE** dan bisa diakses oleh siapa saja!

**URL Frontend:** `https://hsmart-ecommerce.vercel.app`  
**URL Backend:** `https://hsmart-production.up.railway.app`

---

## 📝 Catatan Penting

### Default Admin Account:
- **Email:** `admin@ecommerce.com`
- **Password:** `admin123`
- ⚠️ **UBAH PASSWORD INI SETELAH DEPLOY!**

### Update Admin Password:
1. Login sebagai admin
2. (Jika ada fitur change password, gunakan itu)
3. Atau buat admin baru melalui database

### Data Storage:
- Data tersimpan di Railway (persistent)
- Data akan hilang jika project di-delete di Railway

### Update URL:
- Jika Railway URL berubah, update di Vercel Environment Variables
- Vercel akan auto-redeploy

---

## 🆘 Troubleshooting

### ❌ Backend tidak bisa diakses
**Solusi:**
- Cek Railway logs: Dashboard → Service → Tab "Logs"
- Pastikan environment variables sudah di-set
- Pastikan Root Directory = `server`
- Pastikan Start Command = `node index.js`

### ❌ Frontend error saat call API
**Solusi:**
- Cek `REACT_APP_API_URL` di Vercel sudah benar
- Pastikan URL tidak ada `/api` di akhir
- Cek browser console (F12) untuk error detail
- Pastikan backend sudah running di Railway

### ❌ CORS Error
**Solusi:**
- Backend sudah dikonfigurasi untuk allow semua origin
- Jika masih error, cek Railway logs
- Pastikan backend URL benar di Vercel

### ❌ Build Error di Vercel
**Solusi:**
- Pastikan Root Directory = `client`
- Pastikan Build Command = `npm run build`
- Cek Vercel build logs untuk detail error

---

## 🎊 Share ke Teman & Dosen!

Setelah deploy selesai, share URL Vercel ke:
- ✅ Teman-teman untuk test
- ✅ Dosen untuk presentasi
- ✅ Siapa saja yang ingin coba aplikasi

**Aplikasi sudah siap untuk demo! 🚀**

---

**Butuh bantuan?** Cek file `DEPLOYMENT.md` untuk panduan lebih detail.

