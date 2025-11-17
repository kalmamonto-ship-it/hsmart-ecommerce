import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      // Sort by newest first
      const sortedOrders = response.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Menunggu', class: 'status-pending' },
      processing: { label: 'Diproses', class: 'status-processing' },
      shipped: { label: 'Dikirim', class: 'status-shipped' },
      delivered: { label: 'Selesai', class: 'status-delivered' },
      cancelled: { label: 'Dibatalkan', class: 'status-cancelled' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`status-badge ${config.class}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return <div className="loading">Memuat pesanan...</div>;
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1 className="page-title">Daftar Pesanan</h1>

        {orders.length === 0 ? (
          <div className="empty-state">
            <h3>Belum ada pesanan</h3>
            <p>Pesanan Anda akan muncul di sini setelah checkout</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Pesanan #{order.orderNumber}</h3>
                    <p className="order-date">{formatDate(order.createdAt)}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="order-customer">
                  <p><strong>Nama:</strong> {order.userName}</p>
                  <p><strong>Email:</strong> {order.userEmail}</p>
                  <p><strong>Alamat:</strong> {order.address}</p>
                </div>

                <div className="order-items">
                  <h4>Item Pesanan:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="order-item-info">
                        <span>{item.productName}</span>
                        <span className="order-item-quantity">x{item.quantity}</span>
                      </div>
                      <span className="order-item-price">
                        {formatPrice(item.subtotal)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <strong>Total: {formatPrice(order.total)}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;

