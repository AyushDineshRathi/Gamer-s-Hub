import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/game.css";
import heart1 from "../Icons/heart1.png";
import icon from "../Icons/icon.jpg";
import search from "../Icons/search.png";
import StarRating from "../components/StarRating";

const Game = () => {
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const [realTimeRating, setRealTimeRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams(); // Get the ID from the URL
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleRatingSelect = (rating) => {
    console.log(`${rating}`);
    setRating(rating);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user.user) {
      console.error("User not logged in");
      return navigate("/login");
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/games/game/${id}/comment`,
        {
          content: commentContent,
          gameId: id,
          createdBy: user.user.username,
        }
      );
      console.log("Comment submitted successfully");
      setComments([...comments, response.data]);
    } catch (error) {
      console.error("Error submitting comment:", error.message);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (!user.user) {
      console.error("User not logged in");
      return navigate("/login");
    }
    try {
      const response = await axios.post(
        `http://localhost:3001/games/game/${id}/rating`,
        {
          gameId: id,
          ratingValue: rating,
        }
      );
      setRealTimeRating(response.data.averageRating);
      console.log("Rating submitted successfully");
    } catch (error) {
      console.error("Error submitting rating:", error.message);
    }
  };

  const handleAddToWishList = async () => {
    if (!user.user) {
      console.error("User not logged in");
      return navigate("/login");
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/games/game/${id}/wishlist`,
        {
          gameId: id,
          img: gameData.header_image,
          rating: realTimeRating,
          genre: gameData.genres[0].description,
          userId: user.user._id,
        }
      );
      console.log("Added to wishlist successfully");
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
    }
  };

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/games/game/${id}`
        );
        setGameData(response.data.appDetails);
        setComments(response.data.comments);
        console.log("Game data fetched successfully");
      } catch (error) {
        console.error("Error fetching game data:", error.message);
        setError("Error fetching game data");
      }
    };

    const fetchRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/games/game/${id}/rating`
        );
        setRealTimeRating(response.data.averageRating);
        console.log("Rating fetched successfully");
      } catch (error) {
        console.error("Error fetching rating:", error.message);
      }
    };

    fetchRating();
    fetchGameData();
  }, [id]); // Dependency array includes `id` to refetch if it changes

  if (error) return <div>{error}</div>;
  if (!gameData) return <div>Loading...</div>;

  const year = gameData.release_date?.date?.slice(-4);

  const handleWishlistClick = () => {
    setIsWishlistActive(!isWishlistActive);
    handleAddToWishList();

    if (!isWishlistActive) {
      const wishlistButton = document.getElementById("wishlist-button");
      wishlistButton.classList.add("animate");
      setTimeout(() => {
        wishlistButton.classList.remove("animate");
      }, 500);
    }
  };

  return (
    <div>
      <nav>
        <div className="left">
          <div className="logo">
            <img src={icon} alt="Logo" />
          </div>
          <div className="profile-section">
            <button className="profile-button">
              <span className="button-text">Edit Profile</span>
            </button>
          </div>
        </div>
        <div className="search">
          <input type="text" placeholder="Search" />
          <img src={search} alt="" />
        </div>
      </nav>
      <main>
        <div className="details">
          <div className="wholepic">
            <div className="upper">
              <div className="title">
                <h2>{gameData.name}</h2>
              </div>
              <div className="wishlist">
                <button
                  id="wishlist-button"
                  aria-label="Add to wishlist"
                  className={isWishlistActive ? "active" : ""}
                  onClick={handleWishlistClick}
                >
                  <div className="heart-container">
                    <img src={heart1} alt="Wishlist" id="heart-icon" />
                    <div className="small-heart" id="small-heart1"></div>
                    <div className="small-heart" id="small-heart2"></div>
                    <div className="small-heart" id="small-heart3"></div>
                  </div>
                </button>
              </div>
            </div>
            <div className="pic">
              <img src={gameData.header_image} alt="Game" />
            </div>
          </div>
          <div className="info">
            <h3>
              Metacritic Score:{" "}
              {gameData.metacritic && gameData.metacritic.score
                ? gameData.metacritic.score
                : "N/A"}
            </h3>
            <h3>Our Website Rating: {realTimeRating.toFixed(2)}</h3>
            <div>
              <h6>Rate Us</h6>
              <StarRating onRatingSelect={handleRatingSelect} />
              <button onClick={handleRatingSubmit}>Submit Rating</button>
            </div>
            <div>Current Rating {realTimeRating.toFixed(2)}</div>
            <h3>Year of Release: {year}</h3>
            {/* Other game details */}
          </div>
        </div>
      </main>
      <div className="end">
        <div className="description">
          <h3>
            Description:{" "}
            {gameData.detailed_description
              ? `${gameData.detailed_description.slice(0, 700)}...`
              : "Description not available"}
          </h3>
        </div>
        <div className="reviews">
            <h6>Refresh to see comments</h6>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write your comment"
            />
            <button type="submit">Submit Comment</button>
          </form>
          {comments.length > 0 ? (
            <div>
              <h4>Comments</h4>
              <div>
                {comments.map((comment, idx) => (
                  <div key={idx}>
                    <p>
                      {comment.createdBy} : {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>No comments yet</div>
          )}
        </div>
        <div className="similar">{/* Add content here */}</div>
      </div>
    </div>
  );
};

export default Game;
