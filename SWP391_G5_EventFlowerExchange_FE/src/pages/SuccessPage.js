import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SuccessPage.css'; // Your CSS file
import Footer from '../components/Footer';
// import Footer from "../components/Footer";
const SuccessPage = () => {
  const navigate = useNavigate();

  // Function to handle redirect
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="success-page">
      <div className="success-content">
        <h1>Thanh toán thành công</h1>
        <p>Bạn đã đặt hàng thành công và sẽ nhận được sản phẩm trong vòng 3 ngày</p>
        <div className="success-icon">
          {/* Insert the SVG here */}
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" className="bi bi-check-circle-fill green-icon" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.97L4.47 8.47a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 0 0-1.06-1.06L6.97 10.97z" />
          </svg>


        </div>
        <button className="go-home-btn" onClick={handleGoHome}>Quay về trang chủ</button>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default SuccessPage;
