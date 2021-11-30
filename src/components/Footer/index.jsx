import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <div className="footer-custom">
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>BLOGMARK</h4>
            <div className="list-footer">
              <p>
                Blogmark is a platform that allows you to make your own article,
                and also give you categorized informations, which will help you
                to add your knowledge.{" "}
              </p>
            </div>
          </div>
          <div className="col">
            <h6>Adress</h6>
            <ul className="list-footer">
              <li>+62 812 3456 7890</li>
              <li>North Sumatera, Indonesia</li>
              <li>45 Street Toba</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
