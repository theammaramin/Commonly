import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from '../components/Navbar2'
import './Cdashboard.css'

const Cdashboard = () => {
  const navigate= useNavigate();
  const { userId } = useParams();
 
 
  console.log("Id is:", { userId })
  const [userData, setUserData] = useState(null);
  const [collegeData,setCollegeData]= useState(null); 

  const currentDate = new Date();
 // Get the components of the date (year, month, day)
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Format the date as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${day}`;


  //  fetching user data 
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

  const handleClick= async (e) =>{
    e.preventDefault();
    const response = await axios.get(`http://localhost:8800/api/college/${userId}`);
    console.log(response.data.id);
    // navigate(`/collegeform/${response.data.id}`);
    // /collegeform/${response.data.id}
    window.open(`/manageform/${response.data.id}`, '_blank')
  
  
  }

  const handleApplicants= async (e)=>{
    e.preventDefault();
    const response = await axios.get(`http://localhost:8800/api/college/${userId}`);
    console.log(response.data.id);
    navigate(`/applicant/${response.data.id}`);

    

  }




  return (
    <div>
      <Navbar2 />
      <div className="dashboard-container">

          <div className="login-header">
            <h1>Welcome to Your College Dashboard</h1>
            </div>
          {/* Right section with dashboard content */}
            {userData ? (
              <div className="d-flex justify-content-center">
              <div className="user-info-card mb-5" style={{ maxWidth: '800px', padding: '30px' }}>
                 <div className="text-center"> 
                 <h1 className="mb-4">User Information</h1>
                 <h2><strong>User ID:</strong> {userData.id}</h2>
                <h2><strong>Email:</strong> {userData.email}</h2>
                 </div>
              </div>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
            <div className="d-grid gap-5 d-md-flex justify-content-md-center mb-4">
              <button className="btn-primary" onClick={handleClick}>Manage Admission Form</button>
              <button className="btn btn-primary me-md-0 mb-2 mb-md-0" onClick={handleApplicants}>View Applicants</button>
            </div>
          </div>
        </div>
  );
  
  
}

export default Cdashboard
