require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const { 
  generateToken, 
  hashPassword, 
  comparePassword, 
  authenticateToken, 
  requireAdmin 
} = require('./auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow all origins in production
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data storage files
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Initialize data directory and files
async function initializeData() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Initialize products
    try {
      await fs.access(PRODUCTS_FILE);
    } catch {
      const initialProducts = [
        {
          id: '1',
          name: 'Laptop ASUS ROG Strix',
          price: 15000000,
          description: 'Laptop gaming high performance dengan processor Intel i7 dan GPU RTX 4060',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
          category: 'Elektronik',
          stock: 15
        },
        {
          id: '2',
          name: 'Smartphone Samsung Galaxy S24',
          price: 12000000,
          description: 'Smartphone flagship dengan kamera 108MP dan layar AMOLED 120Hz',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
          category: 'Elektronik',
          stock: 25
        },
        {
          id: '3',
          name: 'Sepatu Nike Air Max',
          price: 1500000,
          description: 'Sepatu olahraga dengan teknologi Air Max untuk kenyamanan maksimal',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          category: 'Fashion',
          stock: 50
        },
        {
          id: '4',
          name: 'Kemeja Formal Pria',
          price: 350000,
          description: 'Kemeja formal berkualitas tinggi, cocok untuk acara resmi',
          image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb561e?w=500',
          category: 'Fashion',
          stock: 30
        },
        {
          id: '5',
          name: 'Headphone Sony WH-1000XM5',
          price: 4500000,
          description: 'Headphone noise cancelling premium dengan kualitas suara Hi-Fi',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
          category: 'Elektronik',
          stock: 20
        },
        {
          id: '6',
          name: 'Tas Ransel Backpack',
          price: 450000,
          description: 'Tas ransel anti air dengan banyak kompartemen, cocok untuk traveling',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
          category: 'Aksesoris',
          stock: 40
        },
        {
          id: '7',
          name: 'Jam Tangan Smartwatch',
          price: 2500000,
          description: 'Smartwatch dengan fitur kesehatan, GPS, dan notifikasi smartphone',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
          category: 'Elektronik',
          stock: 18
        },
        {
          id: '8',
          name: 'Kamera Canon EOS R6',
          price: 35000000,
          description: 'Kamera mirrorless profesional dengan sensor full-frame 20MP',
          image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500',
          category: 'Elektronik',
          stock: 8
        }
      ];
      await fs.writeFile(PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2));
    }

    // Initialize orders
    try {
      await fs.access(ORDERS_FILE);
    } catch {
      await fs.writeFile(ORDERS_FILE, JSON.stringify([], null, 2));
    }

    // Initialize users with default admin
    try {
      await fs.access(USERS_FILE);
    } catch {
      const adminPassword = await hashPassword('admin123');
      const defaultUsers = [
        {
          id: uuidv4(),
          name: 'Admin',
          email: 'admin@ecommerce.com',
          password: adminPassword,
          role: 'admin',
          createdAt: new Date().toISOString()
        }
      ];
      await fs.writeFile(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
      console.log('Default admin created: admin@ecommerce.com / admin123');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// Helper functions
async function readProducts() {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeProducts(products) {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

async function readOrders() {
  try {
    const data = await fs.readFile(ORDERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeOrders(orders) {
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Get user cart file path
function getUserCartFile(userId) {
  return path.join(DATA_DIR, `cart_${userId}.json`);
}

async function readUserCart(userId) {
  try {
    const cartFile = getUserCartFile(userId);
    const data = await fs.readFile(cartFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeUserCart(userId, cart) {
  const cartFile = getUserCartFile(userId);
  await fs.writeFile(cartFile, JSON.stringify(cart, null, 2));
}

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const users = await readUsers();
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role: 'customer',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeUsers(users);

    const token = generateToken(newUser);
    res.json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = await readUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== PRODUCT ROUTES ====================

// Get all products (public)
app.get('/api/products', async (req, res) => {
  try {
    const products = await readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product (public)
app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await readProducts();
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add product (Admin only)
app.post('/api/products', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const products = await readProducts();
    const newProduct = {
      id: uuidv4(),
      name: req.body.name,
      price: parseInt(req.body.price),
      description: req.body.description,
      image: req.body.image || 'https://via.placeholder.com/500',
      category: req.body.category,
      stock: parseInt(req.body.stock) || 0
    };
    products.push(newProduct);
    await writeProducts(products);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product (Admin only)
app.put('/api/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const products = await readProducts();
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    products[index] = { ...products[index], ...req.body };
    await writeProducts(products);
    res.json(products[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product (Admin only)
app.delete('/api/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const products = await readProducts();
    const filtered = products.filter(p => p.id !== req.params.id);
    await writeProducts(filtered);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== CART ROUTES (User specific) ====================

// Get user cart
app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    const cart = await readUserCart(req.user.id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to cart
app.post('/api/cart', authenticateToken, async (req, res) => {
  try {
    const cart = await readUserCart(req.user.id);
    const { productId, quantity } = req.body;
    
    const products = await readProducts();
    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.push({
        id: uuidv4(),
        productId,
        product: product,
        quantity: quantity || 1
      });
    }
    
    await writeUserCart(req.user.id, cart);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cart item
app.put('/api/cart/:id', authenticateToken, async (req, res) => {
  try {
    const cart = await readUserCart(req.user.id);
    const item = cart.find(item => item.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    item.quantity = req.body.quantity;
    await writeUserCart(req.user.id, cart);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from cart
app.delete('/api/cart/:id', authenticateToken, async (req, res) => {
  try {
    const cart = await readUserCart(req.user.id);
    const filtered = cart.filter(item => item.id !== req.params.id);
    await writeUserCart(req.user.id, filtered);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear cart
app.delete('/api/cart', authenticateToken, async (req, res) => {
  try {
    await writeUserCart(req.user.id, []);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ORDER ROUTES ====================

// Get user orders
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await readOrders();
    if (req.user.role === 'admin') {
      // Admin can see all orders
      res.json(orders);
    } else {
      // Customer can only see their own orders
      const userOrders = orders.filter(o => o.userId === req.user.id);
      res.json(userOrders);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
app.get('/api/orders/:id', authenticateToken, async (req, res) => {
  try {
    const orders = await readOrders();
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    // Check if user owns the order or is admin
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create order
app.post('/api/orders', authenticateToken, async (req, res) => {
  try {
    const cart = await readUserCart(req.user.id);
    if (cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const orders = await readOrders();
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    const total = cart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    const users = await readUsers();
    const user = users.find(u => u.id === req.user.id);

    const newOrder = {
      id: uuidv4(),
      orderNumber: `ORD-${Date.now()}`,
      userId: req.user.id,
      userName: user.name,
      userEmail: user.email,
      items: cart.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        subtotal: item.product.price * item.quantity
      })),
      address,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    await writeOrders(orders);
    
    // Clear cart after order
    await writeUserCart(req.user.id, []);
    
    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (Admin only)
app.put('/api/orders/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const orders = await readOrders();
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.status = req.body.status;
    await writeOrders(orders);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
initializeData().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Default admin: admin@ecommerce.com / admin123`);
  });

  // Handle port already in use error
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`\n❌ Error: Port ${PORT} is already in use!`);
      console.log(`\n💡 Solusi:`);
      console.log(`   1. Tutup aplikasi lain yang menggunakan port ${PORT}`);
      console.log(`   2. Atau ubah PORT di file .env atau environment variable`);
      console.log(`   3. Atau jalankan: netstat -ano | findstr :${PORT}`);
      console.log(`      Lalu kill process dengan: taskkill /F /PID <PID>\n`);
      process.exit(1);
    } else {
      console.error('❌ Server error:', error);
      process.exit(1);
    }
  });
});
