import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../../../images/logo.png"; 

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Logo and Brand Name */}
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "30px", marginRight: "10px", marginBottom: "4.5px" }}
          />
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left Section: Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>

          {/* Right Section: Icons */}
          <div className="d-flex align-items-center">
            {/* Search Icon */}
            <Link className="nav-link me-3" to="/search">
              <i className="bi bi-search" style={{ fontSize: "1.5rem" }}></i>
            </Link>

            {/* Cart Icon */}
            <Link className="nav-link me-3" to="/cart">
              <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
            </Link>

            {/* Profile Icon */}
            <Link className="nav-link" to="/login">
              <i className="bi bi-person-circle" style={{ fontSize: "1.5rem" }}></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
