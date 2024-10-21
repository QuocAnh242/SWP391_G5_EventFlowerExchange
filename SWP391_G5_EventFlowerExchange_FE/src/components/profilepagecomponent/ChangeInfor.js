import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChangeInfor.css'; 

const ChangeInfoPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    address: '',
    phoneNumber: ''
  });

  const [userID, setUserID] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserID(parsedUser.userID);
    } else {
      setErrorMessage('User ID not found');
    }
  }, []);

  useEffect(() => {
    if (userID) {
      axios.get(`http://localhost:8080/identity/users/${userID}`)
        .then(response => {
          setFormData({
            username: response.data.username,
            address: response.data.address,
            phoneNumber: response.data.phoneNumber
          });
        })
        .catch(error => {
          setErrorMessage('Error fetching user data');
        });
    }
  }, [userID]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userID) {
      axios.put(`http://localhost:8080/identity/users/${userID}`, formData)
        .then(response => {
          setSuccessMessage('Update user successfully');
          setErrorMessage('');
        })
        .catch(error => {
          if (error.response) {
            setErrorMessage(error.response.data.message || 'Failed to update user');
          } else {
            setErrorMessage('Failed to update user');
          }
        });
    } else {
      setErrorMessage('User ID is missing');
    }
  };

  return (
    <div className="change-info-container">
      <h2>Thay đổi thông tin</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="change-info-form">
        <div>
          <label>Tên người dùng : </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mật khẩu : </label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Địa chỉ : </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Số điện thoại : </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default ChangeInfoPage;
