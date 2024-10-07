import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'


const Cquestion = () => {
    const { userId } = useParams();
    console.log("Id is:", { userId });

    const [book, setBooks]= useState({
        userid: userId,
        name:"",
        area:"",
        nA:"",
        nB:"",
        nC:"",
        nD:"",
        nE:"",
        scholarship: "", // Corrected property name
        extracurricular: "",
        sport: "",
      });

      const navigate= useNavigate();
  const handleChange= (e) =>{
    console.log("Target name:", e.target.name);
    console.log("Target value:", e.target.value);
    setBooks((prev)=>({...prev, [e.target.name]: e.target.value}));
  };


  const handleClick= async (e) =>{
    e.preventDefault();
    try{
      console.log(book);
      await axios.post("http://localhost:8800/college",book);
      navigate(`/login`);

    }catch(err){
      console.log(err);
    }
  }


  return (
    <div>
      <header><Navbar/></header>
      <div className="login-container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="login-header">
            <h1>Add New College</h1>
            <p>Connecting students with colleges based on grades and other requirements.</p>
          </div>

          <div className="login-card">
            <form onSubmit={handleClick}>
              <h1 className="text-center">College Details</h1>

              <div className="form-group">
                <label htmlFor="name">College Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="College Name"
                  name="name"
                  value={book.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="area">College Area</label>
                <input
                  type="text"
                  id="area"
                  className="form-control"
                  placeholder="College Area"
                  name="area"
                  value={book.area}
                  onChange={handleChange}
                />
              </div>
                  <div><h3>Grade Requirements</h3></div>
                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="A"
                      className="form-control"
                      name="nA"
                      onChange={handleChange}
                      value={book.nA}
                    >
                      <option value="">Number of A</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>

                    </select>
                  </div>



                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="B"
                      className="form-control"
                      name="nB"
                      onChange={handleChange}
                      value={book.nB}
                    >
                      <option value="">Number of B</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>

                    </select>
                  </div>




                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="C"
                      className="form-control"
                      name="nC"
                      onChange={handleChange}
                      value={book.nC}
                    >
                      <option value="">Number of C</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>

                    </select>
                  </div>






                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="D"
                      className="form-control"
                      name="nD"
                      onChange={handleChange}
                      value={book.nD}
                    >
                      <option value="">Number of D</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>

                    </select>
                  </div>


                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="E"
                      className="form-control"
                      name="nE"
                      onChange={handleChange}
                      value={book.nE}
                    >
                      <option value="">Number of E</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>

                    </select>
                  </div>
{/* scholarships */}

                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="scholar"
                      className="form-control"
                      name="scholarship"
                      onChange={handleChange}
                      value={book.scholarship}
                    >
                      <option value="">Do you offer Scholarships</option>
                      <option value="0">NO</option>
                      <option value="1">YES</option>
                    </select>
                  </div>


{/* Extracurricular */}
                  <div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="extracurricular"
                      className="form-control"
                      name="extracurricular"
                      onChange={handleChange}
                      value={book.extracurricular}
                    >
                      <option value="">Extracurricular activities Preferred?</option>
                      <option value="0">NO</option>
                      <option value="1">YES</option>
                    </select>
                  </div>

{/* sports */}

<div className="mb-3">
                    <label htmlFor="grades"></label>
                    <select
                      id="sport"
                      className="form-control"
                      name="sport"
                      onChange={handleChange}
                      value={book.sport}
                    >
                      <option value="">Sports Participation Preferred?</option>
                      <option value="0">NO</option>
                      <option value="1">YES</option>
                    </select>
                  </div>

                  


                  <button
                    button type="submit" 
                    className="btn btn-primary w-100 mt-4"
                    onClick={handleClick}
                  >
                    Add College
                  </button>
              </form>
              </div>
            </div>
          </div>
        </div>
     

  )
}

export default Cquestion
