import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import './Questionnaire.css'; // Import custom CSS for styling

const Questionnaire = () => {
  const { userId } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const collegeIds = queryParams.getAll('collegeIds');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/questions`, {
          params: { collegeIds: collegeIds.join(',') },
        });
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [collegeIds]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      for (const question of questions) {
        const answerText = answers[question.QuestionID];
        await axios.post('http://localhost:8800/api/answers', {
          UserId: userId,
          QuestionID: question.QuestionID,
          AnswerText: answerText,
          CollegeID: question.CollegeID,
        });
      }
      console.log('Answers submitted successfully!');
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };
  return (
    <div>
      <Navbar2 />
      <div className="container mt-5 login-container">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="login-header m-5 p-3">
            <h1>Complete the Questionnaire</h1>
            <p>Answer questions to proceed.</p>
          </div>
          <div className="login-card m-2 ">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                {questions.map(question => (
                  <div key={question.QuestionID} className="form-group mb-5">
                    <label htmlFor={`question-${question.QuestionID}`} className="fw-bold">Question: </label>
                    {/* {question.QuestionID} */}
                    <p>{question.QuestionText}</p>
                    <input
                      type="text"
                      id={`question-${question.QuestionID}`}
                      className="form-control"
                      placeholder="Enter your answer"
                      value={answers[question.QuestionID] || ''}
                      onChange={e => handleAnswerChange(question.QuestionID, e.target.value)}
                    />
                  </div>
                ))}
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
