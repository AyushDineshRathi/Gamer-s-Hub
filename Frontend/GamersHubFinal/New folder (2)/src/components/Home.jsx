import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import gta5 from "../Icons/gta5.avif";
import gt from "../Icons/gt.jpg";
import rdr2 from "../Icons/rdr2.jpg";
import fg from "../Icons/fg.jpg";
import cp from "../Icons/cb.avif";
import "../styles/home.css";
import { Link } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGames } from "../redux/slices/gameSlice";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const [newFilteredApps, setNewFilteredApps] = useState([]); // State for filtered apps
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [appList, setAppList] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppList = async () => {
      console.log("Going");
      try {
        const response = await axios.get("http://localhost:3001");
        // Assuming response.data is an array of app details
        const appDetails = Object.values(response.data).map(
          (item) => item[Object.keys(item)[0]]
        );
        console.log(appDetails);
        console.log(appDetails[0].genres[0]);
        dispatch(setGames(appDetails));
        setAppList(appDetails);
        console.log(appList);
        // setNewFilteredApps(appDetails);
        console.log("End");
      } catch (error) {
        setError(error);
      }
    };

    fetchAppList();
  }, []);

  return (
    <>
      <div className="container">
        <div className="banner-popular">
          <div className="banner">
            <img src={gta5} alt="Banner" />
            <img src={gt} alt="Banner" />
            <img src={rdr2} alt="Banner" />
            <img src={fg} alt="Banner" />
            <img src={cp} alt="Banner" />
          </div>
          <div className="popular">
            <div className="popular-track">
              <ul>
                <li>
                  <img src={gta5} alt="" />
                  <p>Grand Theft Auto V</p>
                </li>
                <li>
                  <img src={gt} alt="" />
                  <p>Ghost of Tsusima</p>
                </li>
                <li>
                  <img src={rdr2} alt="" />
                  <p>Red Dead Redemption II</p>
                </li>
                <li>
                  <img src={fg} alt="" />
                  <p>Fall Guys</p>
                </li>
                <li>
                  <img src={cp} alt="" />
                  <p>Cyberpunk</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="most-played">
        <h1>Popular Games </h1>
        <div className="most-played-child">
          <div className="cards">
            {appList.map((item, idx) => (
              <div key={idx}>
                <Link
                  to={`/game/${item.steam_appid}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    image={item.header_image}
                    name={item.name}
                    // rating={item?.genres[0]?.id}
                    // genre={item?.genres[0]?.description}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="wishlist-games">
        <h1>Recently Added Games </h1>
        <div className="my-wishlist-child">
          <div className="cards">
            {appList.map((item, idx) => (
              <div key={idx}>
                <Link
                  to={`/game/${item.steam_appid}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    image={item.header_image}
                    name={item.name}
                    // rating={item?.genres[0]?.id}
                    // genre={item?.genres[0]?.description}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="free-games"></div>
    </>
  );
}
