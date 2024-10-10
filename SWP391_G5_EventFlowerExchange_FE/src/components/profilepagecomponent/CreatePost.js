// src/components/CreatePostComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './CreatePos.css'; // Import file CSS

const CreatePostComponent = () => {
  // Cập nhật state cho các trường dữ liệu
  const [post, setPost] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    status: 'Còn hàng', // Giá trị mặc định cho status
    user: {
      userID: 2, // Thay đổi giá trị userID theo yêu cầu
    },
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Xử lý khi có thay đổi trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userID') {
      // Nếu thay đổi userID, ta cần thay đổi trong đối tượng user
      setPost({
        ...post,
        user: {
          ...post.user,
          userID: value,
        },
      });
    } else {
      // Thay đổi thông thường cho các trường khác
      setPost({ ...post, [name]: value });
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi request POST đến server với dữ liệu trong post
      await axios.post('http://localhost:8080/identity/post/', post);
      setSuccessMessage('Đã tạo bài đăng thành công!'); // Hiện thông báo thành công
      setError('');
      // Reset form sau khi gửi thành công
      setPost({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        status: 'Mới',
        user: { userID: '' },
      });
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Không thể tạo bài đăng. Vui lòng thử lại.');
      setSuccessMessage('');
      if (error.response) {
        console.error('Response data:', error.response.data); // In ra dữ liệu phản hồi từ server
      }
    }
  };

  // Up ảnh bằng link hoặc hình ảnh
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời từ file
      setPost({ ...post, imageUrl }); // Cập nhật giá trị imageUrl với URL tạm thời
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
          Giá:
          <input
            type="number"
            name="price"
            value={post.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          URL hình ảnh:
          <input
            type="text"
            name="imageUrl"
            value={post.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Tải lên hình ảnh:
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleImageUpload} // Hàm để xử lý khi người dùng chọn ảnh
          />
        </label>

        <label>
          Trạng thái:
          <input
            type="text"
            name="status"
            value={post.status}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Tạo Bài Đăng</button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CreatePostComponent;
