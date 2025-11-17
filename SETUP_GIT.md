# 🔧 Setup Git untuk Deployment

Git diperlukan untuk push code ke GitHub, yang kemudian akan di-deploy ke Railway dan Vercel.

---

## 📥 Install Git (Jika Belum Ada)

### Cara 1: Download Git for Windows

1. **Download Git:**
   - Buka: https://git-scm.com/download/win
   - Download installer
   - Jalankan installer
   - **PENTING:** Pilih "Add Git to PATH" saat install

2. **Restart Command Prompt:**
   - Tutup Command Prompt yang sedang terbuka
   - Buka Command Prompt baru
   - Test: ketik `git --version`
   - Harus muncul versi Git

### Cara 2: Install via Winget (Windows 11)

Buka Command Prompt sebagai Administrator, lalu:

```cmd
winget install --id Git.Git -e --source winget
```

Setelah install, restart Command Prompt.

---

## 🚀 Setup Repository (Jika Git Sudah Ada)

### Step 1: Navigate ke Folder Project

Di Command Prompt, ketik:

```cmd
cd "d:\haikal projek"
```

### Step 2: Inisialisasi Git

```cmd
git init
```

### Step 3: Tambahkan File

```cmd
git add .
```

### Step 4: Commit

```cmd
git commit -m "Initial commit - HSMart E-Commerce"
```

### Step 5: Connect ke GitHub

```cmd
git remote add origin https://github.com/USERNAME/REPO-NAME.git
```

**Ganti:**
- `USERNAME` = username GitHub Anda
- `REPO-NAME` = nama repository yang sudah dibuat

### Step 6: Push ke GitHub

```cmd
git branch -M main
git push -u origin main
```

Jika diminta login, gunakan:
- **Username:** GitHub username
- **Password:** Personal Access Token (bukan password GitHub)

---

## ✅ Test Git

Setelah install, test dengan:

```cmd
git --version
```

Harus muncul versi Git (contoh: `git version 2.42.0`)

---

## 🎯 Alternatif: Upload Manual ke GitHub

Jika Git tidak bisa diinstall, bisa upload manual:

1. Buka repository GitHub di browser
2. Klik "uploading an existing file"
3. Drag & drop semua file dari folder `d:\haikal projek`
4. Commit changes

---

## 📝 Setelah Git Setup

Setelah Git berhasil setup dan code sudah di GitHub, lanjutkan ke deployment:

1. **Railway:** https://railway.app → Deploy from GitHub
2. **Vercel:** https://vercel.com → Import from GitHub

---

**Butuh bantuan?** Cek file `HOSTING_SEKARANG.md` untuk panduan lengkap.


