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
    expiryDate: '', // New field for expiration date
    user: {
      userID: user ? user.userID : '',
    },
  });

  const [postID, setPostID] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set expiryDate to midnight of the selected day
      const date = new Date(post.expiryDate);
      date.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, milliseconds to zero
  
      const expiryDateMidnight = date.toISOString(); // Convert to ISO format with 0 time
  
      const formattedPost = {
        ...post,
        expiryDate: expiryDateMidnight, // Set the expiryDate in the desired format
      };
  
      // Send the formatted post data
      const response = await axios.post('http://localhost:8080/identity/posts/', formattedPost);
      const createdPostID = response.data.postID;
      setPostID(createdPostID);
  
      // Upload image if selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
  
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
          Ngày hết hạn:
          <input
            type="date"
            name="expiryDate"
            value={post.expiryDate}
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
