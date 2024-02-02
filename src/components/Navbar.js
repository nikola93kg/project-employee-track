import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/img/logo.svg"
import '../css/Navbar.css'; 

function Navbar() {

  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to={"/"}>
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <button className="navbar-toggle" onClick={() => setIsActive(!isActive)}>
        ☰
      </button>
      <ul className={`navbar-links ${isActive ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsActive(false)}>Home</Link>
        </li>
        <li>
          <Link to="/project/create" onClick={() => setIsActive(false)}>Create Project</Link>
        </li>
        <li>
          <Link to="/project/details" onClick={() => setIsActive(false)}>Project Details</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
