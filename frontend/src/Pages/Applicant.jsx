import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from '../components/Navbar2';
import "./Applicant.css";

const Applicant = () => {
  const navigate = useNavigate();
  const { schoolId } = useParams();
  const [applicantData, setApplicantData] = useState(null);
  const [gradesData, setGradesData] = useState(null);
  const [statusMap, setStatusMap] = useState({});
  const [applicantEmails, setApplicantEmails] = useState({}); // State to store applicant emails

  const handleChange = (e, userId) => {
    const { name, value } = e.target;
    setStatusMap(prevStatusMap => ({
      ...prevStatusMap,
      [userId]: {
        ...prevStatusMap[userId],
        [name]: value
      }
    }));
  };

  const handleClick = async (e, userId) => {
    e.preventDefault();
    try {
      const applicantStatus = statusMap[userId];
      await axios.put(`http://localhost:8800/reviewstatus/${userId}/${schoolId}`, applicantStatus);
      window.location.reload();    
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicantResponse = await axios.get(`http://localhost:8800/api/status/${schoolId}`);
        setApplicantData(applicantResponse.data);

        const gradesPromises = applicantResponse.data.map(async (applicant) => {
          const gradesResponse = await axios.get(`http://localhost:8800/api/grades/${applicant.UserId}`);
          return gradesResponse.data;
        });

        const allGradesData = await Promise.all(gradesPromises);

        setGradesData(allGradesData);

        // Fetch email for each applicant
        const emails = {};
        await Promise.all(applicantResponse.data.map(async (applicant) => {
          const userResponse = await axios.get(`http://localhost:8800/api/user/${applicant.UserId}`);
          emails[applicant.UserId] = userResponse.data.email;
        }));
        setApplicantEmails(emails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [schoolId]);

  const handleViewGradesClick = (recordUserId) => {
    window.open(`/grades/${recordUserId}`, '_blank')
  };

  const handleViewAnswersClick = (recordUserId) => {
    window.open(`/viewanswers/${schoolId}/${recordUserId}`, '_blank')
  };

  const renderDropdown = (userId) => {
    return (
      <select
        id="ReviewStatus"
        className="form-control"
        name="ReviewStatus"
        onChange={(e) => handleChange(e, userId)}
        value={statusMap[userId]?.ReviewStatus || ""}
      >
        <option value="pending">Pending</option>
        <option value="accept">Accept</option>
        <option value="reject">Reject</option>
      </select>
    );
  };

  return (
    <div>
        <Navbar2 />
        <div className="container mt-5 d-flex flex-column min-vh-100" >
            <h1 className="text-center mb-4">Applicant Information</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {applicantData ? (
                    Array.isArray(applicantData) ? (
                        applicantData.map((record) => (
                            <div key={record.StatusID} className="col">
                                <div className="card" style={{ width: '100%' }}>
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">Applicant Info</h5>
                                        <p className="mb-3"><strong>StatusID:</strong> {record.StatusID}</p>
                                        <p className="mb-3"><strong>UserId:</strong> {record.UserId}</p>
                                        <p className="mb-3"><strong>Email:</strong> {applicantEmails[record.UserId]}</p>
                                        <p className="mb-3"><strong>SubmissionDate:</strong> {record.SubmissionDate}</p>
                                        <p className="mb-3"><strong>ReviewStatus:</strong> {record.ReviewStatus}</p>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-success" onClick={() => handleViewGradesClick(record.UserId)}>View Grades</button>
                                            <button className="btn btn-success" onClick={() => handleViewAnswersClick(record.UserId)}>View Answers</button>
                                        </div>
                                        <hr />
                                        <form onSubmit={(e) => handleClick(e, record.UserId)}>
                                            <div className="mb-3">
                                                <label htmlFor="status">Change Status</label>
                                                {renderDropdown(record.UserId)}
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-block">Change Status</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col" >
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">Applicant Info</h5>
                                    <p className="mb-3"><strong>StatusID:</strong> {applicantData.StatusID}</p>
                                    <p className="mb-3"><strong>UserId:</strong> {applicantData.UserId}</p>
                                    <p className="mb-3"><strong>Email:</strong> {applicantEmails[applicantData.UserId]}</p>
                                    <p className="mb-3"><strong>SubmissionDate:</strong> {applicantData.SubmissionDate}</p>
                                    <p className="mb-3"><strong>ReviewStatus:</strong> {applicantData.ReviewStatus}</p>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <p className="mb-3">Loading applicant data...</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);
};

export default Applicant;
