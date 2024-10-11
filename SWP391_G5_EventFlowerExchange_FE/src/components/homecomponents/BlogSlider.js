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
    dots: false,           // Hiển thị các chấm điều hướng dưới slider
    infinite: true,       // Lặp lại vô hạn
    speed: 500,           // Tốc độ chuyển ảnh
    slidesToShow: 3,      // Hiển thị 3 bài blog cùng lúc
    slidesToScroll: 1,    // Di chuyển từng bài một
    autoplay: true,       // Tự động chuyển bài blog
    autoplaySpeed: 3000,  // Thời gian mỗi lần tự động chuyển
    rtl: false,            // Chuyển từ phải sang trái
    responsive: [
      {
        breakpoint: 768, // Khi màn hình nhỏ hơn 768px
        settings: {
          slidesToShow: 3,  // Chỉ hiện 1 bài blog trên màn hình
        },
      },
    ],
  };

  return (
    <div className="about-blog">
      <h2 className='blog-title'>Từ Blog Của Chúng Tôi</h2>
      <Slider {...settings}>
        <div className="blog-card">
          {/* <img src={BlogImage1} alt="Blog Post 1" /> */}
          <h3>Những Loài Hoa Tuyệt Vời Cho Ngày Cưới Của Bạn</h3>
          <p>Khám phá những loài hoa hàng đầu giúp đám cưới của bạn trở nên khó quên.</p>
          <button className='button-blog'>Đọc Thêm</button>
        </div>
        <div className="blog-card">
          {/* <img src={BlogImage2} alt="Blog Post 2" /> */}
          <h3>Chăm Sóc Hoa Hồng: Mẹo & Bí Quyết</h3>
          <p>Roses are timeless, but they need proper care. Learn how to keep them fresh and vibrant.</p>
          <button className='button-blog'>Đọc Thêm</button>
        </div>
        <div className="blog-card">
          {/* <img src={BlogImage3} alt="Blog Post 3" /> */}
          <h3>Top 5 Loài Hoa Mùa Hè Giúp Ngôi Nhà Thêm Rực Rỡ</h3>
          <p>Tìm hiểu những loài hoa mùa hè sẽ mang lại vẻ đẹp và hương thơm cho ngôi nhà của bạn.</p>
          <button className='button-blog'>Đọc Thêm</button>
        </div>
        <div className="blog-card">
          {/* <img src={BlogImage4} alt="Blog Post 4" /> */}
          <h3>Cách Cắm Hoa Như Một Chuyên Gia</h3>
          <p>Nắm vững nghệ thuật cắm hoa với những mẹo từ các chuyên gia.</p>
          <button className='button-blog'>Đọc Thêm</button>
        </div>
        <div className="blog-card">
          {/* <img src={BlogImage5} alt="Blog Post 5" /> */}
          <h3>Tầm Quan Trọng Của Việc Chọn Hoa Địa Phương</h3>
          <p>Tầm Quan Trọng Của Việc Chọn Hoa Địa Phương</p>
          <button className='button-blog'>Đọc Thêm</button>
        </div>
      </Slider>
    </div>
  );
}

export default BlogSlider;
