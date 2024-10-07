import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/AddStyles.css";
import Navbar from "../components/Navbar";

const Add = () => {
  const [book, setBooks] = useState({
    Name: "",
    email: "",
    password: "",
    ContactInformation: "",
    type: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Password validation regex
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    // Check if password meets criteria
    if (!passwordRegex.test(book.password)) {
      setErrorMessage("Password must contain at least 8 characters with one special character and one number.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8800/user", book);
      console.log(response.data);
      const res = await axios.post("http://localhost:8800/api/getid", book);
      console.log(res.data.id);

      if (book.type === "student") {
        navigate(`/uquestion/${res.data.id}`);
      } else {
        navigate(`/cquestion/${res.data.id}`);
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.error === "Email already exists"
      ) {
        setErrorMessage("Email already exists. Please use a different email.");
      } else {
        setErrorMessage(
          "An error occurred while signing up. Please try again later."
        );
      }
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="login-header">
            <h1>Create An Account </h1>
            <p>Connecting students with their dream colleges.</p>
          </div>{" "}
          <div className="login-card">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <form onSubmit={handleClick}>
              <h1 className="text-center">Sign Up</h1>
              <div className="form-group">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  id="Name"
                  className="form-control"
                  placeholder="Full Name"
                  name="Name"
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
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ContactInformation">Phone Number</label>
                <input
                  type="tel"
                  id="ContactInformation"
                  className="form-control"
                  placeholder="Phone Number"
                  name="ContactInformation"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Signing Up As</label>
                <select
                  id="type"
                  className="form-control"
                  name="type"
                  onChange={handleChange}
                  value={book.type}
                >
                  <option value="">Choose an option</option>
                  <option value="student">Applicant</option>
                  <option value="college">College</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
