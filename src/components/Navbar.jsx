import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const categories = [
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom position-sticky top-0 left-0 z-3">
      <div className="container">
        <NavLink
          className="navbar-brand fs-4 d-inline-flex align-items-center"
          to="/"
        >
          {/* <i className="bx bx-news text-primary me-2"></i> */}
          <img
            width="32"
            height="32"
            className="me-2"
            src="https://img.icons8.com/3d-fluency/94/google-news.png"
            alt="google-news"
          />
          <span className="fs-5 display-1"> DailyByte</span>
        </NavLink>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav fs-6 ms-lg-5 ps-lg-5">
            {categories.map((category, index) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link me-1 me-lg-5 text-capitalize ${
                    isActive ? "text-primary" : ""
                  }`
                }
                aria-current="page"
                to={`${category}`}
                key={index}
              >
                {category}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
