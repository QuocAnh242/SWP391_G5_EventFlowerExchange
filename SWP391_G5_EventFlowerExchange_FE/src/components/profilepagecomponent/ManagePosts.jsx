import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagePosts.css';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserID(parsedUser.userID);
    }
  }, []);

  useEffect(() => {
    if (userID) {
      fetchPosts();
    }
  }, [userID]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/identity/posts/api/${userID}`);
      setPosts(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading posts:', error);
      setLoading(false);
    }
  };

  const deletePost = async (postID) => {
    try {
      await axios.delete(`http://localhost:8080/identity/posts/${postID}`);
      setPosts(posts.filter(post => post.postID !== postID));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
  };

  const handleSavePost = async () => {
    try {
      await axios.put(`http://localhost:8080/identity/posts/${selectedPost.postID}`, selectedPost);
      setSelectedPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPost({ ...selectedPost, [name]: value });
  };

  const closeEditForm = () => {
    setSelectedPost(null);
  };

  return (
    <div className="manage-posts">
      <h2>Quản lý bài post của tôi</h2>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.postID} className="post-container">
                <div className="post-item">
                  <h3 className="manage-post-title">{post.title}</h3>
                  <p>{post.description}</p>
                  <p>Giá: {post.price} VNĐ</p>

                  <div className="post-actions">
                    <button onClick={() => deletePost(post.postID)}>Xóa bài post</button>
                    <button onClick={() => handleEditPost(post)}>Sửa bài post</button>
                  </div>
                </div>

                <div className="flower-posts-table-container">
                  <h4>Các loại hoa trong bài viết:</h4>
                  {post.flowerBatches.length > 0 ? (
                    <table className="flower-posts-table">
                      <thead cla>
                        <tr>
                          <th className="flower-posts-header">Tên hoa</th>
                          <th className="flower-posts-header">Số lượng</th>
                          <th className="flower-posts-header">Giá (VNĐ)</th>
                          <th className="flower-posts-header">Mô tả</th>
                          <th className="flower-posts-header">Sự kiện</th>
                        </tr>
                      </thead>
                      <tbody>
                        {post.flowerBatches.map((flower) => (
                          <tr key={flower.flowerID} className="flower-posts-row">
                            <td className="flower-posts-cell">{flower.flowerName}</td>
                            <td className="flower-posts-cell">{flower.quantity}</td>
                            <td className="flower-posts-cell">{flower.price}</td>
                            <td className="flower-posts-cell">{flower.description}</td>
                            <td className="flower-posts-cell">{flower.category.eventName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Không có hoa nào trong bài viết.</p>
                  )}
                </div>



              </div>
            ))
          ) : (
            <p>Không có bài post nào.</p>
          )}
        </>
      )}

      {selectedPost && (
        <div className="modal-overlay" onClick={closeEditForm}>
          <div className="edit-post-form" onClick={(e) => e.stopPropagation()}>
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
            <button className="save-button" onClick={handleSavePost}>Lưu</button>
            <button onClick={closeEditForm}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;
