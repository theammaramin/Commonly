


import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import "./Footer.css";

const footerQuickLinks = [
  // {
  //   display: "Home",
  //   url: "./",
  // },
  // {
  //   display: "About US",
  //   url: "./aboutus",
  // },

];

const footerInfoLinks = [
  // {
  //   display: "Log In",
  //   url: "./login",
  // },
  // {
  //   display: "Sign Up",
  //   url: "./add",
  // },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" className="mb-4">
            <h2 className=" d-flex align-items-center gap-1 blue-text">
              <i class="ri-pantone-line"></i> COMMONLY.
            </h2>

            <div className="follows">
              <p className="mb-0">Follow us on social media</p>
              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-facebook-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-instagram-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-linkedin-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-twitter-line"></i>
                </a>
              </span>
            </div>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            {/* <h6 className="fw-bold">Explore</h6> */}
            <ListGroup className="link__list">
              {footerQuickLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <ListGroup className="link__list">
              {footerInfoLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6">
            <h6 className="fw-bold gt">Get in Touch</h6>
            <p>Address: PECHS, Karachi</p>
            <p> Phone: +92 0123456789 </p>
            <p>Email: commonly@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;


