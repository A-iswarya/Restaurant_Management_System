import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {GET_RESTAURANTS} from './apis/api';

import '../styles.scss';
const Home = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(GET_RESTAURANTS)
    .then(res => res.json())
    .then( (data) => {
                setIsLoaded(true);
                if (Array.isArray(data) && data.length > 0) {
                  setRestaurants(data);
                  setSelectedOption(data[0].id);
                } else {
                  setError({ message: 'No restaurants found.' });
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
    )
  }, []);

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate(`${selectedOption}/login`);
  };

  const handleSelect = (e)=>{
    setSelectedOption(e.target.value);
  }

  if (error) {
    return(<div className="home"><h2 className="error">Error: {error.message}</h2></div>);
  } else if (!isLoaded) {
      return <div className="home"><h2 className="loading">Loading...</h2></div>;
  } else {
    return (
      <div className="home">
        <h1>DineEase</h1>
        <select className="select" value={selectedOption} onChange={handleSelect}>
          {restaurants.map(restaurant => (
            <option value={restaurant.id}>{restaurant.name}</option>
          ))}
        </select>
        <br /><br />
        <button className="submitButton" onClick={() => navigateToLogin()}>Submit</button>
      </div>
    );
  }
};

export default Home;