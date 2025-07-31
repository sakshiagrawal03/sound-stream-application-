import React from 'react';
import '../styles/Register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
   const navigate=useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleRegister(event) {
    event.preventDefault();

    axios.post("http://localhost:3000/auth/register", {
      username,
      password
    }, {
      withCredentials: true
    }).then(response => {
      console.log(response.data);
      navigate('/');
    });
  }


  return (
    <div className="register-container">
      {/* Logo and Title */}
      <div className="register-logo-title">
        <div className="register-logo-row">
          {/* Bold black triangle icon for logo */}
          <svg viewBox="0 0 28 28" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 5L23 23H5L14 5Z" fill="#181716" stroke="#181716" strokeWidth="2.5" />
          </svg>
          <span className="register-logo-text">SoundStream</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="register-spacer"></div>

      {/* Registration Form */}
      <form onSubmit={handleRegister}>
        <h2 className="register-heading">Create new account</h2>
        <input
          type="text"
          placeholder="Username"
          className="register-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="register-button"
        >
          Register
        </button>
      </form>
      {/* Spacer to push footer to bottom */}
      <div className="register-footer-spacer"></div>

      {/* Footer */}
      <div className="register-footer">
        <span className="register-footer-text">
          Already have an account?{' '}
          <Link
            to="/login"
            className="register-footer-login"
            style={{ cursor: 'pointer', color: '#007bff' }}
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
