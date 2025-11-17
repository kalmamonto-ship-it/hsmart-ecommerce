// Mock API berbasis localStorage agar aplikasi bisa berjalan tanpa backend.
// Seluruh fungsi mengembalikan Promise supaya mirip dengan pemanggilan axios.

const USERS_KEY = 'hsmart_users';
const PRODUCTS_KEY = 'hsmart_products';
const ORDERS_KEY = 'hsmart_orders';
const CART_KEY_PREFIX = 'hsmart_cart_';

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
        sold: 37
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
        sold: 84
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
        sold: 120
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
        sold: 56
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
        sold: 22
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
        sold: 210
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


