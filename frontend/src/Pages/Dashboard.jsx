import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import './Dashboard.css';

const Dashboard = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [appliedColleges, setAppliedColleges] = useState([]);
  const [deleteCollegeIds, setDeleteCollegeIds] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [applyButtonClicked, setApplyButtonClicked] = useState(false);
  const navigate = useNavigate();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

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
        setColleges(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllColleges();
  }, []);

  useEffect(() => {
    const fetchDeleteCollegeIds = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/status/${userId}/schoolIds`);
        setDeleteCollegeIds(response.data.schoolIds);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchDeleteCollegeIds();
  }, [userId]);

  useEffect(() => {
    const fetchAppliedColleges = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/college-status/${userId}`);
        setAppliedColleges(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchAppliedColleges();
  }, [userId]);

  const handleCheckboxChange = (collegeId) => {
    setSelectedColleges((prevSelectedColleges) => {
      if (prevSelectedColleges.includes(collegeId)) {
        return prevSelectedColleges.filter((id) => id !== collegeId);
      } else {
        return [...prevSelectedColleges, collegeId];
      }
    });
  };

  const handleDelete = async (collegeId) => {
    try {
      await axios.delete(`http://localhost:8800/api/withdraw?collegeId=${collegeId}&userId=${userId}`);
      
      // Remove college ID from deleteCollegeIds array
      setDeleteCollegeIds((prevDeleteCollegeIds) => prevDeleteCollegeIds.filter(id => id !== collegeId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleApplyAll = async () => {
    try {
      const appliedCollegeIds = [];
      const applyAllPromises = selectedColleges.map(async (collegeId) => {
        const applicationData = {
          uid: userId,
          cid: collegeId,
          sdate: formattedDate,
          status: 'pending',
        };
        await axios.post('http://localhost:8800/api/apply', applicationData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        appliedCollegeIds.push(collegeId);
      });
      await Promise.all(applyAllPromises);

      // Add applied college IDs to deleteCollegeIds array
      setDeleteCollegeIds((prevDeleteCollegeIds) => [
        ...prevDeleteCollegeIds,
        ...selectedColleges,
      ]);

      setSelectedColleges([]);

      const queryParams = appliedCollegeIds.join(',');
      const url = `/questionnaire/${userId}?collegeIds=${queryParams}`;
      window.open(url, '_blank');

      setApplyButtonClicked(false); // Reset Apply button state to false
    } catch (err) {
      console.log(err);
    } 
  };

  const handleRecommender= async () =>{
    // const url = `/recommender/${userId}`;
    navigate(`/recommender/${userId}`);
  }  

  const handleOCR= async () =>{
    // const url = `/recommender/${userId}`;
    navigate(`/ocr/${userId}`);
  }  

  return (
    <div className="dashboard-container">
      <Navbar2 />
      <div className="container mt-5">
        <div className="login-header">
          <h1>Welcome to Your Dashboard</h1>
        </div>
        <div className="d-flex justify-content-between"></div>
        {userData ? (   
          <div className="d-flex justify-content-center">
            <div className="user-info-card" style={{ maxWidth: '800px', padding: '30px' }}>
              <div className="text-center"> 
                <h2>User ID: {userData.id}</h2>
                <h2>Email: {userData.email}</h2>
                <button className="button" onClick={handleRecommender}>Recommender</button>
                <button className="button" onClick={handleOCR}>Marksheet Submission</button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <div className="table-responsive flex-fill">
          <h2>Colleges</h2>
          <table className="table table-striped">
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
                    {deleteCollegeIds.includes(college.id) ? (
                      <button className="btn btn-danger" onClick={() => handleDelete(college.id)}>
                        Withdraw
                      </button>
                    ) : applyButtonClicked && selectedColleges.includes(college.id) ? (
                      <button className="btn btn-danger" onClick={() => handleDelete(college.id)}>
                        Withdraw
                      </button>
                    ) : (
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input custom-checkbox"
                          type="checkbox"
                          onChange={() => handleCheckboxChange(college.id)}
                          checked={selectedColleges.includes(college.id)}
                          style={{ width: '20px', height: '20px' }}
                        />
                        <label className="form-check-label">Select</label>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!applyButtonClicked && selectedColleges.length > 0 && (
            <button className="btn btn-success col-12" onClick={handleApplyAll}>
              Apply to Selected Colleges
            </button>
          )}
        </div>
        <div className="table-responsive flex-fill">
          <h2>Applied Colleges</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>College Name</th>
                <th>Review Status</th>
              </tr>
            </thead>
            <tbody>
              {appliedColleges.map((college, index) => (
                <tr key={index}>
                  <td>{college.CollegeName}</td>
                  <td>{college.ReviewStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
