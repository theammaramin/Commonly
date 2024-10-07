

import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "./images/heroImg2.jpg";
import "./HeroSection.css";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="4" md="4">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
                ALL YOUR DREAM COLLEGES AT ONE PLACE<br />
              </h2>
            </div>
            <Link to="/add"> <button className="search">Sign Up</button>
         </Link>
            </Col>
          <Col lg="8" md="8">
            <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;