import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaShoppingCart } from 'react-icons/fa';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // This is needed for Chart.js
import '../styles/AdminUserManagement.css';
import '../styles/popup.css';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [userStats, setUserStats] = useState({ total: 0, active: 0, blocked: 0 });
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(0);

  

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchOrders();
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchUsers(), fetchPosts(), fetchOrders()]);
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      //Chart
      const response = await axios.get('http://localhost:8080/identity/users');
      const usersData = response.data.result;
      setUsers(usersData);
      const active = usersData.filter((user) => user.availableStatus === 'available').length;
      const blocked = usersData.filter((user) => user.availableStatus === 'blocked').length;
      //Bảnh thông số
      setTotalUsers(usersData.length);
      setActiveUsers(usersData.filter((user) => user.availableStatus === 'available').length);
      setUserStats({ total: usersData.length, active, blocked });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/identity/posts/');
      setPosts(response.data);
      setTotalPosts(response.data.length);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/identity/orders/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  // Xóa post
  const handleDeletePost = async (postID) => {
    try {
      await axios.delete(`http://localhost:8080/identity/posts/${postID}`);
      fetchPosts();
      setPopupMessage("Bài viết đã xóa thành công");
      setShowPopup(true);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleBlockUser = async (userID, isBlocked) => {
    try {
      const availableStatus = isBlocked ? 'available' : 'blocked'; // Đặt trạng thái dựa trên isBlocked
      await axios.put(`http://localhost:8080/identity/users/${userID}/status?status=${availableStatus}`);
      // setPopupMessage("Khóa thành công");
      // setShowPopup(true);
      fetchUsers();
    } catch (error) {
      console.error(`Error ${isBlocked ? 'unblocking' : 'blocking'} user:`, error);
    }
  };

  const handleDeleteUser = async (userID) => {
    try {
      await axios.delete(`http://localhost:8080/identity/users/${userID}`);
      fetchUsers();
      setPopupMessage("Đã xóa tài khoản khách hàng thành công !");
      setShowPopup(true);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSetSeller = async (userID) => {
    try {
      await axios.put(`http://localhost:8080/identity/users/seller/${userID}`);
      setUsers(users.map(user =>
        user.userID === userID ? { ...user, roles: [...user.roles, 'SELLER'] } : user
      ));
      // Update local storage for the logged-in user if their role has changed
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser && currentUser.userID === userID) {
        localStorage.setItem('user', JSON.stringify({
          ...currentUser,
          roles: [...currentUser.roles, 'SELLER']
        }));
      }
      setPopupMessage("Đã cập nhật người dùng thành Seller thành công !");
      setShowPopup(true);
    } catch (error) {
      console.error('Error setting user as Seller:', error);
    }
  };
  

  // Handle delete order
  // const handleDeleteOrder = async (orderID) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/identity/orders/${orderID}`);
  //     fetchOrders();
  //     setPopupMessage("Đơn hàng đã xóa thành công");
  //     setShowPopup(true);
  //   } catch (error) {
  //     console.error('Error deleting order:', error);
  //   }
  // };

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

  // Action handlers for user actions, updated based on your requirements

  const renderDashboard = () => {
    // Pie Chart data for active and blocked users
    const pieData = {
      labels: ['Người dùng hoạt động', 'Người dùng bị khóa'],
      datasets: [
        {
          data: [userStats.active, userStats.blocked],
          backgroundColor: ['#4CAF50', '#FF5733'],
        },
      ],
    };

    // Bar Chart data for users and posts
    const barData = {
      labels: ['TTổng số người dùng', 'Tổng số bài viết'],
      datasets: [
        {
          label: 'Statistics',
          data: [userStats.total, totalPosts],
          backgroundColor: ['#36A2EB', '#FFCE56'],
        },
      ],
    };

    return (
      <div>
       <h2 className='admin-title'>Tổng quan</h2>
            <div className="dashboard">
              <div className="stat">
                <h3>Tổng số người dùng</h3>
                <p>{totalUsers}</p>
              </div>
              {/* <div className="stat">
                <h3>Người dùng hoạt động</h3>
                <p>{activeUsers}</p>
              </div> */}
              {/* <div className="stat">
                <h3>Người dùng bị khóa</h3>
                <p>{blockedUsers}</p>
              </div> */}
              <div className="stat">
                <h3>Tổng số bài viết</h3>
                <p>{totalPosts}</p>
              </div>
            </div>
        {/* <h2 className='admin-title'>Dashboard</h2> */}
        <div className="charts-container">
          <div className="chart">
            <h3>Bảng thông tin người dùng</h3>
            <Pie data={pieData} />
          </div>
          <div className="chart-colum">
            <h3>Tổng số người dùng và bài viết có trong trang web</h3>
            <Bar data={barData} />
          </div>
        </div>
        
      </div>
   

      
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      // Add other case handlers for user list, posts, orders, as in your original code
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
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.userID}>
                      <td>{user.userID}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.roles.join(', ')}</td>
                      <td>
                        <button
                          className='button-block'
                          onClick={() => handleBlockUser(user.userID, user.availableStatus === 'blocked')}
                        >
                          {user.availableStatus === 'available' ? 'Khóa' : 'Bỏ khóa'}
                        </button>
                        <button
                          className='button-delete'
                          onClick={() => handleDeleteUser(user.userID)}
                        >
                          Xóa
                        </button>
                        {!user.roles.includes('SELLER') && (
                          <button
                            className='button-set-seller'
                            onClick={() => handleSetSeller(user.userID)}
                          >
                            Set Seller
                          </button>
                        )}
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
                    <th>Giá (VNĐ)</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.postID}>
                      <td>{post.postID}</td>
                      <td>{post.title}</td>
                      <td>{post.description}</td>
                      <td>{post.price.toLocaleString()}</td>
                      <td>
                        <button className='button-post-delete' onClick={() => handleDeletePost(post.postID)}>Xóa</button>
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
      case 'order-management':
        return (
          <div>
            <h2 className='admin-title'>Quản lý đơn hàng</h2>
            {orders.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Khách hàng</th>
                    <th>Ngày</th>
                    <th>Tổng (VNĐ)</th>
                    <th>Trạng thái</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderID}>
                      <td>{order.orderID}</td>
                      <td>{order.user.username}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>{order.totalPrice.toLocaleString()}</td>
                      <td>{order.status}</td>
                      {/* <td>
                        <button className='button-delete' onClick={() => handleDeleteOrder(order.orderID)}>Xóa</button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không có đơn hàng nào.</p>
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
          <li onClick={() => setActiveTab('order-management')}>
            <FaShoppingCart className="icon" /> Quản lý Đơn hàng
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>

      {showPopup && (
        <div className="popup-overlay">
  <div className="popup-container">
    <div className="popup-icon">✅</div>
    <h2>Thông báo</h2>
    <p className="popup-message">{popupMessage}</p>
    <button
      className="close-button-popup"
      onClick={() => {
        setShowPopup(false);
      }}>
      Đóng
    </button>
  </div>
</div>

      )}
    </div>
  );

};

export default AdminUserManagement;
