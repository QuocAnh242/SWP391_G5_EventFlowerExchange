import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateFlowerForm = ({ postID }) => {
  // State cho danh sách các loại hoa
  const [flowers, setFlowers] = useState([
    {
      flowerName: '',
      quantity: '',
      status: 'Còn hàng',
      description: '',
      price: '',
      images: [], // Chuyển từ imageUrl sang images
      saleType: 'batch',
      eventName: '',
      eventFlowerPosting: {
        postID: postID,
      },
      category: {
        categoryID: '',
      },
    },
  ]);

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Lấy danh mục hoa từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/identity/category/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Xử lý thay đổi form cho một loại hoa
  const handleFlowerChange = (index, e) => {
    const { name, value } = e.target;
    const newFlowers = [...flowers];

    if (name === 'categoryID') {
      newFlowers[index] = {
        ...newFlowers[index],
        category: {
          ...newFlowers[index].category,
          categoryID: value,
        },
      };
    } else if (name === 'eventName') {
      newFlowers[index] = { 
        ...newFlowers[index], 
        eventName: value 
      };
    } else {
      newFlowers[index] = { 
        ...newFlowers[index], 
        [name]: value 
      };
    }
    setFlowers(newFlowers);
  };

  // Xử lý chọn nhiều ảnh
  const handleFileChange = (index, e) => {
    const files = Array.from(e.target.files);
    const newFlowers = [...flowers];
    newFlowers[index].images = files; // Lưu danh sách các file ảnh vào state
    setFlowers(newFlowers);
  };

  // Xử lý thêm loại hoa mới
  const addFlower = () => {
    setFlowers([
      ...flowers,
      {
        flowerName: '',
        quantity: '',
        status: 'Còn hàng',
        description: '',
        price: '',
        images: [],
        saleType: 'batch',
        eventName: '',
        eventFlowerPosting: {
          postID: postID,
        },
        category: {
          categoryID: '',
        },
      },
    ]);
  };

  // Xử lý xóa loại hoa
  const removeFlower = (index) => {
    const newFlowers = flowers.filter((_, i) => i !== index);
    setFlowers(newFlowers);
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    flowers.forEach((flower, index) => {
      formData.append(`flowers[${index}].flowerName`, flower.flowerName);
      formData.append(`flowers[${index}].quantity`, flower.quantity);
      formData.append(`flowers[${index}].status`, flower.status);
      formData.append(`flowers[${index}].description`, flower.description);
      formData.append(`flowers[${index}].price`, flower.price);
      formData.append(`flowers[${index}].saleType`, flower.saleType);
      formData.append(`flowers[${index}].eventName`, flower.eventName || '');
      formData.append(`flowers[${index}].eventFlowerPosting.postID`, flower.eventFlowerPosting.postID);
      formData.append(`flowers[${index}].category.categoryID`, flower.category.categoryID);
  
      // Add images for each flower
      flower.images.forEach((imageFile) => {
        formData.append(`files`, imageFile);
      });
    });
  
    try {
      const response = await axios.post('http://localhost:8080/identity/flower/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Đã thêm loại hoa thành công!');
      setError('');
    } catch (error) {
      console.error('Error creating flowers:', error);
      setError('Không thể tạo loại hoa. Vui lòng thử lại.');
      setSuccessMessage('');
    }
  };
  

  return (
    <div className="create-flower-form">
      <h2>Thêm Các Loại Hoa Mới</h2>
      <form onSubmit={handleSubmit}>
        {flowers.map((flower, index) => (
          <div key={index} className="flower-form-group">
            <label>
              Tên hoa:
              <input
                type="text"
                name="flowerName"
                value={flower.flowerName}
                onChange={(e) => handleFlowerChange(index, e)}
                required
              />
            </label>

            <label>
              Số lượng:
              <input
                type="number"
                name="quantity"
                value={flower.quantity}
                onChange={(e) => handleFlowerChange(index, e)}
                required
              />
            </label>

            <label>
              Mô tả:
              <textarea
                name="description"
                value={flower.description}
                onChange={(e) => handleFlowerChange(index, e)}
                required
              />
            </label>

            <label>
              Giá:
              <input
                type="number"
                name="price"
                value={flower.price}
                onChange={(e) => handleFlowerChange(index, e)}
                required
              />
            </label>

            <label>
              Hình ảnh:
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange(index, e)}
              />
            </label>

            <label>
              Chọn loại hoa:
              <select
                name="categoryID"
                value={flower.category.categoryID}
                onChange={(e) => handleFlowerChange(index, e)}
                required
              >
                <option value="">Chọn loại hoa</option>
                {categories.map((category) => (
                  <option key={category.categoryID} value={category.categoryID}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Bán theo:
              <select
                name="saleType"
                value={flower.saleType}
                onChange={(e) => handleFlowerChange(index, e)}
                required
              >
                <option value="batch">Theo batch</option>
                <option value="event">Theo sự kiện</option>
              </select>
            </label>

            {flower.saleType === 'event' && (
              <label>
                Nhập tên sự kiện:
                <input
                  type="text"
                  name="eventName"
                  value={flower.eventName || ''}
                  onChange={(e) => handleFlowerChange(index, e)}
                  required
                />
              </label>
            )}

            {flowers.length > 1 && (
              <button type="button" onClick={() => removeFlower(index)}>
                Xóa Loại Hoa
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addFlower}>
          Thêm Loại Hoa Khác
        </button>

        <button type="submit">Xác Nhận</button>
        {error && <p className="error-message-post">{error}</p>}
        {successMessage && <p className="success-message-post">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CreateFlowerForm;
