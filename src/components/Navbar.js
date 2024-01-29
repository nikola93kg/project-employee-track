import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/img/logo.svg"
import '../css/Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="navbar-links">
      <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/project/create">Create/Update Project</Link>
        </li>
        <li>
          <Link to="/project/details">Project Details</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;