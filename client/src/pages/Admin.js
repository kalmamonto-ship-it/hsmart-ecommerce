import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  apiGetProducts,
  apiSaveProduct,
  apiDeleteProduct,
  apiGetOrders,
  apiUpdateOrderStatus
} from '../mockApi';
import './Admin.css';

function Admin() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    stock: ''
  });

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchOrders();
    }
  }, [activeTab, user]);

  const fetchProducts = async () => {
    try {
      const data = await apiGetProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await apiGetOrders(user);
      const sortedOrders = data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleProductFormChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      price: '',
      description: '',
      image: '',
      category: '',
      stock: ''
    });
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      stock: product.stock
    });
    setShowProductForm(true);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      await apiSaveProduct(productForm, editingProduct?.id || null);
      setShowProductForm(false);
      fetchProducts();
      alert(editingProduct ? 'Produk berhasil diupdate' : 'Produk berhasil ditambahkan');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Gagal menyimpan produk');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await apiDeleteProduct(id);
        fetchProducts();
        alert('Produk berhasil dihapus');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Gagal menghapus produk');
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiUpdateOrderStatus(orderId, newStatus);
      fetchOrders();
      alert('Status pesanan berhasil diupdate');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Gagal mengupdate status pesanan');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const categories = ['Elektronik', 'Aksesoris', 'Kreatif', 'Produk Digital'];

  return (
    <div className="admin-page">
      <div className="container">
        <h1 className="page-title">Panel Admin</h1>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Kelola Produk
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Kelola Pesanan
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Daftar Produk</h2>
              <button onClick={handleAddProduct} className="btn btn-primary">
                + Tambah Produk
              </button>
            </div>

            {showProductForm && (
              <div className="modal-overlay" onClick={() => setShowProductForm(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <h3>{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                  <form onSubmit={handleSubmitProduct}>
                    <div className="form-group">
                      <label>Nama Produk *</label>
                      <input
                        type="text"
                        name="name"
                        value={productForm.name}
                        onChange={handleProductFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Harga *</label>
                      <input
                        type="number"
                        name="price"
                        value={productForm.price}
                        onChange={handleProductFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Deskripsi *</label>
                      <textarea
                        name="description"
                        value={productForm.description}
                        onChange={handleProductFormChange}
                        required
                        rows="4"
                      />
                    </div>
                    <div className="form-group">
                      <label>URL Gambar *</label>
                      <input
                        type="url"
                        name="image"
                        value={productForm.image}
                        onChange={handleProductFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Kategori *</label>
                      <select
                        name="category"
                        value={productForm.category}
                        onChange={handleProductFormChange}
                        required
                      >
                        <option value="">Pilih Kategori</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Stok *</label>
                      <input
                        type="number"
                        name="stock"
                        value={productForm.stock}
                        onChange={handleProductFormChange}
                        required
                        min="0"
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        {editingProduct ? 'Update' : 'Tambah'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowProductForm(false)}
                        className="btn btn-secondary"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {loading ? (
              <div className="loading">Memuat produk...</div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-admin-card">
                    <div className="product-admin-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-admin-info">
                      <h3>{product.name}</h3>
                      <p className="product-admin-category">{product.category}</p>
                      <p className="product-admin-price">{formatPrice(product.price)}</p>
                      <p className="product-admin-stock">Stok: {product.stock}</p>
                    </div>
                    <div className="product-admin-actions">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Daftar Pesanan</h2>
            </div>

            {loading ? (
              <div className="loading">Memuat pesanan...</div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-admin-card">
                    <div className="order-admin-header">
                      <div>
                        <h3>Pesanan #{order.orderNumber}</h3>
                        <p className="order-admin-date">{formatDate(order.createdAt)}</p>
                        <p><strong>Customer:</strong> {order.customerName}</p>
                      </div>
                      <div className="order-status-control">
                        <label>Status:</label>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">Menunggu</option>
                          <option value="processing">Diproses</option>
                          <option value="shipped">Dikirim</option>
                          <option value="delivered">Selesai</option>
                          <option value="cancelled">Dibatalkan</option>
                        </select>
                      </div>
                    </div>
                    <div className="order-admin-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-admin-item">
                          <span>{item.productName} x{item.quantity}</span>
                          <span>{formatPrice(item.subtotal)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-admin-total">
                      <strong>Total: {formatPrice(order.total)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;

