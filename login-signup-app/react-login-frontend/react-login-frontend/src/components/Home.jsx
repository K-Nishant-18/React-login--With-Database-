import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    // Check if user is "logged in" by checking localStorage
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="home">
      <h1>Welcome, {username}!</h1>
      <p>This is your home page after successful login.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;