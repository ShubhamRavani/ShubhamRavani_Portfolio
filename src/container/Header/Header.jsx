import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { images } from "../../constants";
import "./Header.scss";

const Header = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const query = `*[_type == "home"]{title, name, description, imgUrl, "resumePDF": resumePDF.asset->url}`;

    client.fetch(query).then((data) => {
      setHomes(data);
    });
  }, []);

  return (
    <>
      <div className="app__header app__flex">
        <div className="app__header-wrapper">
          {homes.map((home) => (
            <motion.div
              whileInView={{ x: [-100, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__header-info"
              key={home.title}
            >
              <div className="app__header-text">
                <h1 className="app__header-header">{home.title}</h1>
                <h1 className="app__header-header">
                  <span>{home.name}</span>
                </h1>
                <p className="app__header-ptex">{home.description}</p>
              </div>
              <div className="app__header-btn">
                <a
                  className="resume"
                  href={`${home.resumePDF}?dl=ShubhamRavani_Resume.pdf`}
                  download
                  style={{ textDecoration: "none" }}
                >
                  <button type="button" className="p-text">
                    Download Resume
                  </button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        {homes.map((home) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delayChildren: 0.5 }}
            className="app__header-info"
            key={home.title}
          >
            <img src={urlFor(home.imgUrl)} alt={images.portfolio1} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(Header, "home");
