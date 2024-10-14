// src/components/CreatePostComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePos.css'; // Import file CSS

const CreatePostComponent = () => {
  // State cho bài đăng
  const [post, setPost] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    status: 'Còn hàng',
    user: {
      userID: 2,
    },
    flowerName: '',
    quantity: '',
    eventFlowerPosting: {
      postID: '', // Thay đổi nếu cần
    },
    category: {
      categoryID: '',
    }
  });

  // State cho danh mục hoa và thông báo
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Lấy danh sách các loại hoa từ API khi component được render
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/identity/catetory/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Xử lý khi có thay đổi trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userID') {
      setPost({
        ...post,
        user: {
          ...post.user,
          userID: value,
        },
      });
    } else if (name === 'categoryID') {
      setPost({
        ...post,
        category: {
          ...post.category,
          categoryID: value,
        },
      });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi request POST đến server với dữ liệu trong post
      await axios.post('http://localhost:8080/identity/post/', post);
      setSuccessMessage('Đã tạo bài đăng thành công!');
      setError('');
      setPost({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        status: 'Còn hàng',
        user: { userID: 2 },
        flowerName: '',
        quantity: '',
        eventFlowerPosting: { postID: 3 },
        category: { categoryID: '' },
      });
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Không thể tạo bài đăng. Vui lòng thử lại.');
      setSuccessMessage('');
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  // Up ảnh bằng link hoặc hình ảnh
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPost({ ...post, imageUrl });
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
            onChange={handleImageUpload}
          />
        </label>
        <div className='flower-detail-form'>
        <label>
          Tên hoa muốn bán :
          <input
            type="text"
            name="flowerName"
            value={post.flowerName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Số lượng:
          <input
            type="number"
            name="quantity"
            value={post.quantity}
            onChange={handleChange}
            required
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

        <label>
          Chọn loại hoa:
          <select
            name="categoryID"
            value={post.category.categoryID}
            onChange={handleChange}
            required
          >
            <option value="">Chọn loại hoa</option>
            {categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.flowerType}
              </option>
            ))}
          </select>
        </label>
        </div>
        <button type="submit">Tạo Bài Đăng</button>
        {error && <p className="error-message-post">{error}</p>}
        {successMessage && <p className="success-message-post">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CreatePostComponent;
