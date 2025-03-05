import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  // useState hooks to manage the state of username, password, and email inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // useNavigate is a hook from react-router-dom that allows navigation programmatically
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send a POST request to the registration API with the username, password, and email
      const response = await axios.post('yamabiko.proxy.rlwy.net:32627', {
        username,
        password,
        email
      });
      if (response.data) {
        alert('Registration successful!');
        // Navigate to the '/login' route after successful registration
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup error:', error); // Log the error for debugging
      alert('Registration failed!'); // Show an alert if there's an error
    }
  };

  // Render the component's UI
  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Input field for username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {/* Input field for email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Sign Up</button>
        {/* Link to navigate to the login page */}
        <p>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} style={{cursor: 'pointer', color: 'blue'}}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

// Export the Signup component as the default export
export default Signup;