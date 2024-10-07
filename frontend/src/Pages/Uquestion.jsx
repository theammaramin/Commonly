import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'

const Uquestion = () => {
  const { userId } = useParams();
  console.log("Id is:", { userId });

  const [book, setBooks]= useState({
    userid: userId,
    DateOfBirth:"",
    Gender:"",
  });

  const [grade, setGrades]= useState({
    userid: userId,
    Math:"",
    Eng:"",
    Pak:"",
    Urdu:"",
    Isl:"",
    Sub1:"",
    Sub1Grade:"",
    Sub2:"",
    Sub2Grade:"",
    Sub3:"",
    Sub3Grade:"",
    Sub4:"",
    Sub4Grade:"",
  });

  
  const navigate= useNavigate();
  const handleChange= (e) =>{
    console.log("Target name:", e.target.name);
    console.log("Target value:", e.target.value);
    setBooks((prev)=>({...prev, [e.target.name]: e.target.value}));
    setGrades((prev)=>({...prev, [e.target.name]: e.target.value}));
  };
  const handleClick= async (e) =>{
    e.preventDefault();
    try{
      console.log(book);
      await axios.post("http://localhost:8800/student",book);
      await axios.post("http://localhost:8800/grades",grade);
      navigate(`/login`);

    }catch(err){
      console.log(err);
    }
  }





  return (
    <div> <header><Navbar/></header>
    <div className="login-container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="login-header">
            <h1>Add New Applicant</h1>
            <p>Connecting applicants with opportunities based on academic achievements.</p>
          </div>

          <div className="login-card">
            <form onSubmit={handleClick}>
              <h1 className="text-center">Applicant Details</h1>
              {/* Input fields and labels like in the Add page */}
              <div className="form-group">
                <label htmlFor="DateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="DateOfBirth"
                  className="form-control"
                  name="DateOfBirth"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Gender">Gender</label>
                <select
                  id="Gender"
                  className="form-control"
                  name="Gender"
                  onChange={handleChange}
                  value={book.Gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

                  <div className="mb-3">
                    <label htmlFor="grade"></label>
                    <select
                      id="Math"
                      className="form-control"
                      name="Math"
                      onChange={handleChange}
                      value={grade.Math}
                    >
                      <option value="">Math Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="U">U</option>

                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="grade"></label>
                    <select
                      id="Eng"
                      className="form-control"
                      name="Eng"
                      onChange={handleChange}
                      value={grade.Eng}
                    >
                      <option value="">English Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="U">U</option>

                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="grade"></label>
                    <select
                      id="Pak"
                      className="form-control"
                      name="Pak"
                      onChange={handleChange}
                      value={grade.Pak}
                    >
                      <option value="">Pakistan Studies Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="U">U</option>

                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="grade"></label>
                    <select
                      id="Urdu"
                      className="form-control"
                      name="Urdu"
                      onChange={handleChange}
                      value={grade.Urdu}
                    >
                      <option value="">Urdu Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="U">U</option>

                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="grade"></label>
                    <select
                      id="Isl"
                      className="form-control"
                      name="Isl"
                      onChange={handleChange}
                      value={grade.Isl}
                    >
                      <option value="">Islamiyat Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="U">U</option>

                    </select>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Optional Subject 1"
                      name="Sub1"
                      onChange={handleChange}
                    />
                  </div>


                  <div className="mb-3">
                    <label htmlFor="grade"></label>
                    <select
                      id="Sub1Grade"
                      className="form-control"
                      name="Sub1Grade"
                      onChange={handleChange}
                      value={grade.Sub1Grade}
                    >
                      <option value="">Optional Subject 1 Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="U">U</option>

                    </select>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Optional Subject 2"
                      name="Sub2"
                      onChange={handleChange}
                    />
                  </div>


                  <div className="mb-3">
                    <label htmlFor="grade"></label>
                    <select
                      id="Sub2Grade"
                      className="form-control"
                      name="Sub2Grade"
                      onChange={handleChange}
                      value={grade.Sub2Grade}
                    >
                      <option value="">Optional Subject 2 Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="U">U</option>

                    </select>
                  </div>


                  {/* Optional Sub 3 */}
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Optional Subject 3"
                      name="Sub3"
                      onChange={handleChange}
                    />
                  </div>


                  <div className="mb-3">
                    <label htmlFor="grade"></label>
                    <select
                      id="Sub3Grade"
                      className="form-control"
                      name="Sub3Grade"
                      onChange={handleChange}
                      value={grade.Sub3Grade}
                    >
                      <option value="">Optional Subject 3 Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="U">U</option>

                    </select>
                  </div>

                  {/* optional subject 4 */}

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Optional Subject 4"
                      name="Sub4"
                      onChange={handleChange}
                    />
                  </div>


                  <div className="mb-3">
                    <label htmlFor="grade"></label>
                    <select
                      id="Sub4Grade"
                      className="form-control"
                      name="Sub4Grade"
                      onChange={handleChange}
                      value={grade.Sub4Grade}
                    >
                      <option value="">Optional Subject 4 Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="U">U</option>

                    </select>
                  </div>










                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleClick}
                  >
                    Add Applicant
                  </button>





              </form>
              </div>
            </div>
          </div>
        </div>
     
  )
}

export default Uquestion
