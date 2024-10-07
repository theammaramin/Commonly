import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import cosineSimilarity from 'compute-cosine-similarity';
import Navbar2 from '../components/Navbar2';
import "./Recommender.css";

const prefer = [0, 0, 0, 0];
const weight = [0, 0, 0, 0];
const multiply = [0, 0, 0, 0];

const calculateCosineSimilarities = (unselected, weightedpref) => {
  const similarities = [];
  unselected.forEach((row) => {
    const similarity = cosineSimilarity(weightedpref, row);
    similarities.push(similarity);
  });
  return similarities;
};


const Recommender = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [selectedDreamCollege, setSelectedDreamCollege] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchAllColleges = async () => {
      try {
        const res = await axios.get("http://localhost:8800/college");
        const initializedColleges = res.data.map(college => ({
          ...college,
          selected: false // Initialize selected property to false for each college
        }));
        setColleges(initializedColleges);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllColleges();
  }, []);

  const handleDream = async (college) => {
    prefer[0] = college.number_of_A;
    prefer[1] = college.scholarship;
    prefer[2] = college.extracurricular;
    prefer[3] = college.sport;
    college.selected = true;
    setSelectedDreamCollege(college.id); // Update the selected dream college
  };

  const handleWeight = async () => {
    // Retrieve values from dropdowns
    const nAValue = parseInt(document.getElementById('nA').value);
    const scholarshipValue = parseInt(document.getElementById('scholarship').value);
    const extracurricularValue = parseInt(document.getElementById('extracurricular').value);
    const sportValue = parseInt(document.getElementById('sport').value);

    weight[0] = nAValue;
    weight[1] = scholarshipValue;
    weight[2] = extracurricularValue;
    weight[3] = sportValue;

    multiply[0] = weight[0] * prefer[0];
    multiply[1] = weight[1] * prefer[1];
    multiply[2] = weight[2] * prefer[2];
    multiply[3] = weight[3] * prefer[3];

    const unselectedColleges = colleges
      .filter(college => !college.selected)
      .map(college => [
        college.number_of_A,
        college.scholarship,
        college.extracurricular,
        college.sport
      ]);

    const Unselected = colleges
      .filter(college => !college.selected)
      .map(college => [
        college.name,
        college.number_of_A,
        college.scholarship,
        college.extracurricular,
        college.sport
      ]);

    const similarities = calculateCosineSimilarities(unselectedColleges, multiply);

    const recommended = Unselected.map((college, index) => ({
      name: college[0],
      similarity: similarities[index],
      features: college.slice(1)
    }));

    recommended.sort((a, b) => b.similarity - a.similarity);

    setRecommended(recommended);
    setShowRecommendation(true);
  };

  return (
    <div className="dashboard-container">
      <Navbar2 />
      <div className="container mt-2">
        {showRecommendation ? (
          <div>
            <div className="login-header">
              <h1>Recommended Colleges</h1>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  {/* <th>Similarity</th> */}
                  <th>Number of A's</th>
                  <th>Scholarship</th>
                  <th>Extracurricular</th>
                  <th>Sport</th>
                </tr>
              </thead>
              <tbody>
                {recommended.map((college, index) => (
                  <tr key={index}>
                    <td>{college.name}</td>
                    {/* <td>{college.similarity}</td> */}
                    {college.features.map((feature, idx) => (
                      <td key={idx}>{feature}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div className="login-header">
              <h1>Welcome to Your Dashboard</h1>
            </div>
            {userData ? (
              <div className="user-info-card p-4 mb-5">
                <p className="lead">User ID: {userData.id}</p>
                <p className="lead email-text">Email: {userData.email}</p>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
            <table className="table table-striped mb-5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((college) => (
                  <tr key={college.id}>
                    <td>{college.id}</td>
                    <td>{college.name}</td>
                    <td>
                      {selectedDreamCollege === college.id ? null : (
                        <button
                          className="btn btn-success col-5"
                          onClick={() => handleDream(college)}
                        >
                          Dream College
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="preference-dropdowns mb-5">
              <p>Please provide us with your preference, where 5 represents the best option and 1 the least preferable.</p>
              <label htmlFor="nA">NUM A:</label>
              <select name="nA" id="nA">
                <option value="">Select</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>

              <label htmlFor="scholarship">Scholarship:</label>
              <select name="scholarship" id="scholarship">
                <option value="">Select</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>

              <label htmlFor="extracurricular">Extracurricular:</label>
              <select name="extracurricular" id="extracurricular">
                <option value="">Select</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>

              <label htmlFor="sport">Sport:</label>
              <select name="sport" id="sport">
                <option value="">Select</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>

              <button className="btn btn-primary" onClick={handleWeight}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommender;
