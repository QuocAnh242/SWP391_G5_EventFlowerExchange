import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateFlowerForm = ({ postID }) => {
  const [flowers, setFlowers] = useState([
    {
      flowerType: 'Hoa bán theo lô',
      flowerName: '',
      quantity: '',
      status: 'Còn hàng',
      description: '',
      price: '',
      imageUrl: null, // Store file as null initially
      saleType: 'batch',
      eventType: 'Không',
      eventName: 'Không',
      eventFlowerPosting: { postID },
      category: { categoryID: '' },
    },
  ]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleFlowerChange = (index, e) => {
    const { name, value, files } = e.target;
    const newFlowers = [...flowers];

    if (name === 'imageUrl' && files.length > 0) {
      newFlowers[index].imageUrl = files[0]; // Set file object directly
    } else if (name === 'categoryID') {
      newFlowers[index].category = { ...newFlowers[index].category, categoryID: value };
    } else {
      newFlowers[index][name] = value;
    }

    setFlowers(newFlowers);
  };

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
        imageUrl: null,
        saleType: 'batch',
        eventType: 'Không',
        eventName: 'Không',
        eventFlowerPosting: { postID },
        category: { categoryID: '' },
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        for (const flower of flowers) {
            console.log("Submitting flower data:", flower);

            // Submit flower data and retrieve flowerID
            const flowerResponse = await axios.post('http://localhost:8080/identity/flower/', flower);
            const flowerID = flowerResponse.data.flowerID || flowerResponse.data.id;

            // Check if imageUrl is a File and upload it
            if (flower.imageUrl instanceof File) {
                const formData = new FormData();
                formData.append('files', flower.imageUrl);  // Add imageUrl as 'files'

                console.log("Uploading image with FormData:", formData.get('files'));

                // Send the FormData with the image to the upload endpoint
                await axios.post(
                    `http://localhost:8080/identity/flowerImg/batch/${flowerID}/upload`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
            }
        }
        setSuccessMessage('Đã thêm loại hoa thành công!');
        setError('');
    } catch (error) {
        if (error.response) {
            console.error("Server Error:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
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
              Ảnh hoa:
              <input
                type="file"
                name="imageUrl"
                onChange={(e) => handleFlowerChange(index, e)}
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
