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
    status: 'Mới', // Giá trị mặc định cho status
    user: {
      userID: '', // Giá trị userID cố định trong ví dụ của bạn
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
      setSuccessMessage('Post created successfully!');
      setError('');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
      setSuccessMessage('');
    }
  };
  // Up ảnh băng link hoặc hình ảnh
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời từ file
      setPost({ ...post, imageUrl }); // Cập nhật giá trị imageUrl với URL tạm thời
    }
  };
  

  return (
    <div className="create-post-component">
      <h2>Create a New Post</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={post.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={post.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
  Image URL:
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
  Upload Image:
  <input
    type="file"
    name="imageFile"
    accept="image/*"
    onChange={handleImageUpload} // Hàm để xử lý khi người dùng chọn ảnh
  />
</label>


        <label>
          Status:
          <input
            type="text"
            name="status"
            value={post.status}
            onChange={handleChange}
            required
          />
        </label>


        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostComponent;
