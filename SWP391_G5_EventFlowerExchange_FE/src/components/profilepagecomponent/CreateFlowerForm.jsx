import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateFlowerForm = ({ postID }) => {
  // State for flower list
  const [flowers, setFlowers] = useState([
    {
      flowerType: 'Hoa bán theo lô',
      flowerName: '',
      quantity: '',
      status: 'Còn hàng',
      description: '',
      price: '',
      saleType: 'batch',
      eventType: 'Không',
      eventName: 'Không',
      eventFlowerPosting: {
        postID: postID,
      },
      category: {
        categoryID: '',
      },
    },
  ]);
  const [flowerIDs, setFlowerIDs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch categories from API
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

  // Handle change in flower form
  const handleFlowerChange = (index, e) => {
    const { name, value } = e.target;
    const newFlowers = [...flowers];

    if (name === 'flowerType') {
      newFlowers[index] = {
        ...newFlowers[index],
        flowerType: value,
        eventType: value === 'Hoa sự kiện' ? 'Có' : 'Không',
        eventName: value === 'Hoa sự kiện' ? '' : 'Không',
      };
    } else if (name === 'categoryID') {
      newFlowers[index] = {
        ...newFlowers[index],
        category: {
          ...newFlowers[index].category,
          categoryID: value,
        },
      };
    } else {
      newFlowers[index] = {
        ...newFlowers[index],
        [name]: value,
      };
    }

    setFlowers(newFlowers);
  };

  // Add new flower form group
  const addFlower = () => {
    setFlowers([
      ...flowers,
      {
        flowerType: 'Hoa bán theo lô',
        flowerName: '',
        quantity: '',
        status: 'Còn hàng',
        description: '',
        price: '',
        saleType: 'batch',
        eventType: 'Không',
        eventName: 'Không',
        eventFlowerPosting: {
          postID: postID,
        },
        category: {
          categoryID: '',
        },
      },
    ]);
  };

  const removeFlower = (index) => {
    const newFlowers = flowers.filter((_, i) => i !== index);
    setFlowers(newFlowers);
    setFlowerIDs(flowerIDs.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/identity/flower/', flowers);
      const createdFlowerIDs = response.data.map(flower => flower.flowerID); // Assuming API returns IDs
      setFlowerIDs(createdFlowerIDs);
      setSuccessMessage('Đã thêm loại hoa thành công!');
      setError('');
    } catch (error) {
      console.error('Error creating flowers:', error);
      setError('Không thể tạo loại hoa. Vui lòng thử lại.');
      setSuccessMessage('');
    }
  };

   // Handle image upload for a specific flower
   const handleImageUpload = async (flowerID, file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`http://localhost:8080/identity/flowerImg/batch/${flowerID}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
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
                    {category.flowerType}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Có sự kiện hay không:
              <select
                name="eventType"
                value={flower.eventType}
                onChange={(e) => handleFlowerChange(index, e)}
                disabled={flower.flowerType === 'Hoa sự kiện'}
              >
                <option value="Không">Không</option>
                <option value="Có">Có</option>
              </select>
            </label>

            {flower.eventType === 'Có' && (
              <label>
                Tên sự kiện:
                <input
                  type="text"
                  name="eventName"
                  value={flower.eventName}
                  onChange={(e) => handleFlowerChange(index, e)}
                  required={flower.eventType === 'Có'}
                />
              </label>
            )}
  
             {flowerIDs[index] && (
              <div>
                <label>Thêm ảnh cho hoa :</label>
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(flowerIDs[index], e.target.files[0])}
                />
              </div>
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
