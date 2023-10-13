import React from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getLocalStorageValue, GetRestaurantId } from "./helper";

const Layout = ({ children }) => {
  const userType = getLocalStorageValue("user_type");
  const userId = getLocalStorageValue("user_id");
  const navigate = useNavigate();
  const restaurantId = GetRestaurantId();
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate(`/admin/${userId}/edit?restaurant_id=${restaurantId}`);
  };

  return (
    <div className="dashboard">
      <div className="banner">
        <h1>
          DineEase
          <IoRestaurantOutline style={{ marginLeft: "20px" }} />
        </h1>
        {userType && (
          <div className="user-info">
            <span className="user-type">{userType} |</span>
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
      {children}
    </div>
  );
};
export default Layout;
