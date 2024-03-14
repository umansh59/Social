import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar/Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear authentication token (assuming you store it in localStorage)
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page after logout
  };

  const token = localStorage.getItem('authToken');
  const isAuthenticated = !!token && token !== 'undefined';

  return (
    <nav>
      <ul>
        
        <li>
          <Link to="/entries">Your Entries</Link>
        </li>
        <li>
          <Link to="/form">New Entry</Link>
        </li>

        {isAuthenticated && (
          
            <button id="logout-button" onClick={handleLogout}>Logout</button>
           
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
