import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiGetProducts } from '../mockApi';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const data = await apiGetProducts();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getAverageRating = (product) => {
    if (!product.reviews || product.reviews.length === 0) return null;
    const total = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / product.reviews.length).toFixed(1);
  };

  if (loading) {
    return <div className="loading">Memuat produk...</div>;
  }

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">Daftar Produk</h1>

        <div className="products-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Semua' : category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h3>Produk tidak ditemukan</h3>
            <p>Coba gunakan kata kunci atau kategori yang berbeda</p>
          </div>
        ) : (
          <>
            <p className="products-count">
              Menampilkan {filteredProducts.length} produk
            </p>
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <Link to={`/products/${product.id}`}>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      {product.stock === 0 && (
                        <div className="out-of-stock">Stok Habis</div>
                      )}
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-category">{product.category}</p>
                      {getAverageRating(product) && (
                        <p className="product-rating">
                          ⭐ {getAverageRating(product)} ({product.reviews.length} ulasan)
                        </p>
                      )}
                      <p className="product-price">{formatPrice(product.price)}</p>
                      <p className="product-stock">
                        Stok: {product.stock} &nbsp;•&nbsp; Terjual: {product.sold || 0}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Products;

