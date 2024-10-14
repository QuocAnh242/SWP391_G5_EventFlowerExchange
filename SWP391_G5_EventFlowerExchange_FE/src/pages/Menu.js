import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import a2 from '../assets/about-img/a5.jpg'; // Sample image
import b1 from '../assets/banner-post.png';

function Menu() {
  const [flowerList, setFlowerList] = useState([]); // Flower list from API
  const [category, setCategory] = useState("Tất cả hoa"); // Current category
  const navigate = useNavigate(); // For navigation
  const [loading, setLoading] = useState(true); // Loading state
  const [filteredFlowers, setFilteredFlowers] = useState([]); // Filtered flower list
  const [priceFilter, setPriceFilter] = useState(""); // Current price filter
  const [sortOrder, setSortOrder] = useState(""); // Current sort order


  // Fetch flower list when component mounts
  useEffect(() => {
    fetchFlowerList();
  }, []);

  // Fetch data from Spring Boot API
  const fetchFlowerList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/identity/post/");
      setFlowerList(response.data); // Save flower data in state
      setFilteredFlowers(response.data); // Initialize the filtered list
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Handle post click
  const handlePostClick = (id) => {
    navigate(`/flower/${id}`); // Navigate to the post's detail page
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  // Filtering logic based on price range
  const filterByPrice = (value) => {
    setPriceFilter(value); // Set selected price range

    let filtered = [...flowerList];
    if (value === "<100k") {
      filtered = filtered.filter((flower) => flower.price < 100000);
    } else if (value === "100k-500k") {
      filtered = filtered.filter((flower) => flower.price >= 100000 && flower.price <= 500000);
    } else if (value === ">500k") {
      filtered = filtered.filter((flower) => flower.price > 500000);
    }

    // Apply sorting if a sort order is selected
    if (sortOrder) {
      filtered = sortFlowers(filtered, sortOrder);
    }

    setFilteredFlowers(filtered);
  };

  // Sorting logic for ascending or descending price
  const sortFlowers = (flowers, order) => {
    if (order === "asc") {
      return flowers.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      return flowers.sort((a, b) => b.price - a.price);
    }
    return flowers;
  };

  // Handle sorting by price
  const handleSortChange = (value) => {
    setSortOrder(value); // Set selected sort order

    let sortedFlowers = sortFlowers([...filteredFlowers], value);
    setFilteredFlowers(sortedFlowers);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    //Thanh sidebar chọn hoa
    <div className="shop-container">
      <div className="sidebar-post-exchange">
        <h3 className="sidebar-title">Danh mục hoa</h3>
        <hr className="sidebar-divider" />
        <ul className="category-list">
          <li onClick={() => setCategory("Tất cả hoa")}>Tất cả hoa</li>
          <li onClick={() => setCategory("Hoa cưới")}>Hoa cưới</li>
          <li onClick={() => setCategory("Hoa sinh nhật")}>Hoa sinh nhật</li>
          <li onClick={() => setCategory("Hoa chúc mừng")}>Hoa chúc mừng</li>
          <li onClick={() => setCategory("Hoa khô")}>Hoa khô</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        <img src={b1} alt="" className="banner-post" />
        {/* <h1 className="shop-title">Cửa hàng hoa - {category}</h1> */}
        <div className="breadcrumb">
          <Link to="/" className="home-link-breadcrumb" >Trang chủ</Link>
          <span> / </span>
          <span>Posting / {category} </span>
        </div>

        {/* Filter and Sorting dropdowns */}
        <div className="filter-sort-bar">
          <select
            className="filter-dropdown"
            value={priceFilter}
            onChange={(e) => filterByPrice(e.target.value)}
          >
            <option value="">Lọc theo giá</option>
            <option value="<100k">Dưới 100k</option>
            <option value="100k-500k">100k - 500k</option>
            <option value=">500k">Trên 500k</option>
          </select>

          <select
            className="sort-dropdown"
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Sắp xếp</option>
            <option value="asc">Giá: Thấp đến Cao</option>
            <option value="desc">Giá: Cao đến Thấp</option>
          </select>
        </div>

        <div className="post-grid">
          {filteredFlowers.map((item, index) => (
            <div className="post-card" key={index} onClick={() => handlePostClick(item.id)}>
              <img src={a2} alt={item.title} className="post-card-image" />
              <h3>{item.title}</h3>
              <p className="discount-price">Giá: {item.price}₫</p>
              <p className="feature-content">{item.description}</p>
              <button className="feature-detail-button">Xem chi tiết</button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Menu;
