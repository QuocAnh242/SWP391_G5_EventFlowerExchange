import React from "react";
import Slider from "react-slick";
import "./Testimonials.css";

function Testimonials() {
  const settings = {
    dots: false, // Hiển thị dấu chấm để di chuyển giữa các slide
    infinite: true, // Lặp lại carousel khi hết slide
    speed: 500, // Tốc độ chuyển đổi slide (ms)
    slidesToShow: 1, // Hiển thị 1 slide mỗi lần
    slidesToScroll: 1, // Cuộn 1 slide mỗi lần
    autoplay: true, // Tự động cuộn
    autoplaySpeed: 3000, // Tốc độ tự động cuộn (ms)
  };

  const testimonials = [
    {
      feedback:
        "Flower Haven made my anniversary extra special. The bouquet I ordered was stunning, and it arrived right on time!",
      name: "Sarah W.",
    },
    {
      feedback:
        "I love the variety of flowers on Flower Haven. It's easy to find unique and exotic arrangements!",
      name: "John D.",
    },
    {
      feedback:
        "The customer service at Flower Haven is top-notch. They helped me pick the perfect flowers for my event.",
      name: "Emily R.",
    },
    {
      feedback:
        "I ordered flowers for my mother's birthday, and she was thrilled with the beautiful arrangement. I'll definitely be ordering again!",
      name: "Michael T.",
    },
    {
      feedback:
        "I've never been disappointed with Flower Haven. Their flowers are always fresh and last a long time.",
      name: "Olivia P.",
    },
  ];

  return (
    <div className="about-testimonials">
      <h2>What Our Customers Are Saying</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-slide" key={index}>
            <p>"{testimonial.feedback}"</p>
            <h4>- {testimonial.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;
