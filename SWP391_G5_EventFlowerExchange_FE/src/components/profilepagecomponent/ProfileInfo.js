//Mục hiển thị thông tin tài khoản trong Profile Page
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileInfo = ({ userID }) => {
  const [profile, setUserProfile] = useState({
    userID: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (userID) {
      loadUserProfile(userID);
    }
  }, [userID]);

  const loadUserProfile = async (userID) => {
    try {
      const result = await axios.get(`http://localhost:8080/identity/users/${userID}`);
      setUserProfile(result.data);
    } catch (error) {
      console.error("Error loading user profile:", error);
      setError("Failed to load user profile. Please try again.");
    }
  };

  const handleChange = (e) => {
    setUserProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/identity/users/${profile.userID}`, profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="profile-info-component">
      <h2>Your Profile Info</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleUpdate}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            readOnly
          />
        </label>
        
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileInfo;
