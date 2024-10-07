// Chuyển tự động các blog trong home
import React from 'react'; 
import Slider from 'react-slick'; // Import Slider từ react-slick
// import BlogImage1 from '../assets/about-img/a2.jpg';
// import BlogImage2 from '../assets/about-img/a3.jpg';
// import BlogImage3 from '../assets/about-img/a4.jpg';
// import BlogImage4 from '../assets/about-img/a5.jpg';
// import BlogImage5 from '../assets/about-img/a6.jpg';
import './BlogSlider.css';

// Blog Section as Slider
function BlogSlider() {
  const settings = {
    dots: true,           // Hiển thị các chấm điều hướng dưới slider
    infinite: true,       // Lặp lại vô hạn
    speed: 500,           // Tốc độ chuyển ảnh
    slidesToShow: 3,      // Hiển thị 3 bài blog cùng lúc
    slidesToScroll: 1,    // Di chuyển từng bài một
    autoplay: true,       // Tự động chuyển bài blog
    autoplaySpeed: 3000,  // Thời gian mỗi lần tự động chuyển
    rtl: true,            // Chuyển từ phải sang trái
    responsive: [
      {
        breakpoint: 768, // Khi màn hình nhỏ hơn 768px
        settings: {
          slidesToShow: 1,  // Chỉ hiện 1 bài blog trên màn hình
        },
      },
    ],
  };

  return (
    <div className="about-blog">
      <h2>From Our Blog</h2>
      <Slider {...settings}>
        <div className="blog-card">
          {/* <img src={BlogImage1} alt="Blog Post 1" /> */}
          <h3>The Best Flowers for Your Wedding Day</h3>
          <p>Explore the top flowers that will make your wedding unforgettable.</p>
          <button>Read More</button>
        </div>
        <div className="blog-card">
          {/* <img src={BlogImage2} alt="Blog Post 2" /> */}
          <h3>Caring for Roses: Tips & Tricks</h3>
          <p>Roses are timeless, but they need proper care. Learn how to keep them fresh and vibrant.</p>
          <button>Read More</button>
        </div>
        <div className="blog-card">
          {/* <img src={BlogImage3} alt="Blog Post 3" /> */}
          <h3>Top 5 Summer Flowers to Brighten Your Home</h3>
          <p>Learn which summer flowers will add beauty and fragrance to your home.</p>
          <button>Read More</button>
        </div>
        <div className="blog-card">
          {/* <img src={BlogImage4} alt="Blog Post 4" /> */}
          <h3>How to Arrange Flowers Like a Pro</h3>
          <p>Master the art of flower arrangement with these tips from the experts.</p>
          <button>Read More</button>
        </div>
        <div className="blog-card">
          {/* <img src={BlogImage5} alt="Blog Post 5" /> */}
          <h3>The Importance of Choosing Local Flowers</h3>
          <p>Discover why supporting local growers can make a big difference.</p>
          <button>Read More</button>
        </div>
      </Slider>
    </div>
  );
}

export default BlogSlider;
