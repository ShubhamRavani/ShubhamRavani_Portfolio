import React, { useState } from "react";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    setIsFormSubmitted(true);

    if (Object.keys(formErrors).length === 0 && isFormSubmitted) {
      setLoading(true);
      const contact = {
        _type: "contact",
        name: formData?.name,
        email: formData?.email,
        message: formData?.message,
      };

      client
        .create(contact)
        .then(() => {
          setLoading(false);
          setFormErrors(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (!values.name) {
      errors.name = "Please Enter Your Name!";
    }
    if (!values.email) {
      errors.email = "Please Enter Your Email!";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email!";
    }
    return errors;
  };

  return (
    <>
      {formErrors ? (
        <h2 className="head-text">Take a coffee & chat with me</h2>
      ) : (
        <h2 className="head-text">Thank you for getting in touch!</h2>
      )}
      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:shubhamravani67890@gmail.com" className="p-text">
            shubhamravani67890@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+91 9898061998" className="p-text">
            +91 9898061998
          </a>
        </div>
      </div>
      {formErrors ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
            <p>{formErrors.name}</p>
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
            <p>{formErrors.email}</p>
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>
            {!loading ? "Send Message" : "Sending..."}
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);
