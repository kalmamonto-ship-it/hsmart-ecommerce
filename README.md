# ✨ HSMart - Digital Entrepreneurship

Platform e-commerce full-stack modern dengan sistem autentikasi untuk tugas mata kuliah Digital Entrepreneurship.

**Dibuat oleh:** Haikal Saputra Mamonto  
**NIM:** 231011402017

## ✨ Deskripsi

Aplikasi e-commerce modern dengan fitur lengkap untuk penjualan online, termasuk:
- ✅ **Sistem Autentikasi** - Register & Login untuk user dan admin
- ✅ **Katalog Produk** - Browse produk dengan kategori dan search
- ✅ **Keranjang Belanja** - Per-user cart management
- ✅ **Sistem Checkout** - Pembuatan pesanan dengan data user
- ✅ **Manajemen Pesanan** - Tracking pesanan untuk customer dan admin
- ✅ **Panel Admin** - Kelola produk dan update status pesanan
- ✅ **Multi-User Support** - Banyak user bisa register dan belanja
- ✅ **Protected Routes** - Keamanan untuk halaman admin dan user

## Teknologi yang Digunakan

### Frontend
- React 18
- React Router DOM
- Axios
- CSS3 (Modern UI dengan gradient dan animations)

### Backend
- Node.js
- Express.js
- File-based JSON storage (untuk simplicitas)

## 🎯 Fitur Lengkap

### 👤 Untuk Customer
1. **Register & Login** - Daftar akun baru atau login ke akun yang sudah ada
2. **Beranda** - Halaman utama dengan produk unggulan
3. **Daftar Produk** - Browse semua produk dengan filter kategori dan search
4. **Detail Produk** - Informasi lengkap produk dengan tombol add to cart
5. **Keranjang** - Kelola item di keranjang, update quantity (per-user)
6. **Checkout** - Form pemesanan dengan data user otomatis
7. **Daftar Pesanan** - Lihat semua pesanan yang sudah dibuat

### 🔐 Untuk Admin
1. **Login Admin** - Akses khusus untuk admin
2. **Kelola Produk** - Tambah, edit, hapus produk
3. **Kelola Pesanan** - Update status pesanan (pending, processing, shipped, delivered, cancelled)
4. **Lihat Semua Pesanan** - Monitor semua pesanan dari semua customer

### 🔒 Keamanan
- JWT-based authentication
- Password hashing dengan bcrypt
- Protected routes untuk admin dan user
- Per-user cart dan orders

## 🚀 Instalasi

### Prerequisites
- Node.js (v14 atau lebih baru)
- npm atau yarn

### Default Admin Account
- **Email:** `admin@ecommerce.com`
- **Password:** `admin123`

### Langkah-langkah

1. **Clone atau download project ini**

2. **Install dependencies:**

   **Cara Termudah (Windows):**
   - Double-click file `install.bat` (untuk Command Prompt)
   - Atau double-click `install.ps1` (untuk PowerShell)
   
   **Cara Manual:**
   ```bash
   npm run install-all
   ```
   
   Atau install secara manual:
   ```bash
   # Install root dependencies
   npm install

   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Jalankan aplikasi:**

   **Cara Termudah (Windows):**
   - Double-click file `start.bat` (untuk Command Prompt)
   - Atau double-click `start.ps1` (untuk PowerShell)
   
   **Cara Manual:**
   ```bash
   npm run dev
   ```

   **Opsi Lain: Jalankan secara terpisah**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm start
   ```
   Server akan berjalan di http://localhost:5000

   Terminal 2 (Frontend):
   ```bash
   cd client
   npm start
   ```
   Client akan berjalan di http://localhost:3000

4. **Buka browser dan akses:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## Struktur Project

```
ecommerce-digital-entrepreneurship/
├── client/                 # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/    # Komponen React (Navbar)
│   │   ├── pages/         # Halaman aplikasi
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                # Backend Node.js
│   ├── data/              # Data storage (JSON files)
│   │   ├── products.json
│   │   ├── orders.json
│   │   └── cart.json
│   ├── index.js           # Server utama
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (Public)
- `GET /api/products/:id` - Get single product (Public)
- `POST /api/products` - Add new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart (Protected - Per User)
- `GET /api/cart` - Get user cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders (Protected)
- `GET /api/orders` - Get user orders (Customer) or all orders (Admin)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (Admin only)

## Data Dummy

Aplikasi sudah dilengkapi dengan data dummy produk:
- Laptop ASUS ROG Strix
- Smartphone Samsung Galaxy S24
- Sepatu Nike Air Max
- Kemeja Formal Pria
- Headphone Sony WH-1000XM5
- Tas Ransel Backpack
- Jam Tangan Smartwatch
- Kamera Canon EOS R6

## 📝 Catatan Penting

1. **Data Storage**: Aplikasi menggunakan file JSON untuk menyimpan data. Data akan tersimpan di folder `server/data/`
2. **Order Fiktif**: Seperti yang diminta, orderan fiktif dapat dibuat melalui form checkout
3. **Port**: Pastikan port 3000 (frontend) dan 5000 (backend) tidak digunakan aplikasi lain
4. **Multi-User**: Setiap user memiliki cart dan orders sendiri-sendiri
5. **Admin Access**: Hanya user dengan role 'admin' yang bisa akses halaman admin

## 🌐 Deployment

Aplikasi ini bisa di-deploy ke internet agar bisa diakses oleh banyak orang. Lihat file **DEPLOYMENT.md** untuk panduan lengkap deployment ke:
- **Frontend**: Vercel (gratis)
- **Backend**: Railway atau Render (gratis)

Setelah di-deploy, teman-teman bisa register dan membuat order fiktif!

## Penggunaan

1. **Sebagai Customer:**
   - Browse produk di halaman "Produk"
   - Klik produk untuk melihat detail
   - Tambahkan ke keranjang
   - Lakukan checkout dengan mengisi form
   - Lihat pesanan di halaman "Pesanan"

2. **Sebagai Admin:**
   - Akses halaman "Admin"
   - Tab "Kelola Produk": Tambah/edit/hapus produk
   - Tab "Kelola Pesanan": Update status pesanan

## Screenshot Fitur

- ✅ Responsive design (mobile-friendly)
- ✅ Modern UI dengan gradient dan animations
- ✅ Search dan filter produk
- ✅ Real-time cart count
- ✅ Form validation
- ✅ Status badges untuk pesanan

## Troubleshooting

**Port sudah digunakan:**
- Ubah port di `server/index.js` (line PORT) atau `client/package.json` (proxy)

**Dependencies error:**
- Hapus `node_modules` dan `package-lock.json`, lalu install ulang

**Data tidak muncul:**
- Pastikan server backend sudah running
- Check console untuk error messages

## Lisensi

Project ini dibuat untuk keperluan tugas akademik.

---

**Selamat menggunakan aplikasi e-commerce! 🛒**

