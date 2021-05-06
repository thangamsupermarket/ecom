import React from "react";
import Link from "next/link";

const NavigationBar = () => {
  const displayNavbar = () => {
    var display = document.getElementById("navbarSupportedContent").style
      .display;
    console.log(display);
    if (display === "none" || display === "") {
      document.getElementById("navbarSupportedContent").style.display = "block";
    } else {
      document.getElementById("navbarSupportedContent").style.display = "none";
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="text-white btn btn-success">Daily Devotion</a>
        <button
          onClick={displayNavbar}
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">&nbsp;</li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link active">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link active">Blog</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about">
                <a className="nav-link active">About Us</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact-us">
                <a className="nav-link active">Contact Us</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link active">Admin Login</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
