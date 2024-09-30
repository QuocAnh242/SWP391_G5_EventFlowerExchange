import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for visibility toggle
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import api from '../config/axios';
import { useNavigate } from 'react-router-dom';

import '../styles/SignUp.css';

const SignUp = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle for Password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for Confirm Password visibility
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    } else {
      setErrorMessage('');
    }

    try {
      // API request to send signup data to the server
      const response = await api.post('http://localhost:8080/identity/users/create ', {
        username,
        email,
        password,
        phoneNumber,
      });

      // Handle success response from the server
      // setSuccessMessage('Account created successfully! You can now log in.');
      navigate("/login");
      console.log('Signup success:', response.data);

      // Optionally, redirect to login page or clear the form
    } catch (error) {
      // Handle error response
      setErrorMessage(
        error.response?.data?.message || 'Failed to create account. Please try again.'
      );
      console.error('Signup error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle the confirm password visibility
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="signup-container">
          <div className="signup-form">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Name</label>
                <div className="input-container">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Email</label>
                <div className="input-container">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-container">
                  <input
                    type={showPassword ? 'text' : 'password'} // Toggle between text and password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  {/* Toggle password visibility */}
                  <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-container">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'} // Toggle between text and password for confirm password
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                  {/* Toggle confirm password visibility */}
                  <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="input-group">
                <label>Phone</label>
                <div className="input-container">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}

              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </form>
            <div className="already-account">
              <p>Already have an account? <Link to="/login">Sign In</Link></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
