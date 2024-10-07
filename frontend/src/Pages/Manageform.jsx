import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from '../components/Navbar2';
import { Button } from 'reactstrap';
import './Manageform.css'

const Manageform = () => {
    const { userId } = useParams();
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/managequestion/${userId}`);
                setQuestions(response.data); // Assuming response.data is an array of questions
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);

    const handleClick= async (e) =>{
        e.preventDefault();
        // const response = await axios.get(`http://localhost:8800/api/college/${userId}`);
        navigate(`/collegeform/${userId}`);      
      }

      return (
        <div>
  <Navbar2 />
  <div className="login-container">
    <div className="d-flex justify-content-between align-items-center">
      <div className="login-header">
        <h1>College ID: {userId}</h1>
        <p>{questions.length > 0 ? 'Questions For Your College Admission Form:' : 'No questions found'}</p>
      </div>
      <div className="login-card">
        <table className="table table-striped">
          {questions.length > 0 && (
            <thead className="thead-dark">
              <tr>
                <th>Question ID</th>
                <th>Question Text</th>
              </tr>
            </thead>
          )}
          <tbody>
            {questions.map((question) => (
              <tr key={question.QuestionID}>
                <td>{question.QuestionID}</td>
                <td>{question.QuestionText}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!questions.length > 0 && <p className="text-center">No questions found</p>}
        <div className="text-center">
          <button className="btn btn-primary mt-4" onClick={handleClick}>Create Admission Form</button>
        </div>
      </div>
    </div>
  </div>
</div>

    ); 
};


export default Manageform;
