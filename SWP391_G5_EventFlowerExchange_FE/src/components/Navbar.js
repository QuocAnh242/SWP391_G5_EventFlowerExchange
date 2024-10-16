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
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null); // Store user info
  const [cartCount, setCartCount] = useState(0); // Cart items count
  const navigate = useNavigate();

  // Fetch user data and cart data from localStorage after login
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Safely parse JSON
        setUser(parsedUser); // Set the parsed user data
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Clear localStorage if invalid data is stored
        localStorage.removeItem('user');
      }
    }

    // Update cart count if items are present in the cart
    setCartCount(storedCart.length);
  }, []);

  // const toggleSearchBar = () => {
  //   setIsSearchVisible(!isSearchVisible);
  //   if (!isSearchVisible) {
  //     setSearchTerm('');
  //     setSearchResults([]);
  //   }
  // };

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
      setSearchResults([]);
    }
  };

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setUser(null); // Remove user data from state
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
        {/* <NavLink to="/cart" className="nav-link" activeClassName="activeLink">Cart</NavLink> */}
        {/* <NavLink to="/admin-user-management" className="nav-link" activeClassName="activeLink">Test</NavLink> */}
      </div>

      <div className="navbar-right">
        {/* Icon search (giữ nếu bạn vẫn muốn hiển thị icon, nhưng không cần tính năng click) */}
        {/* <FaSearch className="navbar-icon" /> */}

        {/* Search input field (luôn hiển thị) */}
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
            <span className="navbar-user">Welcome, {user.username || 'User'}</span>
            <Link to={user.role === 'admin' ? '/admin-user-management' : '/profile-page'}>
              <FaUser className="navbar-icon" />
            </Link>
            <FaSignOutAlt className="navbar-icon" onClick={handleLogout} />
          </>
        ) : (
          <Link to="/login">
            <FaUser className="navbar-icon" />
          </Link>
        )}


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
