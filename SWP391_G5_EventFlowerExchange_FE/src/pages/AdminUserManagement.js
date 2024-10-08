import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTachometerAlt, FaUsers, FaClipboardList } from 'react-icons/fa'; // Import các icon từ react-icons
import '../styles/AdminUserManagement.css';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(0);
  const [posts, setPosts] = useState([]); 
  const [activeTab, setActiveTab] = useState('dashboard');
  // const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  
   //hiện thông tin khách hàng và bài post
  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);
  


 


  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/identity/users');
      const usersData = response.data;
      setUsers(usersData);
      setTotalUsers(usersData.length);
      setActiveUsers(usersData.filter((user) => !user.isBlocked).length);
      setBlockedUsers(usersData.filter((user) => user.isBlocked).length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/identity/post/');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/identity/post/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleBlockUser = async (userId, isBlocked) => {
    try {
      const action = isBlocked ? 'unblock' : 'block';
      await axios.post(`http://localhost:8080/admin/users/${action}/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error(`Error ${isBlocked ? 'unblocking' : 'blocking'} user:`, error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/identity/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2 className='admin-title'>Tổng quan</h2>
            <div className="dashboard">
              <div className="stat">
                <h3>Tổng số người dùng</h3>
                <p>{totalUsers}</p>
              </div>
              <div className="stat">
                <h3>Người dùng hoạt động</h3>
                <p>{activeUsers}</p>
              </div>
              <div className="stat">
                <h3>Người dùng bị khóa</h3>
                <p>{blockedUsers}</p>
              </div>
            </div>
          </div>
        );
      case 'userList':
        return (
          <div>
            <h2 className='admin-title'>Danh sách người dùng</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {filteredUsers.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.userID}>
                      <td>{user.userID}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.isBlocked ? 'Bị khóa' : 'Hoạt động'}</td>
                      <td>
                        <button className='button-block' onClick={() => handleBlockUser(user.id, user.isBlocked)}>
                          {user.isBlocked ? 'Bỏ khóa' : 'Khóa'}
                        </button>
                        <button className='button-delete' onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không tìm thấy người dùng nào.</p>
            )}
          </div>
        );
      case 'post-setting':
        return (
          <div>
            <h2 className='admin-title'>Quản lý bài viết</h2>
            {posts.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.postID}>
                      <td>{post.postID}</td>
                      <td>{post.title}</td>
                      <td>{post.description}</td>
                      <td>{post.price}₫</td>
                      <td>
                        <button className='button-post-delete' onClick={() => handleDeletePost(post.id)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không có bài viết nào.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li onClick={() => setActiveTab('dashboard')}>
            <FaTachometerAlt className="icon" /> Dashboard Tổng quan
          </li>
          <li onClick={() => setActiveTab('userList')}>
            <FaUsers className="icon" /> Danh sách người dùng
          </li>
          <li onClick={() => setActiveTab('post-setting')}>
            <FaClipboardList className="icon" /> Quản lý Post
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminUserManagement;
