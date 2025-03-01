import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });
      if (response.data) {
        localStorage.setItem('username', response.data.username);
        alert('Login successful!');
        navigate('/home');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
      alert('Login failed!');
    }
  };
  
  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <p>
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} style={{cursor: 'pointer', color: 'blue'}}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;