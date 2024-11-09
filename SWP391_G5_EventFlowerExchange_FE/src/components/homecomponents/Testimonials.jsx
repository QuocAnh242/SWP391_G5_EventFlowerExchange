import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Testimonials.css";

function Testimonials({ setTestimonials }) {  // Accept setTestimonials as a prop
//  const testimonials = [
//     {
//       feedback:
//         "Hoa rất tươi, hương thơm dễ chịu, giao hàng nhanh, giá cả hợp lý.",
//        name: "Trần Linh",
//     },
//     {
//       feedback:
//         "Hoa được gói rất đẹp và cẩn thận, nhân viên chu đáo và nhiệt tình.",
//       name: "Nguyên An",
//     },
//     {
//       feedback:
//         "Giao hàng rất nhanh, hoa vẫn tươi khi nhận, rất hài lòng.",
//       name: "Tuấn Trần",
//     },
//     {
//       feedback:
//         "Dịch vụ tuyệt vời, hoa đúng mẫu, người nhận rất thích.",
//       name: "Lê Minh",
//     },
//     {
//       feedback:
//         "Hoa đẹp và tươi, giao hàng đúng giờ, sẽ ủng hộ lần sau.",
//       name: "Mai Hương",
//     },
//     {
//       feedback:
//         "Mình rất hài lòng với chất lượng hoa, sẽ giới thiệu cho bạn bè.",
//       name: "Thảo Nguyễn",
//     },
//     {
//       feedback:
//         "Hoa thơm và tươi lâu, giao hàng nhanh chóng và đúng hẹn.",
//       name: "Phương Anh",
//     },
//     {
//       feedback:
//         "Đóng gói cẩn thận, hoa tươi đẹp, chất lượng dịch vụ tốt.",
//       name: "Hồng Nhung",
//     },
//     {
//       feedback:
//         "Rất thích cách gói hoa tinh tế, giá cả phải chăng.",
//       name: "Duy Khang",
//     },
    
//   ];
  const [testimonials, setTestimonialsState] = useState([]);

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:8080/identity/api/feedback/all");
      const data = await response.json();
      setTestimonialsState(data);  // Save fetched testimonials in state
    } catch (error) {
      console.error("Lỗi khi tải phản hồi:", error);
      setTestimonialsState([]);
    }
  };

  useEffect(() => {
    // Fetch and display the latest feedback from your API
    fetchFeedbacks();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="about-testimonials">
      <h2>Khách hàng nói gì</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-slide" key={index}>
            <p>"{testimonial.comment}"</p>  {/* Sử dụng comment thay vì feedback */}
            <h3>{testimonial.name}</h3>
          </div>
        ))}

      </Slider>
    </div>
  );
}

export default Testimonials;
