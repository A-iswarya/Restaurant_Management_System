import React, { useEffect, useRef, useState } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorageValue,
  GetIdFromUrl,
  loggingOut,
  capitalizeFirstLetters,
} from "./helper";
import { GET_SINGLE_STAFF, GET_SINGLE_CUSTOMER } from "./apis/api";

const Layout = ({ children }) => {
  const userType = getLocalStorageValue("user_type");
  const userId = getLocalStorageValue("user_id");
  const userApi =
    userType === "Staff"
      ? GET_SINGLE_STAFF(userId)
      : userType === "Customer"
      ? GET_SINGLE_CUSTOMER(userId)
      : "";
  const navigate = useNavigate();
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    loggingOut();
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate(
      `/${userType.toLowerCase()}/${userId}/edit?restaurant_id=${
        restaurantId.current
      }`
    );
  };

  const handleHome = () => {
    navigate(
      `/dashboard?restaurant_id=${
        restaurantId.current
      }&${userType.toLowerCase()}_id=${userId}`
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(userApi, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.token,
          },
        });
        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        setError(error);
      }
    }
    if (userType === "Admin") {
      setUserName("Admin");
    } else if (userType === "Staff" || userType === "Customer") {
      fetchData();
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="banner">
        <h1>
          DineEase
          <IoRestaurantOutline style={{ marginLeft: "20px" }} />
        </h1>
        {userType && (
          <div className="user-info">
            <span className="user-type">
              {userName && capitalizeFirstLetters(userName)}
            </span>
            <span className="edit-profile" onClick={handleHome}>
              Home |
            </span>
            <span className="edit-profile" onClick={handleEditProfile}>
              Edit Profile |
            </span>
            <span className="logout" onClick={handleLogout}>
              Logout
              <BiLogOut
                style={{ verticalAlign: "middle", marginLeft: "5px" }}
              />
            </span>
          </div>
        )}
      </div>
      {error && <div className="error">{error.message}</div>}
      {children}
    </div>
  );
};
export default Layout;
