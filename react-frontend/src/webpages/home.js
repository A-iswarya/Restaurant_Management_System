import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GET_RESTAURANTS } from "./apis/api";
import { IoRestaurantSharp } from "react-icons/io5";

import "../styles.scss";
const Home = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_RESTAURANTS);
        const data = await response.json();
        setIsLoaded(true);
        setRestaurants(data);
        setSelectedOption(data[0]?.id);
      } catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate(`/login?restaurant_id=${selectedOption}`);
  };

  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  if (error) {
    return (
      <div className="home">
        <h2 className="error">Error: {error.message}</h2>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="home">
        <h2 className="loading">Loading...</h2>
      </div>
    );
  } else {
    return (
      <div className="home">
        <h1>DineEase</h1>
        <select
          className="select"
          value={selectedOption}
          onChange={handleSelect}
        >
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button className="submitButton" onClick={() => navigateToLogin()}>
          Submit
        </button>
        <br />
        <br />
        <Link to={"/create"}>
          <font className="createButton">
            Add Your Restaurant <IoRestaurantSharp />
          </font>
        </Link>
      </div>
    );
  }
};

export default Home;
