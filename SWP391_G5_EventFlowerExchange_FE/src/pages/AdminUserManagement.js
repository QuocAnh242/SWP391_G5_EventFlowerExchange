// src/components/AdminUserManagement.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminUserManagement.css';


const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
      navigate('/'); // Chuyển hướng nếu không phải admin
    } else {
      fetchUsers(); // Lấy danh sách người dùng nếu là admin
    }
  }, [navigate]);
  // useEffect(() => {
  //   // Giả lập trạng thái tải dữ liệu
  //   const timer = setTimeout(() => {
  //     setLoading(false); // Sau 2 giây, sẽ dừng hiển thị loading
  //   }, 2000); // Bạn có thể thay đổi thời gian này theo yêu cầu

  //   // Cleanup timer nếu component bị unmount
  //   return () => clearTimeout(timer);
  // }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      await axios.post(`http://localhost:8080/admin/users/block/${userId}`);
      fetchUsers(); // Cập nhật lại danh sách sau khi chặn
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/admin/users/delete/${userId}`);
      fetchUsers(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
//   if (loading) {
//     return (
//       <div className="loading-container">
//   <div className="spinner"></div>
//   <p className="loading-text">Đang tải dữ liệu...</p>
// </div>

//     );
//   }

  return (
    <div className="admin-user-management">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isBlocked ? 'Blocked' : 'Active'}</td>
              <td>
                <button onClick={() => handleBlockUser(user.id)}>
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserManagement;
