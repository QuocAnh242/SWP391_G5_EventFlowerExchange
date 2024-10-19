import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Logo from '../assets/Flower_preview_rev_1.png';
import { FaUser, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';

const products = [
  { id: 1, name: "Rose", description: "Beautiful red roses" },
  { id: 2, name: "Tulip", description: "Bright yellow tulips" },
  { id: 3, name: "Lily", description: "Pure white lilies" },
  { id: 4, name: "Orchid", description: "Delicate purple orchids" },
  { id: 5, name: "Sunflower", description: "Bright and cheerful sunflowers" }
];

function Navbar() {
  const [searchTerm, setSearchTerm] = useState(''); // Store search input
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [user, setUser] = useState(null); // Store user info
  const [cartCount, setCartCount] = useState(0); // Store cart items count
  const navigate = useNavigate();

  // Fetch user and cart data from localStorage after login
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart data

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Parse user data from localStorage
        setUser(parsedUser); // Set the parsed user data in state
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('user'); // Remove corrupted data
      }
    }

    // Update cart count if cart items exist
    setCartCount(storedCart.length);
  }, []);

  // Handle search input changes and filter products
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(value) ||
        product.description.toLowerCase().includes(value)
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]); // Clear results if search is empty
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser(null); // Clear user from state
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="Logo" className="navbar-logo" />
      </div>

      <div className="navbar-center">
        <NavLink exact to="/" className="nav-link" activeClassName="activeLink">Trang chủ</NavLink>
        <NavLink to="/about" className="nav-link" activeClassName="activeLink">Giới thiệu</NavLink>
        <NavLink to="/menu" className="nav-link" activeClassName="activeLink">Bài viết</NavLink>
        <NavLink to="/contact" className="nav-link" activeClassName="activeLink">Liên hệ</NavLink>
        <NavLink to="/blog-page" className="nav-link" activeClassName="activeLink">Blog</NavLink>
      </div>

      <div className="navbar-right">
        {/* Search bar */}
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="search-bar-nav"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((product) => (
                <div key={product.id} className="search-result-item">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User and cart icons */}
        {user ? (
          <>
            <span className="navbar-user">Chào mừng, {user.username || 'User'}</span>
            <Link to={user.roles && user.roles.includes('ADMIN') ? '/admin-user-management' : '/profile-page'}>
              <FaUser className="navbar-icon" />
            </Link>
            <FaSignOutAlt className="navbar-icon" onClick={handleLogout} />
          </>
        ) : (
          <Link to="/login">
            <FaUser className="navbar-icon" />
          </Link>
        )}

        {/* Cart icon with item count */}
        <div className="cart-icon-wrapper">
          <Link to="/cart">
            <FaShoppingBag className="navbar-icon" />
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
