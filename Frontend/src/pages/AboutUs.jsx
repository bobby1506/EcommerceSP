// src/components/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="display-4">About Us</h2>
          <p className="lead">
            Welcome to <strong>Our E-commerce Store</strong>! We are dedicated to offering the best products at the best prices, ensuring a great shopping experience for our customers.
          </p>
          <p>
            Our store was founded with a simple mission: to provide high-quality products with exceptional customer service. We offer a wide variety of categories from electronics to fashion, all handpicked to meet your needs.
          </p>
          <p>
            We are constantly innovating and striving to make your shopping experience better. Stay tuned for new product releases, sales, and discounts!
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://via.placeholder.com/500x300"
            alt="About Us"
            className="img-fluid rounded"
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-12">
          <h3>Our Values</h3>
          <ul>
            <li>Quality Products</li>
            <li>Customer Satisfaction</li>
            <li>Fast Delivery</li>
            <li>Secure Payments</li>
            <li>Eco-friendly Packaging</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
