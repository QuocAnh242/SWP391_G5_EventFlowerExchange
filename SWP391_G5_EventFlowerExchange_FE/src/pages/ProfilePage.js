import "../styles/ProfilePage.css";
import React, { useState, useEffect } from "react";
import Footer from '../components/Footer';
import axios from "axios";

const ProfilePage = () => {
  const [profile, setUserProfile] = useState({
    userID: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });

  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile'); // Add state for active tab
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate data loading with a timeout for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Stop showing loading after 2 seconds
    }, 2000);

    // Cleanup the timer in case the component unmounts
    return () => clearTimeout(timer);
  }, []);

  


  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (loggedInUser && loggedInUser.userID) {
      loadUserProfile(loggedInUser.userID);
    } else {
      setError("No user is logged in.");
    }
  }, []);

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <form onSubmit={handleUpdate}>
            <label>
              Username:
              <input 
                type="text" 
                name="username" 
                value={profile.username} 
                onChange={handleChange} 
                disabled 
              />
            </label>

            <label>
              Email:
              <input 
                type="email" 
                name="email" 
                value={profile.email} 
                onChange={handleChange} 
                disabled 
              />
            </label>

            <label>
              Password:
              <input 
                type="password" 
                name="password" 
                value={profile.password} 
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
        );
      case 'password':
        return <h2>Change Password Section</h2>; // Add actual content here
      case 'orders':
        return <h2>My Orders Section</h2>; // Add actual content here
      case 'logout':
        return <h2>Logout Section</h2>; // Add actual content here
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      {/* Show loading spinner if data is loading */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          {/* Sidebar */}
          <div className="sidebar">
            <h2>Account Settings</h2>
            <ul>
              <li><a href="#profile" onClick={() => setActiveTab('profile')}>Profile Info</a></li>
              <li><a href="#password" onClick={() => setActiveTab('password')}>Change Password</a></li>
              <li><a href="#orders" onClick={() => setActiveTab('orders')}>My Orders</a></li>
              <li><a href="#logout" onClick={() => setActiveTab('logout')}>Logout</a></li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="profile-content">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h1>
            {error && <p className="error-message">{error}</p>}
            {renderTabContent()}
          </div>

          <Footer />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
