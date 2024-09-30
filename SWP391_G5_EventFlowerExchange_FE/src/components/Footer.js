import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>FLOWER PARADISE</h2>
          <p>
            Customers can contact us through the channels below. Thank you and
            we are honored to have you as our customer.
          </p>
          <div className="socialMedia">
            <TwitterIcon /> <FacebookIcon /> <LinkedInIcon /> <InstagramIcon />
          </div>
        </div>

        <div className="footer-section">
          <h3>SUPPORT</h3>
          <ul>
            <li>Product</li>
            <li>Help & Support</li>
            <li>Return Policy</li>
            <li>Terms of Use</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>OUR BRANCHES</h3>
          <ul>
            <li>Laos</li>
            <li>Thailand</li>
            <li>Japan</li>
            <li>Canada</li>
            <li>United States</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>PAYMENT METHOD</h3>
          <img src="visa.png" alt="Visa" />
          <img src="mastercard.png" alt="MasterCard" />
          <img src="paypal.png" alt="Paypal" />
        </div>

        <div className="footer-section contact-us">
          <h3>CONTACT US</h3>
          <p>Thu Duc City , Ho Chi Minh City, Vietnam</p>
          <p>Phone: +865 20 96863648</p>
          <p>Email: flowerparadise@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p> &copy; 2024 flower-paradise.com</p>
      </div>
    </div>
  );
}

export default Footer;
