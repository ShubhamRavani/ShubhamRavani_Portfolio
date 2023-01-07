import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://github.com/ShubhamRavani/">
        <BsGithub />
      </a>
    </div>
    <div>
      <a href="https://www.linkedin.com/in/shubham-ravani/">
        <BsLinkedin />
      </a>
    </div>
  </div>
);

export default SocialMedia;
