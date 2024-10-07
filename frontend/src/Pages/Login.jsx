import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/LoginStyles.css'; // Import your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/api/login', user);
      const userId = res.data[0].id;

      if (userId !== undefined) {
        if (res.data[0].type === "student") {
          navigate(`/dashboard/${userId}`);
        } else {
          navigate(`/cdashboard/${userId}`);
        }
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage('Invalid credentials'); // Set error message for any other errors
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
      <div className="d-flex justify-content-between align-items-center">
      <div className="login-header">
  <h1>Log In To Commonly</h1>
  <p>Connecting students with their dream colleges.</p>
</div>
        <div className="login-card">
         {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={handleClick}>
          <h1 className="text-center">Log In</h1>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="form-control"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="form-control"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">Login</button>
            <div className="text-center mt-3">
              Don't have an account? <Link to="/add" className="link-primary">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
