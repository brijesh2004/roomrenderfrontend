import React from "react";
import { Link } from "react-router-dom";



const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg  bg-secondary ">
  <div className="container-fluid">
    <Link className="navbar-brand text-white" to="#"><h2>Room Searcher</h2></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNav">
      <ul className="navbar-nav  ms-auto">
        <li className="nav-item">
          <Link className="nav-link  text-white" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/City">City Available</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/Postroom">Post room</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/Register">Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/Profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
   </>
  )
};

export default Navbar;