import logo from "../Icons/logo.jpg";
import search from "../Icons/search.png";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
  return (
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
            <li>
                
              <li onClick={() => navigate("/news")} className="link2">
                News
              </li>
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
  );
}
