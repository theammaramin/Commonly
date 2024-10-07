import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

//import chooseImg from "../../assests/images/why-choose-us.png";
import "./ChooseUs.css";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import heroImg from "./images/heroImg3.jpg";


const ChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
          <div className="choose__img">
              {showVideo ? (
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=_g45BJCAXu4&ab_channel=CodingWithMuhib"
                  controls
                  width="100%"
                  height="350px"
                />
              ) : (
                <img src={heroImg} alt="" className="w-100" />
              )}

              {!showVideo && (
                <span className="play__icon">
                  <i
                    class="ri-play-circle-line"
                    onClick={() => setShowVideo(!showVideo)}
                  ></i>
                </span>
              )}
            </div>
          </Col>

          <Col lg="6" md="6">
          <div className="choose__content">
              <h2>WHAT WE DO</h2>
              <p>
              Commonly provides a user-friendly application portal that streamlines your A-level college applications. Explore various educational institutions, submit your applications seamlessly, and manage your future educational aspirations with ease!
              </p>
              <Link to="/aboutus"> <button className="search">More Info</button>
         </Link>
            </div>
            
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChooseUs;