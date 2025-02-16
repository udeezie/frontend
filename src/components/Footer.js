import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section knowquest">
          <h3>KnowQuest</h3>
          <p>
            Our vision is to provide convenience
            <span> and help increase your sales business.</span>
          </p>
        </div>

        {/* About Section */}
        <div className="footer-section about">
          <h3>About</h3>
          <ul>
            <li>
              <a href="/how-it-works">How it works</a>
            </li>
            <li>
              <a href="/business-relation">Business Relation</a>
            </li>
          </ul>
        </div>

        {/* Socials Section */}
        <div className="footer-section socials">
          <h3>Socials</h3>
          <ul>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <p className="footer-copyright">
        Copyright 2022 © KnowQuest Inc. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
