import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';

const ViewAnswers = () => {
  const { userId, recordUserId } = useParams();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Define the API endpoint URL


    // Fetch data from the API endpoint
    axios.get(`http://localhost:8800/api/answers?CollegeID=${userId}&UserID=${recordUserId}`)
      .then(response => {
        // Update the state with the fetched data
        setAnswers(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, [userId, recordUserId]);

  return (
    <div>
      <Navbar2 /> {/* Render Navbar2 component */}
      <div className="container mt-5 d-flex flex-column min-vh-100">
        <h1 className="text-center mb-4">Form Answers</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {answers.map((answer, index) => (
            <div key={index} className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Answer ID: {answer.AnswerID}</h5>
                  <p className="card-text"><strong>User ID:</strong> {answer.UserId}</p>
                  <p className="card-text"><strong>Question ID:</strong> {answer.QuestionID}</p>
                  <p className="card-text"><strong>Answer Text:</strong> {answer.AnswerText}</p>
                  <p className="card-text"><strong>College ID:</strong> {answer.CollegeID}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

export default ViewAnswers;