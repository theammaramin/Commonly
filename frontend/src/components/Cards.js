import React from 'react';
import StudentImage from './images/heroImg1.jpg'; // Importing the logo image directly
import TrackImage from './images/tracking.jpg';  // Importing another image
import ManageImage from './images/heroImg5.jpg';
import './Cards.css'
function Card({ imageSrc, title, text }) {
  return (
    <div className="card" style={{ width: '20rem' }}>
      <img className="card-img-top" src={imageSrc} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
}

export default function CardList() {
  return (
    <div className="row">
      <div className="col-md-3">
        <Card 
          imageSrc={StudentImage} 
          title="Personal Dashboard"
          text="Manage your personal dashboard to see all the colleges you have applied to."
        />
      </div>
      <div className="col-md-3">
        <Card 
          imageSrc={TrackImage}
          title="Application Tracking"
          text="Monitor your college applications from submission to acceptance with our intuitive tracking feature."
        />
      </div>
      <div className="col-md-3">
        <Card 
          imageSrc={ManageImage} 
          title="College Recommendations"
          text="Discover your ideal college match effortlessly with our personalized recommender system."
        />
      </div>
    </div>
  );
}
