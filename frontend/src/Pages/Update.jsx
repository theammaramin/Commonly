import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './styles/UpdateStyles.css';
import Navbar from '../components/Navbar'

const Update = () => {
  const [book, setBooks]= useState({
    Name: "",
    email: "",
  });

  const [error,setError] = useState(false);
  const location = useLocation();
  const navigate= useNavigate();
  const bookId = location.pathname.split("/")[2];
  const handleChange= (e) =>{
    console.log("Target name:", e.target.name);
    console.log("Target value:", e.target.value);
    setBooks((prev)=>({...prev, [e.target.name]: e.target.value}))
  };
  const handleClick= async (e) =>{
    e.preventDefault();
    try{
      console.log(book);
      await axios.put(`http://localhost:8800/user/${bookId}`, book);
      
      // navigate("/");

    }catch(err){
      console.log(err);
    }


  }
  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="login-header">
            <h1>Update Record</h1>
            <p>Update your account details.</p>
          </div>
          <div className="login-card">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleClick}>
              <h1 className="text-center">Update Info</h1>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Full Name"
                  name="Name"
                  value={book.Name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={book.email}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4">
                Update Record
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update
