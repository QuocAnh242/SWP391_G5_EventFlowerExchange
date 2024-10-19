import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateFlowerForm = ({ postID }) => {
  // State cho loại hoa
  const [flower, setFlower] = useState({
    flowerName: '',
    quantity: '',
    status: 'Còn hàng',
    description: '',
    price: '',
    imageUrl: '',
    eventFlowerPosting: {
      postID: postID, // Gán postID từ bài đăng đã tạo
    },
    category: {
      categoryID: '',
    },
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Lấy danh mục hoa từ API
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

  // Xử lý thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoryID') {
      setFlower({
        ...flower,
        category: {
          ...flower.category,
          categoryID: value,
        },
      });
    } else {
      setFlower({ ...flower, [name]: value });
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi request POST để tạo loại hoa dưới bài post
      await axios.post('http://localhost:8080/identity/flower/', flower);
      setSuccessMessage('Đã thêm loại hoa thành công!');
      setError('');
    } catch (error) {
      console.error('Error creating flower:', error);
      setError('Không thể tạo loại hoa. Vui lòng thử lại.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="create-flower-form">
      <h2>Thêm Loại Hoa Mới</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tên hoa:
          <input
            type="text"
            name="flowerName"
            value={flower.flowerName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Số lượng:
          <input
            type="number"
            name="quantity"
            value={flower.quantity}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mô tả:
          <textarea
            name="description"
            value={flower.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Giá:
          <input
            type="number"
            name="price"
            value={flower.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          URL hình ảnh:
          <input
            type="text"
            name="imageUrl"
            value={flower.imageUrl}
            onChange={handleChange}
            // required
          />
        </label>

        <label>
          Chọn loại hoa:
          <select
            name="categoryID"
            value={flower.category.categoryID}
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

        <button type="submit">Thêm Loại Hoa</button>
        {error && <p className="error-message-post">{error}</p>}
        {successMessage && <p className="success-message-post">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CreateFlowerForm;
