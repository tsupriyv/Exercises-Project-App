// Importing dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Function base component for navigation
function Nav() {
  return (
    <nav className='Nav'>
      <Link to="/" className='Buttons'>Home</Link>
      <Link to="/add-exercise" className='Buttons'>Add</Link>
    </nav>
  );
}

export default Nav;