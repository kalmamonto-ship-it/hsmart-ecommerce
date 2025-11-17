import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    try {
      await axios.put(`/api/cart/${itemId}`, { quantity: newQuantity });
      fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Gagal mengupdate keranjang');
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Gagal menghapus item');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  };

  if (loading) {
    return <div className="loading">Memuat keranjang...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="page-title">Keranjang Belanja</h1>
          <div className="empty-state">
            <h3>Keranjang Anda kosong</h3>
            <p>Mulai berbelanja untuk menambahkan produk ke keranjang</p>
            <Link to="/products" className="btn btn-primary">
              Jelajahi Produk
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Keranjang Belanja</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.product.image} alt={item.product.name} />
                </div>
                <div className="cart-item-details">
                  <h3>{item.product.name}</h3>
                  <p className="cart-item-category">{item.product.category}</p>
                  <p className="cart-item-price">{formatPrice(item.product.price)}</p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-subtotal">
                  <strong>{formatPrice(item.product.price * item.quantity)}</strong>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                  title="Hapus item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h2>Ringkasan Belanja</h2>
              <div className="summary-row">
                <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} item)</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
              <div className="summary-row total">
                <span><strong>Total</strong></span>
                <span><strong>{formatPrice(calculateTotal())}</strong></span>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary btn-checkout"
              >
                Lanjut ke Checkout
              </button>
              <Link to="/products" className="btn btn-secondary">
                Lanjutkan Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

