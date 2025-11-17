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

  // Seed produk dasar
  let products = load(PRODUCTS_KEY, null);
  if (!products) {
    products = [
      {
        id: '1',
        name: 'Laptop ASUS ROG Strix',
        price: 15000000,
        description:
          'Laptop gaming high performance dengan processor Intel i7 dan GPU RTX 4060',
        image:
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        category: 'Elektronik',
        stock: 10
      },
      {
        id: '2',
        name: 'Smartphone Samsung Galaxy S24',
        price: 12000000,
        description:
          'Smartphone flagship dengan kamera 108MP dan layar AMOLED 120Hz',
        image:
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        category: 'Elektronik',
        stock: 15
      },
      {
        id: '3',
        name: 'Sepatu Nike Air Max',
        price: 1500000,
        description:
          'Sepatu olahraga dengan teknologi Air Max untuk kenyamanan maksimal',
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        category: 'Fashion',
        stock: 25
      },
      {
        id: '4',
        name: 'Tas Ransel Backpack',
        price: 450000,
        description:
          'Tas ransel anti air dengan banyak kompartemen, cocok untuk traveling',
        image:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        category: 'Aksesoris',
        stock: 30
      }
    ];
    save(PRODUCTS_KEY, products);
  }

  // Pastikan array orders ada
  const orders = load(ORDERS_KEY, null);
  if (!orders) {
    save(ORDERS_KEY, []);
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


