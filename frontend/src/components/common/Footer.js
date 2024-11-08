import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-bottom">
        <p>
          copyright &copy; <a href="/">Rexsoft</a>{" "}
        </p>
        <div className="footer-menu">
          <ul className="f-menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
