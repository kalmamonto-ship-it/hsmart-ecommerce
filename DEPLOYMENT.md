# 🚀 Panduan Deployment Aplikasi E-Commerce

Panduan lengkap untuk deploy aplikasi ini ke internet agar bisa diakses oleh banyak orang.

## 📋 Prerequisites

- Akun GitHub (gratis)
- Akun Vercel (untuk frontend) - https://vercel.com
- Akun Railway atau Render (untuk backend) - https://railway.app atau https://render.com

---

## 🎯 Strategi Deployment

### **Frontend (React) → Vercel**
- Gratis, mudah, dan cepat
- Auto-deploy dari GitHub
- HTTPS otomatis

### **Backend (Node.js) → Railway atau Render**
- Railway: Gratis tier tersedia
- Render: Gratis tier tersedia
- Support Node.js dengan mudah

---

## 📦 Step 1: Persiapan Repository

1. **Buat repository GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/ecommerce-digital-entrepreneurship.git
   git push -u origin main
   ```

2. **Buat file `.gitignore`** (sudah ada):
   - Pastikan `server/data/` tidak di-commit (data akan dibuat di server)

---

## 🔧 Step 2: Deploy Backend ke Railway

### **A. Setup Railway:**

1. **Daftar di Railway:**
   - Kunjungi https://railway.app
   - Sign up dengan GitHub

2. **Create New Project:**
   - Klik "New Project"
   - Pilih "Deploy from GitHub repo"
   - Pilih repository Anda

3. **Configure Backend:**
   - Railway akan auto-detect Node.js
   - Set **Root Directory** ke: `server`
   - Set **Start Command** ke: `node index.js`

4. **Set Environment Variables:**
   - Di Railway dashboard, buka "Variables"
   - Tambahkan:
     ```
     JWT_SECRET=your-very-secret-key-minimum-32-characters-random-string
     PORT=5000
     NODE_ENV=production
     ```

5. **Get Backend URL:**
   - Railway akan memberikan URL seperti: `https://your-app.railway.app`
   - Copy URL ini untuk digunakan di frontend

---

## 🌐 Step 3: Deploy Frontend ke Vercel

### **A. Setup Vercel:**

1. **Daftar di Vercel:**
   - Kunjungi https://vercel.com
   - Sign up dengan GitHub

2. **Import Project:**
   - Klik "Add New Project"
   - Pilih repository GitHub Anda
   - Vercel akan auto-detect React

3. **Configure Frontend:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

4. **Set Environment Variables:**
   - Tambahkan:
     ```
     REACT_APP_API_URL=https://your-backend-url.railway.app
     ```

5. **Update API Proxy:**
   - Edit `client/package.json`
   - Ganti `"proxy": "http://localhost:5000"` dengan:
     ```json
     "proxy": "https://your-backend-url.railway.app"
     ```

6. **Deploy:**
   - Klik "Deploy"
   - Tunggu sampai selesai
   - Vercel akan memberikan URL seperti: `https://your-app.vercel.app`

---

## 🔄 Step 4: Update Frontend untuk Production

### **Update `client/src/context/AuthContext.js`:**

Ganti base URL axios:

```javascript
// Di bagian atas file
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Update semua axios calls
axios.get(`${API_URL}/api/...`)
```

Atau buat file `client/src/config.js`:

```javascript
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

---

## ✅ Step 5: Testing

1. **Test Backend:**
   - Buka: `https://your-backend.railway.app/api/health`
   - Harus return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend:**
   - Buka URL Vercel Anda
   - Coba register user baru
   - Coba login
   - Test semua fitur

---

## 🔐 Step 6: Security Checklist

- [ ] JWT_SECRET sudah diubah (jangan pakai default)
- [ ] Environment variables tidak di-commit ke GitHub
- [ ] CORS sudah dikonfigurasi dengan benar
- [ ] HTTPS aktif (otomatis di Vercel/Railway)

---

## 📝 Catatan Penting

1. **Data Storage:**
   - Data disimpan di `server/data/` di Railway
   - Data akan hilang jika project di-delete
   - Untuk production, pertimbangkan database (MongoDB, PostgreSQL)

2. **CORS:**
   - Backend sudah dikonfigurasi untuk allow semua origin
   - Untuk production, bisa dibatasi ke domain Vercel saja

3. **Default Admin:**
   - Email: `admin@ecommerce.com`
   - Password: `admin123`
   - **UBAH PASSWORD INI SETELAH DEPLOY!**

---

## 🆘 Troubleshooting

### **Backend tidak bisa diakses:**
- Cek environment variables
- Cek logs di Railway dashboard
- Pastikan PORT sudah di-set

### **Frontend error saat call API:**
- Cek REACT_APP_API_URL sudah benar
- Cek CORS di backend
- Cek network tab di browser console

### **Login tidak bekerja:**
- Cek JWT_SECRET sudah di-set
- Cek backend logs untuk error
- Pastikan axios headers sudah benar

---

## 🎉 Selesai!

Setelah deployment selesai:
- Share URL Vercel ke teman-teman
- Mereka bisa register dan membuat order fiktif
- Admin bisa login dan manage produk/pesanan

**Selamat! Aplikasi Anda sudah online! 🚀**

