import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  apiGetCart,
  apiCreateOrder
} from '../mockApi';
import './Checkout.css';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [address, setAddress] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const data = await apiGetCart(user.id);
      setCart(data);
      setLoading(false);
      
      if (data.length === 0) {
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!address) {
      alert('Mohon lengkapi alamat pengiriman');
      return;
    }

    setSubmitting(true);
    try {
      const order = await apiCreateOrder(user, address);
      alert(`Pesanan berhasil dibuat! Nomor pesanan: ${order.orderNumber}`);
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Gagal membuat pesanan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
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
    return <div className="loading">Memuat...</div>;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <div className="form-card">
              <h2>Data Pemesanan</h2>
              
              <div className="user-info-section">
                <h3>Informasi Pengguna</h3>
                <div className="info-row">
                  <span className="info-label">Nama:</span>
                  <span className="info-value">{user.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Alamat Pengiriman *</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows="4"
                    placeholder="Masukkan alamat lengkap pengiriman"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-large"
                >
                  {submitting ? 'Memproses...' : 'Buat Pesanan'}
                </button>
              </form>
            </div>
          </div>

          <div className="checkout-summary-section">
            <div className="summary-card">
              <h2>Ringkasan Pesanan</h2>
              
              <div className="order-items">
                {cart.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="order-item-info">
                      <h4>{item.product.name}</h4>
                      <p>{item.quantity} x {formatPrice(item.product.price)}</p>
                    </div>
                    <div className="order-item-total">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-total">
                <div className="summary-row">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} item)</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                <div className="summary-row total">
                  <span><strong>Total</strong></span>
                  <span><strong>{formatPrice(calculateTotal())}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

