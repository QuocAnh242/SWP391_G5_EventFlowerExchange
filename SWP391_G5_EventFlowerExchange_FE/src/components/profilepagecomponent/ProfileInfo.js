// Mục hiển thị thông tin tài khoản trong Profile Page
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileInfo.css';

const ProfileInfo = ({ userID }) => {
  const [profile, setUserProfile] = useState({
    userID: '',
    username: '', 
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
      loadUserProfile(userID);
  }, [userID]);

  const loadUserProfile = async (userID) => {
    try {
      const result = await axios.get(`http://localhost:8080/identity/users/${userID}`);
      setUserProfile(result.data);
    } catch (error) {
      console.error("Error loading user profile:", error);
      setError("Không thể tải thông tin hồ sơ người dùng. Vui lòng thử lại");
    }
  };

  const handleChange = (e) => {
    setUserProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/identity/users/${profile.userID}`, profile);
      setSuccessMessage("Bạn đã cập nhật thành công thông tin của bạn!"); // Set success message
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Không thể cập nhật thông tin. Vui lòng thử lại.");
      setSuccessMessage(''); // Clear any success message in case of error
    }
  };

  return (
    <div className="profile-info-component">
      <h2>Thông tin của bạn</h2>

      <form onSubmit={handleUpdate}>
        <label>
          Họ và Tên  :
          <input className='name'
            type="text"
            name="username"
            value={setUserProfile.username}
            onChange={handleChange}
            readOnly
          />
        </label>

        <label>
          Email:
          <input className='mail'
            type="email"
            name="email"
            value={setUserProfile.email}
            onChange={handleChange}
            readOnly
          />
        </label>

        <label>
          Số điện thoại :
          <input className='phone'
            type="text"
            name="phoneNumber"
            value={setUserProfile.phoneNumber}
            onChange={handleChange}
          />
        </label>

        <label>
          Địa chỉ:
          <input className='address'
            type="text"
            name="address"
            value={setUserProfile.address}
            onChange={handleChange}
          />
        </label>

        <button className='profile-submit' type="submit">Cập nhật</button> {/* Corrected button class */}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
      </form>
    </div>
  );
};

export default ProfileInfo;
