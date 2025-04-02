import React from "react";
import "./Testimonials.css"; // Import the CSS file
import snow from '../../assets/flower_icon.svg'


const testimonials = [
  {
    name: "John Master",
    title: "Director, Spark.com",
    text: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
  },
  {
    name: "John Master",
    title: "Director, Spark.com",
    text: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
  },
  {
    name: "John Master",
    title: "Director, Spark.com",
    text: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
  },
  {
    name: "John Master",
    title: "Director, Spark.com",
    text: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-container">

    <div className="banner">

    
      <div className="left-header">

      {/* Header */}
      <h2 className="heading">
        Here's what our <span className="highlight">customer</span> has to say
      </h2>

      {/* Button */}
      <div className="button-container">
        <button className="read-button">Read customer stories</button>
      </div>

      </div>

      {/* <div className="right-header">
        <img src={snow} alt="snow" />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime accusantium sint inventore quos est officia?</p>

      </div> */}

      </div>

      {/* Testimonials Grid */}
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial-card ${
                index === 0 || index === 3 ? "gray-bg" : "white-bg"
            }`}
          >
            <h3 className="testimonial-title">Amazing tool! Saved me months</h3>
            <p className="testimonial-text">{testimonial.text}</p>

            {/* User Info */}
            <div className="user-info">
              <div className="avatar"></div>
              <div className="user-details">
                <p className="user-name">{testimonial.name}</p>
                <p className="user-title">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
