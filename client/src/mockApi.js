// Mock API berbasis localStorage agar aplikasi bisa berjalan tanpa backend.
// Seluruh fungsi mengembalikan Promise supaya mirip dengan pemanggilan axios.

const USERS_KEY = 'hsmart_users';
const PRODUCTS_KEY = 'hsmart_products';
const ORDERS_KEY = 'hsmart_orders';
const CART_KEY_PREFIX = 'hsmart_cart_';
const SCHEMA_VERSION_KEY = 'hsmart_schema_version';
const CURRENT_SCHEMA_VERSION = '1.3';

function delay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCartKey(userId) {
  return `${CART_KEY_PREFIX}${userId}`;
}

function ensureSeedData() {
  // Jika versi schema berubah, reset data demo agar seed terbaru kepakai
  const storedVersion = localStorage.getItem(SCHEMA_VERSION_KEY);
  if (storedVersion !== CURRENT_SCHEMA_VERSION) {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(ORDERS_KEY);
    // Hapus semua cart per user
    Object.keys(localStorage)
      .filter((key) => key.startsWith(CART_KEY_PREFIX))
      .forEach((key) => localStorage.removeItem(key));

    localStorage.setItem(SCHEMA_VERSION_KEY, CURRENT_SCHEMA_VERSION);
  }

  // Seed user admin
  let users = load(USERS_KEY, null);
  if (!users) {
    users = [
      {
        id: 'admin-1',
        name: 'Admin',
        email: 'admin@ecommerce.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
    save(USERS_KEY, users);
  }

  // Seed produk dasar: perlengkapan produktivitas mahasiswa & pekerja muda
  let products = load(PRODUCTS_KEY, null);
  if (!products) {
    products = [
      {
        id: '1',
        name: 'Laptop Kerja Ringan 14" HSMart Pro',
        price: 9500000,
        description:
          'Laptop 14 inci ringan dengan SSD 512GB dan RAM 16GB, ideal untuk kuliah online, kerja remote, dan multitasking harian.',
        image:
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        category: 'Elektronik',
        stock: 12,
        sold: 37,
        reviews: [
          {
            id: 'rev-lap-1',
            customer: 'Budi Mahasiswa',
            rating: 5,
            comment:
              'Laptopnya enteng banget dibawa ke kampus, baterai kuat buat meeting online seharian.',
            date: '2025-01-12'
          },
          {
            id: 'rev-lap-2',
            customer: 'Tania Remote Worker',
            rating: 4.8,
            comment:
              'Performa SSD ngebut, cocok buat multitasking kerja remote. Packaging rapih.',
            date: '2025-02-06'
          }
        ]
      },
      {
        id: '2',
        name: 'Headphone Noise Cancelling Focus+',
        price: 1850000,
        description:
          'Headphone wireless dengan active noise cancelling untuk bantu kamu fokus saat belajar dan meeting online.',
        image:
          'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=500',
        category: 'Elektronik',
        stock: 20,
        sold: 84,
        reviews: [
          {
            id: 'rev-head-1',
            customer: 'Sari Remote Worker',
            rating: 5,
            comment:
              'Noise cancelling-nya beneran bantu fokus. Meeting Zoom jadi jauh lebih nyaman.',
            date: '2025-03-10'
          },
          {
            id: 'rev-head-2',
            customer: 'Raka Final Project',
            rating: 4.9,
            comment:
              'Dipakai nugas malam nggak bikin sakit kuping. Suara musik detail.',
            date: '2025-04-04'
          }
        ]
      },
      {
        id: '3',
        name: 'Tas Ransel Laptop Anti Air UrbanPack',
        price: 425000,
        description:
          'Backpack minimalis muat laptop 15.6", banyak kompartemen untuk buku, charger, dan mouse. Cocok untuk kampus & kantor.',
        image:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        category: 'Aksesoris',
        stock: 30,
        sold: 120,
        reviews: [
          {
            id: 'rev-bag-1',
            customer: 'Lina Magang',
            rating: 4.7,
            comment:
              'Kompartemennya banyak jadi charger dan buku tidak bercampur. Anti air juga terbukti.',
            date: '2025-05-09'
          },
          {
            id: 'rev-bag-2',
            customer: 'Doni Freelancer',
            rating: 4.8,
            comment:
              'Desain minimalis, muat laptop 15 inch dan tablet. Recommended buat kerja mobile.',
            date: '2025-06-21'
          }
        ]
      },
      {
        id: '4',
        name: 'Desk Set Produktif (Mousepad XXL + Stand Laptop)',
        price: 275000,
        description:
          'Paket alas meja lebar dan stand laptop aluminium untuk posisi kerja yang ergonomis dan rapi.',
        image:
          'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500',
        category: 'Aksesoris',
        stock: 40,
        sold: 56,
        reviews: [
          {
            id: 'rev-desk-1',
            customer: 'Nadia UI/UX',
            rating: 4.9,
            comment:
              'Stand laptop bikin posisi layar sejajar mata, mousepad lebar bikin meja rapi.',
            date: '2025-07-14'
          },
          {
            id: 'rev-desk-2',
            customer: 'Fauzan Content Creator',
            rating: 4.8,
            comment:
              'Set meja terlihat estetik di video call, gampang dibersihkan.',
            date: '2025-08-18'
          }
        ]
      },
      {
        id: '5',
        name: 'Starter Kit Konten Kreator Kampus',
        price: 1350000,
        description:
          'Paket ring light, tripod meja, dan mikrofon USB untuk presentasi online, rekaman video tugas, dan konten media sosial.',
        image:
          'https://images.unsplash.com/photo-1518895949257-7621c3c786d4?w=500',
        category: 'Kreatif',
        stock: 18,
        sold: 22,
        reviews: [
          {
            id: 'rev-kit-1',
            customer: 'Sari Remote Worker',
            rating: 4.9,
            comment:
              'Ring light & mic USB langsung siap pakai buat webinar kampus.',
            date: '2025-09-07'
          },
          {
            id: 'rev-kit-2',
            customer: 'Andra Podcaster',
            rating: 4.7,
            comment:
              'Tripod kokoh untuk konten TikTok, kualitas mic cukup jernih.',
            date: '2025-10-12'
          }
        ]
      },
      {
        id: '6',
        name: 'Template Notion Planner Produktivitas Mahasiswa',
        price: 75000,
        description:
          'Template digital Notion untuk mengatur jadwal kuliah, to-do list, deadline tugas, dan catatan proyek dalam satu tempat.',
        image:
          'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=500',
        category: 'Produk Digital',
        stock: 999,
        sold: 210,
        reviews: [
          {
            id: 'rev-notion-1',
            customer: 'Mega Organiser',
            rating: 5,
            comment:
              'Template-nya lengkap banget, ada tracker tugas, finansial, dan habit.',
            date: '2025-11-03'
          },
          {
            id: 'rev-notion-2',
            customer: 'Reyhan Tim Capstone',
            rating: 4.8,
            comment:
              'Tinggal duplicate, langsung siap pakai buat koordinasi tim kampus.',
            date: '2025-11-18'
          }
        ]
      },
      {
        id: '7',
        name: 'Monitor Portable 15.6" FlexView IPS',
        price: 3450000,
        description:
          'Monitor portable full HD dengan cover magnetik untuk second screen saat kerja hybrid atau presentasi kampus.',
        image:
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        category: 'Elektronik',
        stock: 15,
        sold: 44,
        reviews: [
          {
            id: 'rev-monitor-1',
            customer: 'Riri Data Analyst',
            rating: 4.8,
            comment:
              'Enak banget buat kerja di coffee shop, tinggal sambung USB-C langsung nyala.',
            date: '2025-04-22'
          },
          {
            id: 'rev-monitor-2',
            customer: 'Yoga Presentasi',
            rating: 4.9,
            comment:
              'Layar tajam, jadi gampang nunjukin slide tanpa rebutan laptop.',
            date: '2025-06-03'
          }
        ]
      },
      {
        id: '8',
        name: 'Kursi Ergonomis Compact SitWell',
        price: 1950000,
        description:
          'Kursi ergonomis dengan lumbar support dan armrest flip-up yang muat di kamar kos kecil.',
        image:
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500',
        category: 'Aksesoris',
        stock: 25,
        sold: 68,
        reviews: [
          {
            id: 'rev-chair-1',
            customer: 'Gilang Editor Video',
            rating: 4.8,
            comment:
              'Punggung nggak gampang pegal lagi, pemasangan cuma 15 menit.',
            date: '2025-05-27'
          },
          {
            id: 'rev-chair-2',
            customer: 'Vina Thesis',
            rating: 5,
            comment:
              'Armrest bisa dinaikkan jadi gampang masuk ke meja lipat kos.',
            date: '2025-07-02'
          }
        ]
      },
      {
        id: '9',
        name: 'Smart Bottle Reminder Hydrate+',
        price: 275000,
        description:
          'Botol minum pintar dengan pengingat LED untuk menjaga hidrasi saat belajar atau kerja panjang.',
        image:
          'https://images.unsplash.com/photo-1542444459-db6318d691bf?w=500',
        category: 'Kesehatan',
        stock: 60,
        sold: 150,
        reviews: [
          {
            id: 'rev-bottle-1',
            customer: 'Mira Product Manager',
            rating: 4.7,
            comment:
              'LED berkedip lembut tiap jam, jadi nggak lupa minum pas sprint planning.',
            date: '2025-02-18'
          },
          {
            id: 'rev-bottle-2',
            customer: 'Andi Co-working',
            rating: 4.9,
            comment:
              'Suhu air tetap dingin 8 jam, cocok dibawa maraton meeting.',
            date: '2025-03-28'
          }
        ]
      }
    ];
    save(PRODUCTS_KEY, products);
  }

  // Seed beberapa pesanan fiktif untuk demo (mirip Shopee sudah ada transaksi)
  let orders = load(ORDERS_KEY, null);
  if (!orders) {
    const now = new Date();
    const p1 = products.find(p => p.id === '1');
    const p2 = products.find(p => p.id === '2');
    const p3 = products.find(p => p.id === '3');
    const p5 = products.find(p => p.id === '5');

    orders = [
      {
        id: 'order-demo-1',
        orderNumber: '0001',
        userId: 'demo-user-1',
        userName: 'Budi Mahasiswa',
        userEmail: 'budi.mahasiswa@demo.hsmart',
        customerName: 'Budi Mahasiswa',
        address: 'Kost Griya Jaya, Jakarta',
        items: [
          {
            productId: p1.id,
            productName: p1.name,
            quantity: 1,
            subtotal: p1.price * 1
          },
          {
            productId: p2.id,
            productName: p2.name,
            quantity: 1,
            subtotal: p2.price * 1
          }
        ],
        total: p1.price + p2.price,
        status: 'delivered',
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7).toISOString()
      },
      {
        id: 'order-demo-2',
        orderNumber: '0002',
        userId: 'demo-user-2',
        userName: 'Sari Remote Worker',
        userEmail: 'sari.remote@demo.hsmart',
        customerName: 'Sari Remote Worker',
        address: 'Apartemen Hijau Tower B, Bandung',
        items: [
          {
            productId: p3.id,
            productName: p3.name,
            quantity: 1,
            subtotal: p3.price * 1
          },
          {
            productId: p5.id,
            productName: p5.name,
            quantity: 1,
            subtotal: p5.price * 1
          }
        ],
        total: p3.price + p5.price,
        status: 'shipped',
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3).toISOString()
      }
    ];

    save(ORDERS_KEY, orders);
  }
}

