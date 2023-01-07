import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { urlFor, client } from "../../client";
import { images } from "../../constants";

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = `*[_type == "abouts"]{title, description, imgUrl, "resumePDF": resumePDF.asset->url}`;

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">About Me</h2>

      <div className="app__about-container">
        <div className="app__profiles">
          {abouts.map((about) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__profile-item"
              key={about.title}
            >
              <img src={urlFor(about.imgUrl)} alt={images.about1} />
            </motion.div>
          ))}
        </div>
        {abouts.map((about) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title}
          >
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              <span>{about.title}</span>
            </h2>
            <p className="about-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
            <a href={`${about.resumePDF}?dl=ShubhamRavani_Resume.pdf`} download>
              <button type="button" className="p-text">
                Download Resume
              </button>
            </a>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
