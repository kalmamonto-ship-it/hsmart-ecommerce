import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiGetProducts } from '../mockApi';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await apiGetProducts();
      setProducts(data.slice(0, 6)); // Show only 6 products on home
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
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

  if (loading) {
    return <div className="loading">Memuat produk...</div>;
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Perlengkapan Produktivitas untuk Mahasiswa & Pekerja Muda</h1>
            <p>
              HSMart membantu kamu belajar dan bekerja lebih fokus dengan laptop, aksesoris,
              dan alat kreatif pilihan.
            </p>
            <Link to="/products" className="btn btn-primary">
              Jelajahi Produk Produktivitas
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Produk Unggulan</h2>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/products" className="btn btn-secondary">
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🚚</div>
              <h3>Pengiriman Cepat</h3>
              <p>Pengiriman ke seluruh Indonesia</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🔒</div>
              <h3>Pembayaran Aman</h3>
              <p>Transaksi terjamin keamanannya</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💯</div>
              <h3>Kualitas Terjamin</h3>
              <p>Produk original dan berkualitas</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎁</div>
              <h3>Promo Menarik</h3>
              <p>Diskon dan penawaran spesial</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

