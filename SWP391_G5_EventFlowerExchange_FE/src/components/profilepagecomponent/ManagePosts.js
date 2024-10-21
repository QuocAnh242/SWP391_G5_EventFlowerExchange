import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagePosts.css'; // Add CSS for styling

const ManagePosts = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flowers, setFlowers] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // For editing
  const [userID, setUserID] = useState(null); // State to hold userID
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserID(parsedUser.userID); // Gán userID
      console.log("User ID:", parsedUser.userID); // Kiểm tra giá trị userID
    } else {
      console.log("Không tìm thấy user trong localStorage");
    }
  }, []);
  
  useEffect(() => {
    if (userID) {
      fetchPosts();
      // fetchFlowers();
    }
  }, [userID]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/identity/posts/api/${userID}`);
      console.log("Posts fetched:", response.data); // Kiểm tra dữ liệu trả về
      setPosts(response.data || []); // Đảm bảo posts là một mảng
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi tải danh sách bài post:', error);
      setLoading(false);
    }
  };
  // const fetchFlowers = async () => {
  //   try {
  //     const response = await axios.get('/api/flowers'); // API to get all available flowers
  //     setFlowers(response.data);
  //   } catch (error) {
  //     console.error('Error fetching flowers:', error);
  //   }
  // };

  const deletePost = async (postID) => {
    try {
      await axios.delete(`http://localhost:8080/identity/posts/${postID}`);
      setPosts(posts.filter(post => post.postID !== postID)); // Remove deleted post from the list
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const addFlowerToPost = async (postID, flowerID) => {
    try {
      await axios.post(`/api/posts/${postID}/flowers`, { flowerID });
      fetchPosts(); // Refresh posts after adding a flower
    } catch (error) {
      console.error('Error adding flower to post:', error);
    }
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
  };

  const handleSavePost = async () => {
    try {
      await axios.put(`http://localhost:8080/identity/posts/${selectedPost.postID}`, selectedPost);
      setSelectedPost(null); // Clear the editing form
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPost({ ...selectedPost, [name]: value });
  };

  // if (loading) {
  //   return <div>Loading posts...</div>;
  // }

  return (
    <div className="manage-posts">
      <h2>Quản lý bài post của tôi</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.postID} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>Giá: {post.price} VNĐ</p>
            <button onClick={() => deletePost(post.postID)}>Xóa bài post</button>
            <button onClick={() => handleEditPost(post)}>Sửa bài post</button>

            <div className="add-flower-section">
              <label>Thêm hoa:</label>
              <select onChange={(e) => addFlowerToPost(post.postID, e.target.value)}>
                <option value="">Chọn hoa</option>
                {flowers.map((flower) => (
                  <option key={flower.flowerID} value={flower.flowerID}>
                    {flower.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))
      ) : (
        <p>Không có bài post nào.</p> // Thông báo khi không có bài post
      )}

      {selectedPost && (
        <div className="edit-post-form">
          <h3>Chỉnh sửa bài post</h3>
          <input
            type="text"
            name="title"
            value={selectedPost.title}
            onChange={handleChange}
            placeholder="Tiêu đề"
          />
          <textarea
            name="description"
            value={selectedPost.description}
            onChange={handleChange}
            placeholder="Nội dung"
          />
          <input
            type="number"
            name="price"
            value={selectedPost.price}
            onChange={handleChange}
            placeholder="Giá"
          />
          <button onClick={handleSavePost}>Lưu</button>
        </div>
      )}
    </div>
  );
};


export default ManagePosts;