// Jalankan seed sekali saat file pertama kali di-import
ensureSeedData();

// =============== AUTH ===============

export async function apiRegister({ name, email, password }) {
  await delay();
  const users = load(USERS_KEY, []);

  if (!name || !email || !password) {
    throw new Error('Nama, email, dan password wajib diisi');
  }

  if (password.length < 6) {
    throw new Error('Password minimal 6 karakter');
  }

  const exists = users.find((u) => u.email === email);
  if (exists) {
    throw new Error('Email sudah terdaftar');
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password, // NOTE: disimpan plain text karena ini hanya demo frontend
    role: 'customer',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  save(USERS_KEY, users);

  const token = newUser.id;
  return { token, user: { id: newUser.id, name, email, role: newUser.role } };
}

export async function apiLogin({ email, password }) {
  await delay();
  const users = load(USERS_KEY, []);
  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    throw new Error('Email atau password salah');
  }

  const token = user.id;
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  };
}

export async function apiGetCurrentUser(token) {
  await delay();
  if (!token) throw new Error('Tidak ada sesi');

  const users = load(USERS_KEY, []);
  const user = users.find((u) => u.id === token);
  if (!user) {
    throw new Error('User tidak ditemukan');
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

// =============== PRODUCTS ===============

export async function apiGetProducts() {
  await delay();
  return load(PRODUCTS_KEY, []);
}

export async function apiGetProductById(id) {
  await delay();
  const products = load(PRODUCTS_KEY, []);
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error('Produk tidak ditemukan');
  return product;
}

export async function apiSaveProduct(product, editingId = null) {
  await delay();
  const products = load(PRODUCTS_KEY, []);

  if (editingId) {
    const idx = products.findIndex((p) => p.id === editingId);
    if (idx === -1) throw new Error('Produk tidak ditemukan');
    products[idx] = { ...products[idx], ...product };
  } else {
    const newProduct = {
      ...product,
      id: `prod-${Date.now()}`
    };
    products.push(newProduct);
  }

  save(PRODUCTS_KEY, products);
  return products;
}

export async function apiDeleteProduct(id) {
  await delay();
  const products = load(PRODUCTS_KEY, []);
  const filtered = products.filter((p) => p.id !== id);
  save(PRODUCTS_KEY, filtered);
  return filtered;
}

// =============== CART ===============

export async function apiGetCart(userId) {
  await delay();
  const cartKey = getCartKey(userId);
  const rawItems = load(cartKey, []);
  const products = load(PRODUCTS_KEY, []);

  // Gabungkan dengan data produk
  return rawItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      id: item.id,
      product,
      quantity: item.quantity
    };
  });
}

