import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import api from '../config/axios';
import '../styles/Login.css';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái loading ban đầu là false
  const navigate = useNavigate();

  // Hàm login
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn không cho trang reload khi submit form
    setLoading(true); // Bắt đầu quá trình login nên bật loading

    try {
      const response = await api.post('http://localhost:8080/identity/auth/token', {
        email: email,
        password: password,
    });

      // Giả sử backend trả về { jwt: 'token_value', role: 'USER_ROLE' }
      const { jwt: token, role } = response.data;

      // Lưu token vào localStorage
      localStorage.setItem('token', token);

      alert('Login successful!');

      // Điều hướng dựa trên role của người dùng
      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'BUYER') {
        navigate('/home');
      } else {
        navigate('/dashboard'); // Điều hướng mặc định nếu không rõ role
      }
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      // Hiển thị thông báo lỗi chi tiết
      setError(error.response?.data?.message || 'Login failed! Check your credentials.');
    } finally {
      setLoading(false); // Dừng loading sau khi hoàn thành
    }
  };

  // Hàm để ẩn/hiện mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <div className="form-field">
            <input
              className="form-input"
              placeholder=" "
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="form-label">Email</label>
          </div>

          <div className="form-field password-field">
            <input
              className="form-input"
              placeholder=" "
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="form-label">Password</label>

            {/* Biểu tượng ẩn/hiện mật khẩu */}
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="forgot-password">Forgot password?</div>

          {/* Hiển thị thông báo lỗi nếu có */}
          {error && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>

        <div className="social-login">
          <p>Or Sign up using</p>
          <div className="social-icons">
            {/* Các icon social có thể được thêm ở đây */}
          </div>
        </div>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
