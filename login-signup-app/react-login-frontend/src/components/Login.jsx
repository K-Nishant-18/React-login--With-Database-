import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// This is a functional component named Login
function Login() {
  // useState hooks to manage the state of username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // useNavigate is a hook from react-router-dom that allows navigation programmatically
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send a POST request to the login API with the username and password
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });
      if (response.data) {
        // If login is successful, store the username in localStorage
        localStorage.setItem('username', response.data.username);
        alert('Login successful!');
        // Navigate to the '/home' route after successful login
        navigate('/home');
      } else {
        // If login fails, show an alert
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
      alert('Login failed!'); // Show an alert if there's an error
    }
  };
  
  // Render the component's UI
  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Input field for username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {/* Input field for password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Submit button for the form */}
        <button type="submit">Login</button>
        {/* Link to navigate to the signup page */}
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

// Export the Login component as the default export
export default Login;
