import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import api from '../config/axios';
import '../styles/Login.css';
import Footer from '../components/Footer';
// import withLoading from '../components/withLoading';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Thêm trạng thái loadQing

  const navigate = useNavigate();


  useEffect(() => {
    // Giả lập trạng thái tải dữ liệu
    const timer = setTimeout(() => {
      setLoading(false); // Sau 2 giây, sẽ dừng hiển thị loading
    }, 2000); // Bạn có thể thay đổi thời gian này theo yêu cầu

    // Cleanup timer nếu component bị unmount
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải dữ liệu...</p>
      </div>

    );
  }



  // Function to decode JWT token
const decodeToken = (token) => {
  const tokenParts = token.split('.');

  if (tokenParts.length !== 3) {
      throw new Error("Invalid JWT token");
  }

  const base64Url = tokenParts[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
      atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
  );

  return JSON.parse(jsonPayload);
};

const handleLogin = async (e) => {
  e.preventDefault(); // Prevent the page from reloading

  try {
      const response = await api.post('http://localhost:8080/identity/auth/token', {
          email,
          password,
      });

      // Get the token from the response
      const { token } = response.data.result; // Adjusted to match your provided structure

      // Save the JWT token in localStorage
      localStorage.setItem('token', token);

      // Decode the JWT token to extract the payload
      const decodedPayload = decodeToken(token);
      console.log("Decoded JWT Payload:", decodedPayload);

      // Extract the role from the decoded token
      const { roles } = decodedPayload;

      // Alert login success
      // alert('Login successful!');

      // Navigate based on user role
      if (roles.includes('ADMIN')) {
          navigate('/admin-user-management'); // Redirect to admin page
      } else if (roles.includes('BUYER')) {
          navigate('/'); // Redirect to home page
      } else {
        setError("Tài khoản hoặc mật khẩu sai");
      }
      window.location.reload();
  } catch (error) {
      // Handle errors by logging the response data or message
       // Cập nhật thông báo lỗi trong trường hợp yêu cầu thất bại
       setError("Tài khoản hoặc mật khẩu sai");
  }
};





// Ẩn hiện password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleGoogleLoginSuccess = async (credentialResponse) => {
  //   const googleToken = credentialResponse.credential; // Lấy token từ Google

  //   try {
  //     const response = await api.post('http://localhost:8080/identity/', {
  //       idToken: googleToken,
  //     });

  //     const { token, role, email } = response.data;
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("userEmail", email);
  //     localStorage.setItem("userRole", role);

  //     role === 'admin' ? navigate("/admin") : navigate("/");
  //   } catch (error) {
  //     setError('Google login failed. Please try again.');
  //   }
  // };



  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Đăng nhập</h2>
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
            <label htmlFor="password" className="form-label">Mật khẩu</label>

            {/* Password toggle icon */}
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="forgot-password">Quên mật khẩu?</div>

          {/* Display error message */}
          {error && <div className="error-message" style={{ color: "red", marginTop: "10px" }}>{error}</div>}

          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </form>

        <div className="social-login">
          <p>Or Sign up using</p>
          <div className="social-icons">
            {/* <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaGoogle /></a> */}
          </div>
        </div>
        <div className="signup-link">
          Bạn chưa có tài khoản? <Link to="/signup">Đăng kí tại đây</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;   
