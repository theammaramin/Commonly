// NewsSection.jsx

import React from 'react';
import './NewsSection.css'; // Import the CSS file

const NewsSection = () => {
  const newsItems = [
    {
      title: 'Important Application Deadline Update',
      date: 'January 15, 2023',
      content: 'Nixor College second round of admission ends soon...',
      thumbnail: 'https://th.bing.com/th/id/OIP.lM7vrjxN9izFXm8kPhkd8QHaDE?rs=1&pid=ImgDetMain', // URL to the thumbnail image
    },
    // Add more news items as needed
  ];

  return (
    <div className="news-section">
      <h2>News and Updates</h2>
      <ul>
        {newsItems.map((item, index) => (
          <li key={index}>
            <div className="thumbnail-container">
              <img src={item.thumbnail} alt={`Thumbnail for ${item.title}`} />
            </div>
            <div className="news-content">
              <h3>{item.title}</h3>
              <p className="news-date">{item.date}</p>
              <p>{item.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsSection;
