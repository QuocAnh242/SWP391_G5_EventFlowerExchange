// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Footer from '../components/Footer';
import Services from '../components/homecomponents/Services';
import NewProducts from '../components/homecomponents/NewProducts';

// Import hình ảnh banner
import BannerImage1 from '../assets/banner/banner1.jpg';
import BannerImage2 from '../assets/banner/banner2.jpg';
import BannerImage3 from '../assets/banner/banner3.jpg';

// Import hình ảnh cho các phần khác
import FeaturedImage from '../assets/about-img/a1.jpg';
import BlogImage1 from '../assets/about-img/a2.jpg';

import '../styles/Home.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Testimonials from '../components/homecomponents/Testimonials';


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
    }, 2000);

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
      {/* Featured Section */}
      <div className="about-featured">
        <h2>Featured Flowers & Offers</h2>
        <div className="featured-banner">
          <img src={FeaturedImage} alt="Featured Flower" />
          <div className="featured-text">
            <h3>Spring Blossom Collection</h3>
            <p>
              Discover our exclusive Spring Blossom collection. Fresh flowers
              handpicked from the best local growers.
            </p>
            <button>Shop Now</button>
          </div>
        </div>
      </div>
      
      {/* Blog Section */}
      <div className="about-blog">
        <h2>From Our Blog</h2>
        <div className="blog-posts">
          <div className="blog-card">
            <img src={BlogImage1} alt="Blog Post 1" />
            <h3>The Best Flowers for Your Wedding Day</h3>
            <p>
              Explore the top flowers that will make your wedding unforgettable.
            </p>
            <button>Read More</button>
          </div>
          <div className="blog-card">
            <img src={FeaturedImage} alt="Blog Post 2" />
            <h3>Caring for Roses: Tips & Tricks</h3>
            <p>
              Roses are timeless, but they need proper care. Learn how to keep
              them fresh and vibrant.
            </p>
            <button>Read More</button>
          </div>
        </div>
      </div>
       {/* Phần sản phẩm mới */}
      <NewProducts />
      
      {/* Testimonials Section */}
      {/* <div className="about-testimonials">
        <h2>What Our Customers Are Saying</h2>
        <div className="testimonial">
          <p>
            "Flower Haven made my anniversary extra special. The bouquet I
            ordered was stunning, and it arrived right on time!"
          </p>
          <h4>- Sarah W.</h4>
        </div>
        <div className="testimonial">
          <p>
            "I love the variety of flowers on Flower Haven. It's easy to find
            unique and exotic arrangements!"
          </p>
          <h4>- John D.</h4>
        </div>
      </div> */}
      <Testimonials/>

      

      

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;