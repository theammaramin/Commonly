import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import 'bootstrap/dist/css/bootstrap.min.css';

const Grades = () => {
  const { userId } = useParams();
  const [grade, setGrade] = useState(null);
  const [ocrData, setOcrData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch grades data for the specified user
        const gradeResponse = await axios.get(`http://localhost:8800/api/grades/${userId}`);
        setGrade(gradeResponse.data);

        // Fetch OCR data for the specified user
        const ocrResponse = await axios.get(`http://localhost:8800/api/ocrf/${userId}`);
        setOcrData(ocrResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <Navbar2 />
      <div className="login-container">
        <div className="d-flex justify-content-between align-items-center m-5 p-5">
          {/* Display grades information */}
          {grade ? (
            <div className="card m-5 p-2" style={{ width: '100%' }}>
              <div className="card-body">
                <h4 className="card-title d-flex justify-content-center fw-bold p-2">Applicant's Grades</h4>
                <p className="mb-3"><strong>ScoreID:</strong> {grade.ScoreID}</p>
                <p className="mb-3"><strong>UserID:</strong> {grade.userID}</p>
                <p className="mb-3"><strong>Math Grade:</strong> {grade.math_grade}</p>
                <p className="mb-3"><strong>English Grade:</strong> {grade.english_grade}</p>
                <p className="mb-3"><strong>Urdu Grade:</strong> {grade.urdu_grade}</p>
                <p className="mb-3"><strong>Pakistan Studies Grade:</strong> {grade.Pak_studies_grade}</p>
                <p className="mb-3"><strong>Islamiat Grade:</strong> {grade.islamiat_grade}</p>
                <p className="mb-3"><strong>Optional Subject 1:</strong> {grade.optional_subject1_name}, Grade: {grade.optional_subject1_grade}</p>
                <p className="mb-3"><strong>Optional Subject 2:</strong> {grade.optional_subject2_name}, Grade: {grade.optional_subject2_grade}</p>
                <p className="mb-3"><strong>Optional Subject 3:</strong> {grade.optional_subject3_name}, Grade: {grade.optional_subject3_grade}</p>
                <p className="mb-3"><strong>Optional Subject 4:</strong> {grade.optional_subject4_name}, Grade: {grade.optional_subject4_grade}</p>
              </div>
            </div>
          ) : (
            <div className="card mb-4 p-4 mt-3" style={{ width: '100%' }}>
              <div className="card-body">
                <p className="mb-3">Loading grades data...</p>
              </div>
            </div>
          )}

          {/* Display OCR data in a table */}
          {ocrData.length > 0 && (
            <div className="card m-3 p-2" style={{ width: '100%' }}>
              <div className="card-body">
                <h4 className="card-title d-flex justify-content-center fw-bold p-2">Marksheet Data</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Grade</th>
                      {/* <th>Name</th> */}
                      
                    </tr>
                  </thead>
                  <tbody>
                    {ocrData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.subject}</td>
                        <td>{item.grade}</td>
                        {/* <td>{item.name}</td> */}
                      
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grades;
