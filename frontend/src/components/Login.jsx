import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate =useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(event){
      event.preventDefault();

      axios.post("http://localhost:3000/auth/login",
        {
           username,password
        },
        {
           withCredentials: true
        }).then(response => {
        console.log(response.data);
        navigate('/')
      })
    }




  return (
    <>
      <div className="soundstream-heading-top">
        <span className="soundstream-logo-icon">▲</span>
        <span className="soundstream-logo-text">SoundStream</span>
      </div>
      <div className="login-container">
        <div className="login-box">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Log In</button>
          </form>
        </div>
        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </>
  )
}

export default Login
