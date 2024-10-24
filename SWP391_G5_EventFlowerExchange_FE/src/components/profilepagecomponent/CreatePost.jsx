import React, { useState } from 'react';
import axios from 'axios';
import CreateFlowerForm from './CreateFlowerForm'; // Import the CreateFlowerForm component
import './CreatePos.css'; // Import file CSS

const CreatePostComponent = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [post, setPost] = useState({
    title: '',
    description: '',
    price: '',
    user: {
      userID: user ? user.userID : '',
    },
  });

  const [postID, setPostID] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Xử lý khi có thay đổi trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  // Xử lý khi chọn file ảnh
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Tạo bài đăng
      const response = await axios.post('http://localhost:8080/identity/posts/', post);
      const createdPostID = response.data.postID;
      setPostID(createdPostID);

      // Nếu có file ảnh, upload file
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile); // Đảm bảo tên trường 'file' đúng với yêu cầu API

        // Upload file ảnh
        await axios.post(`http://localhost:8080/identity/img/${createdPostID}`, formData);
        setSuccessMessage('Đã tạo bài đăng và upload ảnh thành công!');
      } else {
        setSuccessMessage('Đã tạo bài đăng thành công!');
      }

      setError('');
    } catch (error) {
      console.error('Error creating post or uploading image:', error);
      setError('Không thể tạo bài đăng hoặc upload ảnh. Vui lòng thử lại.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="create-post-component">
      <h2>Tạo Bài Đăng Mới</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Tiêu đề:
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mô tả:
          <textarea
            name="description"
            value={post.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Giá dự kiến:
          <input
            type="number"
            name="price"
            value={post.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Chọn ảnh:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>

        <button type="submit">Tạo Bài Đăng</button>
        {error && <p className="error-message-post">{error}</p>}
        {successMessage && <p className="success-message-post">{successMessage}</p>}
      </form>

      {/* Show form to add flowers if the post is successfully created */}
      {postID && <CreateFlowerForm postID={postID} />}
    </div>
  );
};

export default CreatePostComponent;
