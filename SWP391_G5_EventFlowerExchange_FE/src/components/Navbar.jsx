import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Logo from '../assets/Flower_preview_rev_1.png';
import { FaUser, FaShoppingBag, FaSignOutAlt, FaBell } from 'react-icons/fa';
import axios from 'axios';

function Navbar({ cartCount }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); 

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Fetch notifications on mount
  useEffect(() => {
    axios.get('http://localhost:8080/identity/noti/')
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error('Error fetching notifications:', error));
  }, []);

  // Fetch posts on mount
  useEffect(() => {
    axios.get('http://localhost:8080/identity/posts/')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  // Handle search input change and filter posts based on search term
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setSearchResults(
      value ? posts.filter(post => 
        post.title.toLowerCase().includes(value) || post.content?.toLowerCase().includes(value)
      ) : []
    );
  };

  // Toggle notification panel visibility
  const toggleNotificationPanel = () => setShowNotificationPanel(prev => !prev);

  // Auto-close notification panel after 5 seconds
  useEffect(() => {
    if (showNotificationPanel) {
      const timer = setTimeout(() => setShowNotificationPanel(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotificationPanel]);

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotificationPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="Logo" className="navbar-logo" />
      </div>

      <div className="navbar-center">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Trang chủ</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Giới thiệu</NavLink>
        <NavLink to="/menu" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Bài viết</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Feedback</NavLink>
        <NavLink to="/blog-page" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Blog</NavLink>
      </div>

      <div className="navbar-right">
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="search-bar-nav"
            placeholder="Tìm kiếm bài viết..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((post) => (
                <Link to={`/menu`} key={post.id} className="search-result-item">
                  <h4>{post.title}</h4>
                  <p>{post.content ? post.content.substring(0, 100) : 'No content available'}...</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {user ? (
          <>
            <span className="navbar-user">Xin chào, {user.username || 'User'}</span>
            <Link to={user?.roles?.includes('ADMIN') ? '/admin-user-management' : '/profile-page'}>
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
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>

        {/* Notification bell */}
        <div className="notification-icon-wrapper" onClick={toggleNotificationPanel} ref={notificationRef}>
          <FaBell className="navbar-icon" />
          {showNotificationPanel && (
            <div className="notification-panel">
              <h4>Thông báo</h4>
              <ul>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <li key={notification.id}>{notification.content}</li>
                  ))
                ) : (
                  <li>Không có thông báo nào</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
