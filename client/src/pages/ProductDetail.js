import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (product.stock === 0) {
      alert('Produk sedang tidak tersedia');
      return;
    }

    if (quantity > product.stock) {
      alert(`Stok hanya tersedia ${product.stock} unit`);
      return;
    }

    setAddingToCart(true);
    try {
      await axios.post('/api/cart', {
        productId: product.id,
        quantity: quantity
      });
      alert('Produk berhasil ditambahkan ke keranjang!');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Gagal menambahkan produk ke keranjang');
    } finally {
      setAddingToCart(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return <div className="loading">Memuat detail produk...</div>;
  }

  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Produk tidak ditemukan</h3>
          <Link to="/products" className="btn btn-primary">
            Kembali ke Daftar Produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link to="/products" className="back-link">← Kembali ke Daftar Produk</Link>

        <div className="product-detail">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-details-section">
            <div className="product-category-badge">{product.category}</div>
            <h1>{product.name}</h1>
            <p className="product-price-large">{formatPrice(product.price)}</p>

            <div className="product-info">
              <p className="product-description">{product.description}</p>
              
              <div className="stock-info">
                <strong>Stok Tersedia:</strong> {product.stock} unit
                {product.stock === 0 && (
                  <span className="out-of-stock-badge">Stok Habis</span>
                )}
              </div>
            </div>

            <div className="quantity-selector">
              <label>Jumlah:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, Math.min(val, product.stock)));
                  }}
                  min="1"
                  max={product.stock}
                  className="quantity-input"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-actions">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addingToCart}
                className="btn btn-primary btn-large"
              >
                {addingToCart ? 'Menambahkan...' : 'Tambah ke Keranjang'}
              </button>
              <Link to="/cart" className="btn btn-secondary btn-large">
                Lihat Keranjang
              </Link>
            </div>

            <div className="total-price">
              <strong>Subtotal:</strong> {formatPrice(product.price * quantity)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

