import Mid from "../components/Home.jsx";
import Footer from "../components/Footer";

import React, { useEffect, useState } from "react";

import logo from "../Icons/logo.jpg";
import search from "../Icons/search.png";
import "../styles/header.css";

const Home = () => {
  // useEffect(() => {
  //   const filteredApps = appList.filter((app) =>
  //     app.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setNewFilteredApps(filteredApps);
  //   console.log(newFilteredApps);
  // }, [searchQuery]);

  //   if (error) return <div>Error: {error.message}</div>;
  //   if (appList.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <div className="header">
        <div className="image">
          <img src={logo} alt="Logo" className="logo" />
          <pre>
            <i>The Ultimate Tool for Gamers</i>
          </pre>
        </div>
        <div className="search-container">
          <div className="input">
            <input type="text" placeholder="search" />
            <img src={search} alt="Search Icon" />
          </div>
          <div className="options">
            <ul>
              <li>
                <a href="#" className="link1">
                  Discover
                </a>
              </li>
              <li onClick={() => navigate("/news")} className="link2">
                News
              </li>
              <li>
                <a href="#" className="link3">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="signup">
          <button>Sign In</button>
        </div>
      </div>
      <Mid />
      <Footer />
    </div>
  );
};

export default Home;
