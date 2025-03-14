import React from 'react';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>My Portfolio</h2>
      <div>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
