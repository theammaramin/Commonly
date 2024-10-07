import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Aboutus.css'; // Ensure this CSS file contains styles for all classes used

const Aboutus = () => {

  const [modalShow, setModalShow] = useState(false);

  const toggleModal = () => setModalShow(!modalShow);
  
  return (
    <div>
      <Navbar />
      <div className="container py-5 my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <section className="mb-5 text-center">
              <h1 className="display-4 aboutus-title">About Commonly</h1>
              <p className="lead aboutus-text">Empowering your academic journey through simplicity and efficiency.</p>
            </section>

            <section className="mb-5">
              <h2 className="h3 mb-3">Our Mission</h2>
              <p className="aboutus-text">
                At Commonly, we understand the challenges that aspiring students face when applying to multiple colleges for their A-level studies. Our mission is to make the application process efficient and stress-free, enabling you to apply to multiple A-level colleges with just a single application. We're here to open doors to a world of possibilities and empower your educational journey.
              </p>
            </section>

            <section className="mb-5">
              <h2 className="h3 mb-3">What We Do</h2>
              <p className="aboutus-text">
                Commonly provides a user-friendly application portal that streamlines your A-level college applications. Explore various educational institutions, submit your applications seamlessly, and manage your future educational aspirations with ease.
              </p>
            </section>

            <section className="mb-5">
              <h2 className="h3 mb-3">Meet Our Team</h2>
              <div className="row">
                {/* Mock data for team members, replace with real data */}
                <div className="col-md-4 text-center mb-4">
                  <img src="/path/to/image" alt="Founder's Name" className="team-photo mb-2"/>
                  <h3 className="h5">Ammar Amin</h3>
                  <p className="aboutus-text">Founder & CEO</p>
                </div>
                <div className="col-md-4 text-center mb-4">
                  <img src="/path/to/image" alt="CTO's Name" className="team-photo mb-2"/>
                  <h3 className="h5">Kanwar Muzammil</h3>
                  <p className="aboutus-text">Chief Technology Officer</p>
                </div>
                <div className="col-md-4 text-center mb-4">
                  <img src="/path/to/image" alt="CMO's Name" className="team-photo mb-2"/>
                  <h3 className="h5">Muhammad Anas</h3>
                  <p className="aboutus-text">Chief Marketing Officer</p>
                </div>
              </div>
            </section>

            <section className="mb-5">
              <h2 className="h3 mb-3">Success Stories</h2>
              <p className="aboutus-text">
                Are you an institution looking to simplify your application processes? Or a student seeking a straightforward path to applying for A-levels? Join us in revolutionizing the A-level application experience.
              </p>
              <button className="btn btn-primary" onClick={toggleModal}>Contact Us</button>
            </section>

           
            {modalShow && (
              <div className="modal" onClick={toggleModal}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <span className="close" onClick={toggleModal}>&times;</span>
                  <h2>Contact Information</h2>
                  <p>Address: 123 Learning Rd, Education City</p>
                  <p>Email: contact@commonly.com</p>
                  <p>Phone: +1 234 567 8900</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
