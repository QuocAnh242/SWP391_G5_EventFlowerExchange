// src/pages/Home.js
import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import Footer from '../components/Footer';
import Services from '../components/homecomponents/Services';
import NewProducts from '../components/homecomponents/NewProducts';

import BannerImage1 from '../assets/banner/banner1.jpg'; // Hình 1
import BannerImage2 from '../assets/banner/banner2.jpg'; // Hình 2
import BannerImage3 from '../assets/banner/banner3.jpg'; // Hình 3

import '../styles/Home.css';

function Home() {
  // Cấu hình cho slider
  const settings = {
    dots: true, // Hiển thị các chấm dưới banner để chuyển đổi giữa các ảnh
    infinite: true, // Vòng lặp các ảnh
    speed: 500, // Tốc độ chuyển ảnh (500ms)
    slidesToShow: 1, // Số ảnh hiện trên màn hình cùng lúc
    slidesToScroll: 1, // Số ảnh chuyển qua mỗi lần cuộn
    autoplay: true, // Tự động chuyển ảnh
    autoplaySpeed: 2000, // Thời gian giữa mỗi lần chuyển ảnh
  };
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  useEffect(() => {
    // Giả lập trạng thái tải dữ liệu
    const timer = setTimeout(() => {
      setLoading(false); // Sau 2 giây, sẽ dừng hiển thị loading
    }, 2000); // Bạn có thể thay đổi thời gian này theo yêu cầu

    // Cleanup timer nếu component bị unmount
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div className="loading-container">
  <div className="spinner"></div>
  <p className="loading-text">Đang tải dữ liệu...</p>
</div>

    );
  }

  return (
    <div className="home">
      <div className="headerContainer">
        {/* Carousel */}
        <Slider {...settings}>
          <div>
            
            <img src={BannerImage1} alt="Banner 1" className="bannerImage" />
            
            
          </div>
          <div>
          
            <img src={BannerImage2} alt="Banner 2" className="bannerImage" />
            
            
          </div>
          <div>
          
            <img src={BannerImage3} alt="Banner 3" className="bannerImage" />
            
            
          </div>
        </Slider>
      </div>

      {/* Phần dịch vụ */}
      <Services />

      {/* Phần sản phẩm mới */}
      <NewProducts />

      <Footer />
    </div>
  );
}

export default Home;
