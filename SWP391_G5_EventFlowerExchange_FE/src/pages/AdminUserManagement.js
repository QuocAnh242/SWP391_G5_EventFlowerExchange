import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminUserManagement.css';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard'); // Quản lý tab

  useEffect(() => {
    fetchUsers();
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
      await axios.delete('http://localhost:8080/identity/users/1');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
 //Thanh tìm kiếm
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

  // Hàm render từng tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2>Tổng quan</h2>
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
            <h2>Danh sách người dùng</h2>
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
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.isBlocked ? 'Bị khóa' : 'Hoạt động'}</td>
                      <td>
                        <button onClick={() => handleBlockUser(user.id, user.isBlocked)}>
                          {user.isBlocked ? 'Bỏ khóa' : 'Khóa'}
                        </button>
                        <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
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
      // Bạn có thể thêm các tab khác như Chi tiết người dùng, Quản lý quyền hạn, v.v.
      default:
        return null;
    }
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li onClick={() => setActiveTab('dashboard')}>Dashboard Tổng quan</li>
          <li onClick={() => setActiveTab('userList')}>Danh sách người dùng</li>
          {/* <li onClick={() => setActiveTab('userDetails')}>Chi tiết người dùng</li> */}
          <li onClick={() => setActiveTab('roleManagement')}>Yêu cầu của người dùng</li>
          <li onClick={() => setActiveTab('interactionManagement')}>Quản lý Post</li>
          <li onClick={() => setActiveTab('logsReports')}>Logs và Báo cáo</li>
        </ul>
      </div>

      {/* Nội dung chính */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminUserManagement;
