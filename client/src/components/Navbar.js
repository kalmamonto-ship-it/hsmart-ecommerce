import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiGetCart } from '../mockApi';
import './Navbar.css';

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCartCount();
      const interval = setInterval(fetchCartCount, 2000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user]);

  const fetchCartCount = async () => {
    try {
      const items = await apiGetCart(user.id);
      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    } catch (error) {
      // Ignore errors if not authenticated
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h1>✨ HSMart</h1>
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Beranda</Link>
          <Link to="/products" className="navbar-link">Produk</Link>
          
          {isAuthenticated ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="navbar-link">Admin</Link>
              )}
              <Link to="/orders" className="navbar-link">Pesanan</Link>
              <Link to="/cart" className="navbar-link cart-link">
                Keranjang
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <div className="navbar-user">
                <span className="user-name">{user.name}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Keluar
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Masuk</Link>
              <Link to="/register" className="btn-nav-register">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

