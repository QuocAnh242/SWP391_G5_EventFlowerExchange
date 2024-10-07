import React, { useState, useEffect } from "react";
import { FaSeedling, FaStore, FaHandHoldingHeart, FaLeaf } from "react-icons/fa";
import "../styles/About.css"; // Assuming the file is located in `src/styles/`
import backAbout from "../assets/about-img/back-about.jpg";
import a1 from "../assets/about-img/a1.jpg";
import a2 from "../assets/about-img/a2.jpg";
import Footer from "../components/Footer";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="about">
      {/* Banner Section */}
      <div className="about-banner">
        <img
          src={backAbout}
          alt="Beautiful Flower Banner"
          className="banner-image"
        />
        <div className="banner-text">
          <h1>Flower Haven</h1>
          <p>Your one-stop marketplace for beautiful and fresh flowers.</p>
        </div>
      </div>

      {/* About Us Content */}
      <div className="about-header">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Flower Haven</strong>, your online destination for
          purchasing beautiful real flowers from the best local florists and
          growers.
        </p>
      </div>

      {/* Cards Section */}
      <div className="about-section">
        <div className="about-card">
          <FaStore className="about-icon" />
          <h2>Our Marketplace</h2>
          <p>
            Flower Haven is a trusted platform for sellers to list and sell a
            wide variety of flowers, from roses to exotic arrangements. Our
            mission is to connect flower lovers with talented florists who craft
            the most beautiful arrangements.
          </p>
        </div>

        <div className="about-card">
          <FaSeedling className="about-icon" />
          <h2>For Sellers</h2>
          <p>
            Become a seller and showcase your floral artistry! List your
            products with beautiful images, detailed descriptions, and prices.
            Reach customers nationwide and grow your flower business with ease.
          </p>
        </div>

        <div className="about-card">
          <FaHandHoldingHeart className="about-icon" />
          <h2>For Buyers</h2>
          <p>
            Whether you're looking for a simple bouquet or a large custom
            arrangement, you’ll find the perfect flowers for any occasion.
            Support local businesses by buying from nearby sellers, or explore
            exotic flowers from around the world.
          </p>
        </div>

        <div className="about-card">
          <FaLeaf className="about-icon" />
          <h2>Our Vision</h2>
          <p>
            We believe flowers are more than just a product — they bring joy,
            beauty, and emotions. Our goal is to make these moments accessible
            to everyone by creating a seamless online experience for buyers and
            sellers alike.
          </p>
        </div>
      </div>

    <Footer/>
    </div>
  
  );
};

export default About;