export async function apiAddToCart(userId, productId, quantity) {
  await delay();
  const cartKey = getCartKey(userId);
  const items = load(cartKey, []);

  const existing = items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({
      id: `cart-${Date.now()}`,
      productId,
      quantity
    });
  }

  save(cartKey, items);
  return items;
}

export async function apiUpdateCartItem(userId, itemId, quantity) {
  await delay();
  const cartKey = getCartKey(userId);
  let items = load(cartKey, []);
  items = items.map((item) =>
    item.id === itemId ? { ...item, quantity } : item
  );
  save(cartKey, items);
  return items;
}

export async function apiRemoveCartItem(userId, itemId) {
  await delay();
  const cartKey = getCartKey(userId);
  let items = load(cartKey, []);
  items = items.filter((item) => item.id !== itemId);
  save(cartKey, items);
  return items;
}

export async function apiClearCart(userId) {
  await delay();
  const cartKey = getCartKey(userId);
  save(cartKey, []);
}

// =============== ORDERS ===============

export async function apiCreateOrder(user, address) {
  await delay();
  const cartKey = getCartKey(user.id);
  const cartItems = load(cartKey, []);
  const products = load(PRODUCTS_KEY, []);
  const orders = load(ORDERS_KEY, []);

  if (!cartItems.length) {
    throw new Error('Keranjang kosong');
  }

  const items = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const subtotal = product.price * item.quantity;
    return {
      productId: product.id,
      productName: product.name,
      quantity: item.quantity,
      subtotal
    };
  });

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  const orderNumber = String(orders.length + 1).padStart(4, '0');

  const newOrder = {
    id: `order-${Date.now()}`,
    orderNumber,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    customerName: user.name,
    address,
    items,
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  save(ORDERS_KEY, orders);
  // kosongkan keranjang
  save(cartKey, []);

  return newOrder;
}

export async function apiGetOrders(user) {
  await delay();
  const orders = load(ORDERS_KEY, []);
  if (!user) return [];

  if (user.role === 'admin') {
    return orders;
  }
  return orders.filter((o) => o.userId === user.id);
}

export async function apiUpdateOrderStatus(orderId, newStatus) {
  await delay();
  const orders = load(ORDERS_KEY, []);
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) throw new Error('Pesanan tidak ditemukan');
  orders[idx].status = newStatus;
  save(ORDERS_KEY, orders);
  return orders[idx];
}


